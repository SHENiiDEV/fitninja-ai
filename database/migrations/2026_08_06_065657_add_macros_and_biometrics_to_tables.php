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
        Schema::table('daily_logs', function (Blueprint $table) {
            $table->integer('protein_g')->default(0)->after('calories_consumed');
            $table->integer('fat_g')->default(0)->after('protein_g');
            $table->integer('carbs_g')->default(0)->after('fat_g');
        });

        Schema::table('user_metrics', function (Blueprint $table) {
            $table->integer('age')->nullable()->after('height');
            $table->string('gender', 20)->nullable()->default('male')->after('age');
            $table->string('fitness_goal', 20)->nullable()->default('lose')->after('gender');
            $table->integer('protein_goal')->nullable()->default(150)->after('daily_calorie_goal');
            $table->integer('fat_goal')->nullable()->default(65)->after('protein_goal');
            $table->integer('carbs_goal')->nullable()->default(200)->after('fat_goal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('daily_logs', function (Blueprint $table) {
            $table->dropColumn(['protein_g', 'fat_g', 'carbs_g']);
        });

        Schema::table('user_metrics', function (Blueprint $table) {
            $table->dropColumn(['age', 'gender', 'fitness_goal', 'protein_goal', 'fat_goal', 'carbs_goal']);
        });
    }
};
