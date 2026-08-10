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

            // Handle commands
            if (str_starts_with($text, '/start')) {
                $this->handleStartCommand($chatId, $telegramId, $telegramUsername, $firstName, $text, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/buy') || str_starts_with($text, '/tokens') || str_starts_with($text, '/subscribe')) {
                $this->handleBuyCommand($chatId, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/status')) {
                $this->handleStatusCommand($chatId, $telegramId, $firstName, $telegram);
                return response()->json(['ok' => true]);
            }

            if (str_starts_with($text, '/help')) {
                $this->handleHelpCommand($chatId, $telegram);
                return response()->json(['ok' => true]);
            }

            // Find existing linked user
            $user = User::where('telegram_id', $telegramId)->first();

            if (! $user) {
                // If user is not linked to a web account yet
                $registerUrl = config('app.url') . '/register';
                $unlinkedMessage = "⚠️ Account Not Linked Yet\n\n"
                    . "To log your meals and track calories & macros, please create an account on our website first:\n\n"
                    . "🌐 Register Account: {$registerUrl}\n\n"
                    . "After logging in, click 'Connect Telegram Now' on your web dashboard to link your profile!";

                $telegram->sendMessage($chatId, $unlinkedMessage);
                return response()->json(['ok' => true]);
            }

            // Update username if changed
            if ($telegramUsername && $user->telegram_username !== $telegramUsername) {
                $user->update(['telegram_username' => Str::limit($telegramUsername, 200, '')]);
            }

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
     * Handle /start command with or without deep linking connect code.
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

                $successMessage = "🎉 Account Connected Successfully!\n\n"
                    . "Your Telegram account is now linked to your web profile: {$webUser->email}\n\n"
                    . "🪙 Available Tokens Balance: {$webUser->credits} Tokens\n\n"
                    . "💡 How to use FitNinja AI:\n"
                    . "Simply type what you ate or your workout in this chat, and the AI will calculate calories, protein, fats, and carbs automatically!\n\n"
                    . "Example: \"Had 3 poached eggs, wholewheat toast and black coffee\"\n\n"
                    . "📊 View Web Dashboard & Trends:\n"
                    . config('app.url') . "/dashboard";

                $telegram->sendMessage($chatId, $successMessage);
                return;
            }

            // Invalid or expired payload
            $invalidMessage = "⚠️ Invalid Connection Code\n\n"
                . "The connection code was invalid or has expired.\n"
                . "Please log in to your web account and click 'Connect Telegram Now' on your dashboard:\n"
                . config('app.url') . "/dashboard";

            $telegram->sendMessage($chatId, $invalidMessage);
            return;
        }

        // Check if user is already linked
        $existingUser = User::where('telegram_id', $telegramId)->first();

        if ($existingUser) {
            $welcomeBack = "👋 Welcome back, {$firstName}!\n\n"
                . "🥷 FitNinja AI is ready. Log your meals & workouts naturally:\n"
                . "Example: \"Had 2 eggs, avocado toast, and 5km run\"\n\n"
                . "🪙 Available Tokens: {$existingUser->credits}\n\n"
                . "📊 Web Dashboard: " . config('app.url') . "/dashboard";

            $telegram->sendMessage($chatId, $welcomeBack);
            return;
        }

        // Standard /start without token for unregistered visitors
        $registerUrl = config('app.url') . '/register';
        $loginUrl = config('app.url') . '/login';

        $unlinkedStart = "👋 Welcome to FitNinja AI!\n\n"
            . "To start logging meals and tracking calories & macro nutrients, please create an account on our website first:\n\n"
            . "🌐 Register Account: {$registerUrl}\n"
            . "🔑 Log In: {$loginUrl}\n\n"
            . "📌 How to Link Your Profile:\n"
            . "1. Register or Log In on our website.\n"
            . "2. Click 'Connect Telegram Now →' on your web dashboard.\n"
            . "3. You will be automatically linked!";

        $telegram->sendMessage($chatId, $unlinkedStart);
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
        string $firstName,
        TelegramBotService $telegram,
    ): void {
        $user = User::where('telegram_id', $telegramId)->first();

        if (! $user) {
            $registerUrl = config('app.url') . '/register';
            $telegram->sendMessage($chatId, "⚠️ Please register an account on our website first:\n{$registerUrl}");
            return;
        }

        $message = "👤 Profile: {$user->name} ({$user->email})\n"
            . "🪙 Available Tokens: {$user->credits}\n\n"
            . "💳 Buy Tokens: " . config('app.url') . "/billing\n"
            . "📊 Web Dashboard: " . config('app.url') . "/dashboard";

        $telegram->sendMessage($chatId, $message);
    }

    /**
     * Handle /help command.
     */
    protected function handleHelpCommand(string $chatId, TelegramBotService $telegram): void
    {
        $message = "🥷 FitNinja AI — Help & Instructions:\n\n"
            . "🔹 Send any food description (e.g. \"3 poached eggs and black coffee\")\n"
            . "🔹 Mention workouts (e.g. \"Ran 5km in 25 mins\") to subtract burned calories\n"
            . "🔹 /buy — Top up AI token balance\n"
            . "🔹 /status — Check remaining tokens\n"
            . "🔹 /start — Connection & status guide\n\n"
            . "🌐 Web Dashboard: " . config('app.url') . "/dashboard";

        $telegram->sendMessage($chatId, $message);
    }
}
