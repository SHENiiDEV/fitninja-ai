<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserMetricsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/privacy-policy', [\App\Http\Controllers\LegalController::class, 'privacyPolicy'])->name('legal.privacy');
Route::get('/terms-of-service', [\App\Http\Controllers\LegalController::class, 'termsOfService'])->name('legal.terms');
Route::get('/refund-policy', [\App\Http\Controllers\LegalController::class, 'refundPolicy'])->name('legal.refund');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('/metrics', [UserMetricsController::class, 'update'])->name('metrics.update');

    Route::delete('/dashboard/meals/{index}', [DashboardController::class, 'deleteMeal'])->name('dashboard.meals.destroy');

    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/card', [BillingController::class, 'processCardPayment'])->name('billing.card');
    Route::post('/billing/bank', [BillingController::class, 'confirmBankTransfer'])->name('billing.bank');
});

require __DIR__.'/auth.php';
