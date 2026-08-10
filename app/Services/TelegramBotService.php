<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramBotService
{
    /**
     * Base URL for Telegram Bot API.
     */
    protected string $baseUrl;

    public function __construct()
    {
        $token = config('services.telegram.bot_token');
        $this->baseUrl = "https://api.telegram.org/bot{$token}";
    }

    /**
     * Send a text message to a Telegram chat.
     */
    public function sendMessage(string $chatId, string $text, ?string $parseMode = null): void
    {
        $payload = [
            'chat_id' => $chatId,
            'text' => $text,
        ];

        if ($parseMode) {
            $payload['parse_mode'] = $parseMode;
        }

        $response = Http::post("{$this->baseUrl}/sendMessage", $payload);

        if ($response->failed()) {
            Log::error('Telegram sendMessage failed', [
                'chat_id' => $chatId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        }
    }

    /**
     * Set the webhook URL for the bot.
     */
    public function setWebhook(string $url): array
    {
        $response = Http::post("{$this->baseUrl}/setWebhook", [
            'url' => $url,
            'allowed_updates' => ['message', 'callback_query', 'pre_checkout_query'],
        ]);

        return $response->json();
    }

    /**
     * Remove the webhook.
     */
    public function deleteWebhook(): array
    {
        $response = Http::post("{$this->baseUrl}/deleteWebhook");

        return $response->json();
    }

    /**
     * Get current webhook info.
     */
    public function getWebhookInfo(): array
    {
        $response = Http::get("{$this->baseUrl}/getWebhookInfo");

        return $response->json();
    }

    /**
     * Send Telegram Stars invoice for subscription.
     */
    public function sendStarsInvoice(string $chatId, string $title, string $description, int $starsAmount, string $payload): void
    {
        $response = Http::post("{$this->baseUrl}/sendInvoice", [
            'chat_id' => $chatId,
            'title' => $title,
            'description' => $description,
            'payload' => $payload,
            'provider_token' => '', // Empty for Telegram Stars
            'currency' => 'XTR',
            'prices' => [
                ['label' => $title, 'amount' => $starsAmount],
            ],
        ]);

        if ($response->failed()) {
            Log::error('Telegram sendInvoice failed', [
                'chat_id' => $chatId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        }
    }

    /**
     * Answer pre-checkout query for Telegram payment.
     */
    public function answerPreCheckoutQuery(string $preCheckoutQueryId, bool $ok = true, ?string $errorMessage = null): void
    {
        $payload = [
            'pre_checkout_query_id' => $preCheckoutQueryId,
            'ok' => $ok,
        ];

        if (! $ok && $errorMessage) {
            $payload['error_message'] = $errorMessage;
        }

        Http::post("{$this->baseUrl}/answerPreCheckoutQuery", $payload);
    }
}
