#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Terminal Colors
GREEN='\030[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}🚀 Starting FitNinja AI Production Deployment...${NC}"
echo -e "${CYAN}====================================================${NC}"

# Enable Laravel maintenance mode during deployment
if [ -f "artisan" ]; then
    echo -e "${YELLOW}🔒 Enabling maintenance mode...${NC}"
    php artisan down --retry=60 || true
fi

# 1. Pull the latest code from git repository
echo -e "${GREEN}📦 Pulling latest code from GitHub...${NC}"
git pull origin main

# 2. Install PHP production dependencies
echo -e "${GREEN}🐘 Installing Composer dependencies...${NC}"
composer install --no-dev --optimize-autoloader --no-interaction

# 3. Install Node dependencies and compile production frontend assets
echo -e "${GREEN}⚡ Building frontend assets (Vite)...${NC}"
npm ci || npm install
npm run build

# 4. Fix Storage and Cache Permissions
echo -e "${GREEN}🔑 Setting directory permissions...${NC}"
sudo chown -R www-data:www-data storage bootstrap/cache public/images public/build || true
sudo chmod -R 775 storage bootstrap/cache || true

# 5. Run database migrations safely in production
echo -e "${GREEN}🗄 Running database migrations...${NC}"
php artisan migrate --force

# 6. Optimize Laravel Caches
echo -e "${GREEN}🧹 Clearing and rebuilding Laravel caches...${NC}"
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 7. Restart Queue Worker
echo -e "${GREEN}🔄 Restarting FitNinja queue worker...${NC}"
if command -v systemctl &> /dev/null && systemctl is-active --quiet fitninja-queue; then
    sudo systemctl restart fitninja-queue
else
    php artisan queue:restart
fi

# 8. Reload Nginx and PHP-FPM
echo -e "${GREEN}🌐 Reloading Nginx and PHP 8.4 FPM...${NC}"
if command -v systemctl &> /dev/null; then
    sudo systemctl reload php8.4-fpm || true
    sudo systemctl reload nginx || true
fi

# Disable maintenance mode
if [ -f "artisan" ]; then
    echo -e "${YELLOW}🔓 Disabling maintenance mode...${NC}"
    php artisan up || true
fi

echo -e "${CYAN}====================================================${NC}"
echo -e "${GREEN}✅ FitNinja AI successfully deployed to production!${NC}"
echo -e "${CYAN}====================================================${NC}"
