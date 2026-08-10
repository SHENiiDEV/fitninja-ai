<?php

namespace App\Console\Commands;

use App\Services\TelegramBotService;
use Illuminate\Console\Command;

class TelegramSetWebhook extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'telegram:set-webhook
                            {--url= : The webhook URL (defaults to TELEGRAM_WEBHOOK_URL from .env)}
                            {--delete : Remove the current webhook}
                            {--info : Show current webhook info}';

    /**
     * The console command description.
     */
    protected $description = 'Set, remove, or inspect the Telegram bot webhook URL';

    /**
     * Execute the console command.
     */
    public function handle(TelegramBotService $telegram): int
    {
        if ($this->option('info')) {
            $info = $telegram->getWebhookInfo();
            $this->table(
                ['Key', 'Value'],
                collect($info['result'] ?? $info)->map(fn ($v, $k) => [$k, is_array($v) ? json_encode($v) : $v])->values()->toArray()
            );
            return self::SUCCESS;
        }

        if ($this->option('delete')) {
            $result = $telegram->deleteWebhook();
            if ($result['ok'] ?? false) {
                $this->info('✅ Webhook removed successfully.');
            } else {
                $this->error('❌ Failed to remove webhook: ' . ($result['description'] ?? 'Unknown error'));
            }
            return self::SUCCESS;
        }

        $url = $this->option('url') ?: config('services.telegram.webhook_url');

        if (empty($url)) {
            $this->error('❌ No webhook URL provided. Use --url=<URL> or set TELEGRAM_WEBHOOK_URL in .env');
            return self::FAILURE;
        }

        $result = $telegram->setWebhook($url);

        if ($result['ok'] ?? false) {
            $this->info("✅ Webhook set to: {$url}");
        } else {
            $this->error('❌ Failed to set webhook: ' . ($result['description'] ?? 'Unknown error'));
            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
