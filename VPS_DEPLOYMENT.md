# 🚀 FitNinja AI — Production Deployment Guide (`fitninja.co.uk`)

This guide covers deploying **FitNinja AI** to your Ubuntu VPS at `/var/www/customAI/fitninja-ai` for domain **`fitninja.co.uk`** / **`www.fitninja.co.uk`** with PHP 8.4-FPM, Nginx, Node.js 22, npm, and Composer.

---

## 📋 Step 1: Clone Project & Set Permissions

On your VPS terminal:

```bash
mkdir -p /var/www/customAI
cd /var/www/customAI
git clone https://github.com/SHENiiDEV/fitninja-ai.git
cd fitninja-ai

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
APP_URL=https://fitninja.co.uk

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
TELEGRAM_BOT_TOKEN=8657848817:AAGrHCSg0YGBsMAvOD7UD1lPKBXc_-RfUnM
TELEGRAM_BOT_USERNAME=fitninjaAI_bot
TELEGRAM_WEBHOOK_URL=https://fitninja.co.uk/api/telegram/webhook
```

Generate key:
```bash
php artisan key:generate
```

---

## 🛠 Step 3: Run Initial Build & Migrations

Execute the deployment script:

```bash
./deploy.sh
```

---

## 🌐 Step 4: Configure Nginx & SSL (Certbot)

Copy Nginx configuration:

```bash
sudo cp fitninja-nginx.conf /etc/nginx/sites-available/fitninja.conf
sudo ln -sf /etc/nginx/sites-available/fitninja.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Install Let's Encrypt Free SSL Certificate:
```bash
sudo certbot --nginx -d fitninja.co.uk -d www.fitninja.co.uk
```

---

## 🔄 Step 5: Setup Systemd Queue Worker

Enable background queue worker for Telegram AI message, voice note, and photo processing:

```bash
sudo cp fitninja-queue.service /etc/systemd/system/fitninja-queue.service
sudo systemctl daemon-reload
sudo systemctl enable --now fitninja-queue
sudo systemctl restart fitninja-queue
```

---

## 🤖 Step 6: Set Telegram Webhook

Register production SSL domain webhook with Telegram API:

```bash
php artisan telegram:set-webhook
```

Verify Telegram Webhook status:
```bash
curl -s "https://api.telegram.org/bot8657848817:AAGrHCSg0YGBsMAvOD7UD1lPKBXc_-RfUnM/getWebhookInfo"
```

---

## 🚀 Step 7: Future Updates (1-Click Deployment)

Whenever you push code updates to git, simply run on VPS:

```bash
cd /var/www/customAI/fitninja-ai
git pull
./deploy.sh
sudo systemctl restart fitninja-queue
```
