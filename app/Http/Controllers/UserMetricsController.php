<?php

namespace App\Http\Controllers;

use App\Models\UserMetric;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class UserMetricsController extends Controller
{
    /**
     * Update or create user metrics (fitness goals & biometrics).
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'target_weight' => ['nullable', 'numeric', 'min:30', 'max:300'],
            'current_weight' => ['nullable', 'numeric', 'min:30', 'max:300'],
            'height' => ['nullable', 'numeric', 'min:100', 'max:250'],
            'age' => ['nullable', 'integer', 'min:10', 'max:120'],
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'fitness_goal' => ['nullable', Rule::in(['lose', 'maintain', 'gain'])],
            'activity_level' => ['nullable', Rule::in([
                'sedentary', 'light', 'moderate', 'active', 'very_active',
            ])],
            'daily_calorie_goal' => ['nullable', 'integer', 'min:500', 'max:10000'],
            'protein_goal' => ['nullable', 'integer', 'min:10', 'max:500'],
            'fat_goal' => ['nullable', 'integer', 'min:10', 'max:300'],
            'carbs_goal' => ['nullable', 'integer', 'min:10', 'max:1000'],
        ]);

        UserMetric::updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        return Redirect::route('dashboard')->with('status', 'metrics-updated');
    }
}
