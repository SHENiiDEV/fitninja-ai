<?php

namespace App\Http\Controllers;

use App\Models\DailyLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the main dashboard with calorie charts and today's summary.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $today = Carbon::today();

        // Ensure user has a telegram_link_code if not linked yet
        if (empty($user->telegram_id) && empty($user->telegram_link_code)) {
            $user->telegram_link_code = 'connect_' . strtoupper(Str::random(10));
            $user->save();
        }

        $botUsername = config('services.telegram.bot_username', 'fitninjaAI_bot');
        $telegramConnectUrl = "https://t.me/{$botUsername}?start={$user->telegram_link_code}";

        // Today's log
        $todayLog = DailyLog::where('user_id', $user->id)
            ->where('date', $today->toDateString())
            ->first();

        // Last 14 days of calorie data for the chart
        $chartData = DailyLog::where('user_id', $user->id)
            ->where('date', '>=', $today->copy()->subDays(13)->toDateString())
            ->orderBy('date')
            ->get()
            ->map(fn (DailyLog $log) => [
                'date' => $log->date->format('d.m'),
                'fullDate' => $log->date->format('Y-m-d'),
                'calories' => $log->calories_consumed,
                'protein' => $log->protein_g,
                'fat' => $log->fat_g,
                'carbs' => $log->carbs_g,
                'meals' => $log->meals ?? [],
            ]);

        // Fill missing days with zero calories
        $filledData = collect();
        for ($i = 13; $i >= 0; $i--) {
            $date = $today->copy()->subDays($i);
            $existing = $chartData->firstWhere('fullDate', $date->format('Y-m-d'));
            $filledData->push($existing ?? [
                'date' => $date->format('d.m'),
                'fullDate' => $date->format('Y-m-d'),
                'calories' => 0,
                'protein' => 0,
                'fat' => 0,
                'carbs' => 0,
                'meals' => [],
            ]);
        }

        // User metrics (goals & biometrics)
        $metrics = $user->metrics;

        // Weekly average
        $weekLogs = DailyLog::where('user_id', $user->id)
            ->where('date', '>=', $today->copy()->subDays(6)->toDateString())
            ->get();
        $weeklyAvg = $weekLogs->count() > 0
            ? round($weekLogs->avg('calories_consumed'))
            : 0;

        // Streak: consecutive days with logged data
        $streak = 0;
        for ($i = 0; $i <= 30; $i++) {
            $exists = DailyLog::where('user_id', $user->id)
                ->where('date', $today->copy()->subDays($i)->toDateString())
                ->where('calories_consumed', '>', 0)
                ->exists();
            if ($exists) {
                $streak++;
            } else {
                break;
            }
        }

        return Inertia::render('Dashboard', [
            'todaySummary' => [
                'calories' => $todayLog?->calories_consumed ?? 0,
                'protein_g' => $todayLog?->protein_g ?? 0,
                'fat_g' => $todayLog?->fat_g ?? 0,
                'carbs_g' => $todayLog?->carbs_g ?? 0,
                'meals' => $todayLog?->meals ?? [],
                'goal' => $metrics?->daily_calorie_goal ?? 2000,
                'proteinGoal' => $metrics?->protein_goal ?? 150,
                'fatGoal' => $metrics?->fat_goal ?? 65,
                'carbsGoal' => $metrics?->carbs_goal ?? 200,
            ],
            'chartData' => $filledData->values(),
            'stats' => [
                'weeklyAvg' => $weeklyAvg,
                'streak' => $streak,
                'credits' => $user->credits,
                'subscription' => $user->subscription_status,
            ],
            'metrics' => $metrics ? [
                'targetWeight' => $metrics->target_weight,
                'currentWeight' => $metrics->current_weight,
                'dailyCalorieGoal' => $metrics->daily_calorie_goal,
                'proteinGoal' => $metrics->protein_goal ?? 150,
                'fatGoal' => $metrics->fat_goal ?? 65,
                'carbsGoal' => $metrics->carbs_goal ?? 200,
                'height' => $metrics->height,
                'age' => $metrics->age ?? 25,
                'gender' => $metrics->gender ?? 'male',
                'fitnessGoal' => $metrics->fitness_goal ?? 'lose',
                'activityLevel' => $metrics->activity_level ?? 'moderate',
            ] : null,
            'telegramStatus' => [
                'isLinked' => ! empty($user->telegram_id),
                'username' => $user->telegram_username,
                'connectUrl' => $telegramConnectUrl,
            ],
        ]);
    }

    /**
     * Delete a specific meal entry from today's log.
     */
    public function deleteMeal(Request $request, int $index): RedirectResponse
    {
        $user = $request->user();
        $today = Carbon::today();

        $dailyLog = DailyLog::where('user_id', $user->id)
            ->where('date', $today->toDateString())
            ->first();

        if ($dailyLog && isset($dailyLog->meals[$index])) {
            $meals = $dailyLog->meals;
            $removedMeal = $meals[$index];
            unset($meals[$index]);
            $meals = array_values($meals);

            $newCalories = max(0, $dailyLog->calories_consumed - ($removedMeal['calories'] ?? 0));
            $newProtein = max(0, $dailyLog->protein_g - ($removedMeal['protein_g'] ?? 0));
            $newFat = max(0, $dailyLog->fat_g - ($removedMeal['fat_g'] ?? 0));
            $newCarbs = max(0, $dailyLog->carbs_g - ($removedMeal['carbs_g'] ?? 0));

            $dailyLog->update([
                'meals' => $meals,
                'calories_consumed' => $newCalories,
                'protein_g' => $newProtein,
                'fat_g' => $newFat,
                'carbs_g' => $newCarbs,
            ]);
        }

        return redirect()->route('dashboard')->with('status', 'meal-deleted');
    }
}
