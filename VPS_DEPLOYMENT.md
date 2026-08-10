# 🚀 FitNinja AI — Ubuntu VPS Production Deployment Guide

This guide covers deploying **FitNinja AI** to your Ubuntu VPS with PHP 8.4-FPM, Nginx, Node.js 22, npm, and Composer.

---

## 📋 Step 1: Clone Project & Set Permissions

On your VPS terminal (e.g. in `/var/www/`):

```bash
cd /var/www
git clone <your-repository-url> fitninja-new
cd fitninja-new

# Set proper ownership and permissions for Laravel storage & bootstrap/cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## ⚙️ Step 2: Configure Environment (`.env`)

Copy the environment file and generate the application key:

```bash
cp .env.example .env
nano .env
```

Update your `.env` settings:
```ini
APP_NAME="FitNinja AI"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database Connection (MySQL)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitninja
DB_USERNAME=fitninja_user
DB_PASSWORD=your_secure_password

# Queue & Cache (Redis)
QUEUE_CONNECTION=redis
CACHE_STORE=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# DeepSeek AI Key
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_BOT_USERNAME=fitninjaAI_bot
TELEGRAM_WEBHOOK_URL=https://your-domain.com/api/telegram/webhook
```

Generate the key:
```bash
php artisan key:generate
```

---

## 🛠 Step 3: Run Initial Build & Migrations

Execute the deployment script:

```bash
./deploy.sh
```

Or manually:
```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 🌐 Step 4: Configure Nginx & SSL (Certbot)

Copy the Nginx configuration:

```bash
sudo cp fitninja-nginx.conf /etc/nginx/sites-available/fitninja.conf
sudo nano /etc/nginx/sites-available/fitninja.conf
```
*Change `server_name` to your domain and `root` to `/var/www/fitninja-new/public`.*

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/fitninja.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Install SSL Certificate (Let's Encrypt):
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## 🔄 Step 5: Setup Systemd Queue Worker

Enable the background queue worker for Telegram AI message processing:

```bash
sudo cp fitninja-queue.service /etc/systemd/system/fitninja-queue.service
sudo nano /etc/systemd/system/fitninja-queue.service  # Verify paths
sudo systemctl daemon-reload
sudo systemctl enable --now fitninja-queue
sudo systemctl status fitninja-queue
```

---

## 🤖 Step 6: Set Telegram Webhook

Register your production SSL domain webhook with Telegram:

```bash
php artisan telegram:set-webhook
```

Verify Telegram Webhook status:
```bash
curl -s "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

---

## 🚀 Step 7: Future Updates (1-Click Deployment)

Whenever you push code updates to git, simply run:

```bash
./deploy.sh
```
