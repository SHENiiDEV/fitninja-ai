<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('target_weight', 5, 1)->nullable();
            $table->decimal('current_weight', 5, 1)->nullable();
            $table->integer('daily_calorie_goal')->nullable();
            $table->decimal('height', 5, 1)->nullable();
            $table->enum('activity_level', [
                'sedentary',
                'light',
                'moderate',
                'active',
                'very_active',
            ])->default('moderate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_metrics');
    }
};
