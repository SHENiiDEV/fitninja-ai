<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserMetric extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'target_weight',
        'current_weight',
        'daily_calorie_goal',
        'protein_goal',
        'fat_goal',
        'carbs_goal',
        'height',
        'age',
        'gender',
        'fitness_goal',
        'activity_level',
    ];

    /**
     * Get the user that owns the metrics.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'target_weight' => 'decimal:1',
            'current_weight' => 'decimal:1',
            'height' => 'decimal:1',
            'age' => 'integer',
            'daily_calorie_goal' => 'integer',
            'protein_goal' => 'integer',
            'fat_goal' => 'integer',
            'carbs_goal' => 'integer',
        ];
    }
}
