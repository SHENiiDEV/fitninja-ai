<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TelegramLoginController extends Controller
{
    /**
     * Handle Telegram Login Widget callback.
     *
     * Verifies the authentication data hash from Telegram
     * and logs in or creates the user.
     */
    public function callback(Request $request): RedirectResponse
    {
        $data = $request->all();

        // Verify the data from Telegram
        if (! $this->verifyTelegramData($data)) {
            Log::warning('Telegram login verification failed', $data);
            return redirect()->route('login')->withErrors([
                'telegram' => 'Не удалось верифицировать данные Telegram.',
            ]);
        }

        // Check auth_date is not older than 1 day
        if ((time() - $data['auth_date']) > 86400) {
            return redirect()->route('login')->withErrors([
                'telegram' => 'Данные авторизации устарели. Попробуй снова.',
            ]);
        }

        $telegramId = (string) $data['id'];
        $firstName = $data['first_name'] ?? 'User';
        $username = $data['username'] ?? null;

        // Find existing user by telegram_id or create new one
        $user = User::firstOrCreate(
            ['telegram_id' => $telegramId],
            [
                'name' => trim(($firstName . ' ' . ($data['last_name'] ?? ''))),
                'email' => "tg_{$telegramId}@fitninja.local",
                'password' => bcrypt(Str::random(32)),
                'telegram_username' => $username ? Str::limit($username, 200, '') : null,
                'subscription_status' => 'free',
                'credits' => 5,
            ]
        );

        // Update username if changed
        if ($username && $user->telegram_username !== $username) {
            $user->update(['telegram_username' => Str::limit($username, 200, '')]);
        }

        Auth::login($user, remember: true);

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Verify data received from Telegram Login Widget.
     *
     * @see https://core.telegram.org/widgets/login#checking-authorization
     */
    protected function verifyTelegramData(array $data): bool
    {
        $botToken = config('services.telegram.bot_token');

        if (empty($botToken)) {
            Log::error('TELEGRAM_BOT_TOKEN is not set');
            return false;
        }

        $checkHash = $data['hash'] ?? null;
        if (! $checkHash) {
            return false;
        }

        // Remove hash from data and sort alphabetically
        $checkData = collect($data)
            ->except('hash')
            ->map(fn ($value, $key) => "{$key}={$value}")
            ->sort()
            ->values()
            ->implode("\n");

        $secretKey = hash('sha256', $botToken, true);
        $hash = hash_hmac('sha256', $checkData, $secretKey);

        return hash_equals($hash, $checkHash);
    }
}
