#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🚀 Starting FitNinja AI Production Deployment..."

# 1. Pull the latest code from git repository
echo "📦 Pulling latest code..."
git pull origin main

# 2. Install PHP production dependencies
echo "🐘 Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# 3. Install Node dependencies and compile production frontend assets
echo "⚡ Building frontend assets (Vite)..."
npm ci
npm run build

# 4. Run database migrations safely in production
echo "🗄 Running database migrations..."
php artisan migrate --force

# 5. Optimize Laravel Caches
echo "🧹 Optimizing Laravel caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Restart Queue Worker
echo "🔄 Restarting queue worker..."
if command -v systemctl &> /dev/null && systemctl is-active --quiet fitninja-queue; then
    sudo systemctl restart fitninja-queue
else
    php artisan queue:restart
fi

# 7. Reload Nginx and PHP-FPM
echo "🌐 Reloading Nginx and PHP 8.4 FPM..."
if command -v systemctl &> /dev/null; then
    sudo systemctl reload php8.4-fpm || true
    sudo systemctl reload nginx || true
fi

echo "✅ FitNinja AI successfully deployed to production!"
