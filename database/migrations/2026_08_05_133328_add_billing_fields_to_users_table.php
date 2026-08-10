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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('telegram_username');
            $table->string('billing_address')->nullable()->after('phone');
            $table->string('billing_city')->nullable()->after('billing_address');
            $table->string('billing_country')->nullable()->after('billing_city');
            $table->string('billing_postcode')->nullable()->after('billing_country');
            $table->string('telegram_link_code', 64)->nullable()->unique()->after('billing_postcode');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone',
                'billing_address',
                'billing_city',
                'billing_country',
                'billing_postcode',
                'telegram_link_code',
            ]);
        });
    }
};
