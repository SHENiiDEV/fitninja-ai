<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessTelegramMessage;
use App\Models\User;
use App\Services\TelegramBotService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TelegramWebhookController extends Controller
{
    /**
     * Handle incoming Telegram webhook.
     *
     * Immediately returns HTTP 200 and dispatches processing to queue.
     */
    public function handle(Request $request, TelegramBotService $telegram): JsonResponse
    {
        try {
            $update = $request->all();

            Log::info('Telegram webhook payload received', ['update' => $update]);

            $message = $update['message'] ?? null;

            if (! $message) {
                return response()->json(['ok' => true]);
            }

            $chatId = (string) $message['chat']['id'];
            $telegramId = (string) ($message['from']['id'] ?? $chatId);
            $telegramUsername = $message['from']['username'] ?? null;
            $firstName = $message['from']['first_name'] ?? 'User';
            $text = trim($message['text'] ?? '');

            if (empty($text)) {
                return response()->json(['ok' => true]);
            }

            // Commands
            if (str_starts_with($text, '/start')) {
                $this->handleStartCommand($chatId, $telegramId, $telegramUsername, $firstName, $text, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/buy') || str_starts_with($text, '/tokens') || str_starts_with($text, '/subscribe')) {
                $this->handleBuyCommand($chatId, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/status')) {
                $this->handleStatusCommand($chatId, $telegramId, $telegramUsername, $firstName, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/help')) {
                $this->handleHelpCommand($chatId, $telegram);
                return response()->json(['ok' => true]);
            }

            // Find or create user by telegram_id
            $user = $this->findOrCreateUser($telegramId, $telegramUsername, $firstName);

            // Dispatch job to queue for async processing
            ProcessTelegramMessage::dispatch($chatId, $text, $user->id);

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            Log::error('Telegram webhook exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['ok' => true]);
        }
    }

    /**
     * Handle /start command, including deep linking parameters.
     */
    protected function handleStartCommand(
        string $chatId,
        string $telegramId,
        ?string $telegramUsername,
        string $firstName,
        string $fullText,
        TelegramBotService $telegram,
    ): void {
        Log::info('Handling /start command', ['chat_id' => $chatId, 'telegram_id' => $telegramId, 'text' => $fullText]);

        // Check for deep link parameter (e.g. /start connect_ABC123)
        $parts = explode(' ', $fullText, 2);
        $payload = trim($parts[1] ?? '');

        if (! empty($payload)) {
            $webUser = User::where('telegram_link_code', $payload)->first();

            if ($webUser) {
                // Link this web user to the Telegram ID
                $webUser->update([
                    'telegram_id' => $telegramId,
                    'telegram_username' => $telegramUsername ? Str::limit($telegramUsername, 200, '') : null,
                ]);

                $successMessage = "🎉 Account Linked Successfully!\n\n"
                    . "Your Telegram account is now connected to your web profile: {$webUser->email}\n\n"
                    . "🪙 Tokens Balance: {$webUser->credits}\n\n"
                    . "You can now log meals & workouts here in Telegram, and your analytics will instantly reflect on your web dashboard:\n"
                    . config('app.url') . "/dashboard";

                $telegram->sendMessage($chatId, $successMessage);
                return;
            }
        }

        $user = $this->findOrCreateUser($telegramId, $telegramUsername, $firstName);

        $welcomeMessage = "👋 Hello, {$firstName}!\n\n"
            . "🥷 I am FitNinja AI — your personal AI nutritionist & fitness coach.\n\n"
            . "Simply type what you ate or your workout, and I'll calculate calories instantly!\n\n"
            . "Example: \"Had 2 eggs and avocado toast for breakfast\"\n\n"
            . "🪙 Tokens Remaining: {$user->credits}\n\n"
            . "📌 Commands:\n"
            . "/buy — Buy AI Tokens\n"
            . "/status — Check Token Balance\n"
            . "/help — Assistance\n\n"
            . "📊 Web Dashboard: " . config('app.url');

        $telegram->sendMessage($chatId, $welcomeMessage);
    }

    /**
     * Handle /buy command — directs user to website billing token purchase page.
     */
    protected function handleBuyCommand(string $chatId, TelegramBotService $telegram): void
    {
        $billingUrl = config('app.url') . '/billing';

        $message = "🪙 Top Up AI Tokens\n\n"
            . "Buy AI Token Packs via Card or Direct Bank Transfer on our website:\n\n"
            . "💳 Buy Tokens Now: {$billingUrl}";

        $telegram->sendMessage($chatId, $message);
    }

    /**
     * Handle /status command.
     */
    protected function handleStatusCommand(
        string $chatId,
        string $telegramId,
        ?string $telegramUsername,
        string $firstName,
        TelegramBotService $telegram,
    ): void {
        $user = $this->findOrCreateUser($telegramId, $telegramUsername, $firstName);

        $message = "👤 Profile: {$firstName}\n"
            . "🪙 Available Tokens: {$user->credits}\n\n"
            . "💳 Buy Tokens: " . config('app.url') . "/billing\n"
            . "📊 Web Dashboard: " . config('app.url');

        $telegram->sendMessage($chatId, $message);
    }

    /**
     * Handle /help command.
     */
    protected function handleHelpCommand(string $chatId, TelegramBotService $telegram): void
    {
        $message = "🥷 FitNinja AI — Help & Commands:\n\n"
            . "🔹 Send any food description (e.g. \"3 poached eggs and black coffee\")\n"
            . "🔹 Mention workouts (e.g. \"Ran 5km in 25 mins\") to subtract burned calories\n"
            . "🔹 /buy — Top up AI token balance\n"
            . "🔹 /status — Check remaining tokens\n"
            . "🔹 /start — Restart bot\n\n"
            . "🌐 Web Dashboard: " . config('app.url');

        $telegram->sendMessage($chatId, $message);
    }

    /**
     * Find existing user by telegram_id or create a new one with initial 10 gift tokens.
     */
    protected function findOrCreateUser(string $telegramId, ?string $telegramUsername, string $firstName): User
    {
        return User::firstOrCreate(
            ['telegram_id' => $telegramId],
            [
                'name' => $firstName,
                'email' => "tg_{$telegramId}@fitninja.local",
                'password' => bcrypt(Str::random(32)),
                'telegram_username' => $telegramUsername ? Str::limit($telegramUsername, 200, '') : null,
                'subscription_status' => 'free',
                'credits' => 10, // 10 initial gift tokens for new users
            ]
        );
    }
}
