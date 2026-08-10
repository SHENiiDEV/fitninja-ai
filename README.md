# 🥷 FitNinja AI — Autonomous AI Fitness & Nutrition Coach

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![InertiaJS](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Telegram](https://img.shields.io/badge/Telegram_Bot-API-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/fitninjaAI_bot)

FitNinja AI is a modern full-stack web application and Telegram AI assistant that automatically calculates kilocalories, workouts, and macro-nutrients (Protein 🥩, Fats 🥑, Carbs 🍞) using natural language understanding and neural AI.

---

## ✨ Features

- 🤖 **Telegram Neural AI Assistant**: Log meals & workouts via natural language text or voice notes.
- 🥩 **Macro-Nutrients Engine**: Automatic extraction of Protein, Fats, and Carbs for every food item.
- ⚡ **BMR & TDEE Biometrics Calculator**: Automatic computation of metabolic targets using the Mifflin-St Jeor equation.
- 💎 **Magic UI Dashboard**: 14-day energy trends, circular progress ring gauge, and interactive meal timeline.
- 🗑 **Meal Manager**: 1-click meal deletion and live auto-recalculation on the web dashboard.
- 💳 **Pay-As-You-Go Tokens**: Custom token calculator (£1 = 20 Tokens) with Card and Bank Transfer options.
- 📜 **Legal Compliance Pages**: Built-in Privacy Policy, Terms of Service, and Refund Policy pages.

---

## 🛠 Tech Stack

- **Backend**: PHP 8.4, Laravel 13, Eloquent, MySQL 8, Redis, Systemd Queue Workers
- **Frontend**: React 19, Inertia.js v2, TailwindCSS v4, Recharts, Lucide Icons
- **AI Engine**: Proprietary Neural AI Engine (DeepSeek integration)
- **Deployment**: Docker Compose (Local Dev) & Nginx + PHP 8.4-FPM (Production VPS)

---

## 🚀 Quick Start (Local Docker Development)

```bash
# 1. Clone repository
git clone https://github.com/SHENiiDEV/fitninja-ai.git
cd fitninja-ai

# 2. Environment setup
cp .env.example .env

# 3. Start Docker Compose
docker compose up -d

# 4. Run migrations
docker compose exec app php artisan migrate

# 5. Build frontend
docker compose exec app npm run build
```

---

## 🌐 Production VPS Deployment

Refer to [`VPS_DEPLOYMENT.md`](VPS_DEPLOYMENT.md) for full instructions on deploying to an Ubuntu VPS with Nginx, PHP 8.4-FPM, and Let's Encrypt SSL.

To deploy code updates on VPS:
```bash
./deploy.sh
```

---

## ⚖️ License

All rights reserved © FitNinja AI.
