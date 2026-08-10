<?php

namespace App\Jobs;

use App\Models\DailyLog;
use App\Models\User;
use App\Services\DeepSeekService;
use App\Services\TelegramBotService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessTelegramMessage implements ShouldQueue
{
    use Queueable;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $chatId,
        public string $text,
        public int $userId,
    ) {}

    /**
     * Execute the job.
     *
     * Deducts 1 token per message and requests AI calorie & macro analysis.
     */
    public function handle(TelegramBotService $telegram, DeepSeekService $deepSeek): void
    {
        try {
            $user = User::findOrFail($this->userId);

            // Check if user has token credits
            if (! $user->hasCredits()) {
                $buyUrl = config('app.url') . '/billing';

                $telegram->sendMessage(
                    $this->chatId,
                    "⚠️ Out of Tokens!\n\n"
                    . "You have 0 AI tokens remaining.\n"
                    . "Top up tokens to continue logging your meals:\n"
                    . "💳 Buy Tokens: {$buyUrl}"
                );
                return;
            }

            // Analyze food message with DeepSeek AI
            $analysis = $deepSeek->analyzeFoodMessage($this->text);

            if (! $analysis) {
                $telegram->sendMessage(
                    $this->chatId,
                    "😔 Could not analyze message. Please try again!"
                );
                return;
            }

            // Get or create today's daily log
            $dailyLog = DailyLog::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'date' => now()->toDateString(),
                ],
                [
                    'calories_consumed' => 0,
                    'protein_g' => 0,
                    'fat_g' => 0,
                    'carbs_g' => 0,
                    'raw_text' => '',
                    'meals' => [],
                ]
            );

            // Update daily log with new data
            $existingMeals = $dailyLog->meals ?? [];
            $newMeals = array_merge($existingMeals, $analysis['meals']);
            $newCalories = $dailyLog->calories_consumed + $analysis['calories'];
            $newProtein = $dailyLog->protein_g + $analysis['protein_g'];
            $newFat = $dailyLog->fat_g + $analysis['fat_g'];
            $newCarbs = $dailyLog->carbs_g + $analysis['carbs_g'];

            $dailyLog->update([
                'calories_consumed' => $newCalories,
                'protein_g' => $newProtein,
                'fat_g' => $newFat,
                'carbs_g' => $newCarbs,
                'raw_text' => $dailyLog->raw_text
                    ? $dailyLog->raw_text . "\n" . $this->text
                    : $this->text,
                'meals' => $newMeals,
            ]);

            // Deduct 1 token credit per request
            $user->useCredit();
            $remainingTokens = $user->credits;

            // Build response message
            $calorieEmoji = $analysis['calories'] < 0 ? '🔥' : '🍽';
            $calorieLabel = $analysis['calories'] < 0 ? 'Burned' : 'Calories';

            $response = $analysis['message'] . "\n\n"
                . "{$calorieEmoji} {$calorieLabel}: " . abs($analysis['calories']) . " kcal\n";

            if ($analysis['calories'] > 0) {
                $response .= "🥩 Protein: {$analysis['protein_g']}g | 🥑 Fat: {$analysis['fat_g']}g | 🍞 Carbs: {$analysis['carbs_g']}g\n";
            }

            $response .= "\n📊 Daily Total: {$newCalories} kcal (🥩 {$newProtein}g | 🥑 {$newFat}g | 🍞 {$newCarbs}g)";

            // Add daily goal progress if set
            $metrics = $user->metrics;
            if ($metrics && $metrics->daily_calorie_goal) {
                $goal = $metrics->daily_calorie_goal;
                $remaining = $goal - $newCalories;
                $percentage = min(100, round(($newCalories / $goal) * 100));

                $progressBar = $this->buildProgressBar($percentage);

                $response .= "\n\n🎯 Target Goal: {$goal} kcal\n"
                    . "{$progressBar} {$percentage}%\n"
                    . ($remaining > 0
                        ? "Remaining: {$remaining} kcal"
                        : "⚠️ Target exceeded by " . abs($remaining) . " kcal");
            }

            // Show remaining tokens
            $response .= "\n\n🪙 Tokens Remaining: {$remainingTokens}";

            $telegram->sendMessage($this->chatId, $response);

        } catch (\Throwable $e) {
            Log::error('ProcessTelegramMessage failed', [
                'chat_id' => $this->chatId,
                'user_id' => $this->userId,
                'error' => $e->getMessage(),
            ]);

            $telegram->sendMessage(
                $this->chatId,
                '😔 Error processing message. Please try again later.'
            );

            throw $e;
        }
    }

    /**
     * Build a text-based progress bar.
     */
    protected function buildProgressBar(int $percentage): string
    {
        $clamped = max(0, min(100, $percentage));
        $filled = (int) round($clamped / 10);
        $empty = max(0, 10 - $filled);

        return str_repeat('▓', $filled) . str_repeat('░', $empty);
    }
}
