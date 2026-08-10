<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyLog extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'date',
        'calories_consumed',
        'protein_g',
        'fat_g',
        'carbs_g',
        'raw_text',
        'meals',
    ];

    /**
     * Get the user that owns the daily log.
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
            'date' => 'date',
            'calories_consumed' => 'integer',
            'protein_g' => 'integer',
            'fat_g' => 'integer',
            'carbs_g' => 'integer',
            'meals' => 'array',
        ];
    }
}
