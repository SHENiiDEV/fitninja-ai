import BiometricsModal from '@/Components/Dashboard/BiometricsModal';
import EnergyBalanceChart from '@/Components/Dashboard/EnergyBalanceChart';
import MacroProgressRings from '@/Components/Dashboard/MacroProgressRings';
import MealFeedTimeline from '@/Components/Dashboard/MealFeedTimeline';
import StatWidgetCard from '@/Components/Dashboard/StatWidgetCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ todaySummary, chartData, stats, metrics, telegramStatus }) {
    const [showGoals, setShowGoals] = useState(false);

    const goal = todaySummary.goal || 2000;
    const remaining = goal ? goal - todaySummary.calories : null;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">
                            FitNinja AI Dashboard
                        </h2>
                        <p className="text-xs text-slate-400">Track your daily energy balance and transformation</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('billing.index')}
                            className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-2.5 text-xs font-bold text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
                        >
                            💳 Buy Tokens
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowGoals(true)}
                            className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                        >
                            🎯 Biometrics & Goals
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard — FitNinja AI" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Telegram Unlinked Alert Banner */}
                    {telegramStatus && !telegramStatus.isLinked && (
                        <div className="mb-8 overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 p-6 backdrop-blur-xl">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white">Connect Your Telegram Bot</h3>
                                        <p className="mt-1 text-xs text-slate-300">
                                            Link your web profile to FitNinja AI in Telegram to log meals naturally & sync analytics.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={telegramStatus.connectUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer inline-flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                                >
                                    Connect Telegram Now →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Magic UI Stat Widgets Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatWidgetCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                </svg>
                            }
                            label="Today's Intake"
                            value={`${todaySummary.calories} kcal`}
                            sub={remaining !== null ? (remaining > 0 ? `${remaining} kcal remaining` : `Exceeded by ${Math.abs(remaining)} kcal`) : 'Set a target goal'}
                            color="emerald"
                            badge="LIVE"
                        />

                        <StatWidgetCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                            label="7-Day Weekly Avg"
                            value={`${stats.weeklyAvg} kcal`}
                            sub="Average over last 7 days"
                            color="violet"
                        />

                        <StatWidgetCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            }
                            label="Logging Streak"
                            value={`${stats.streak} Days`}
                            sub="Consecutive days logged"
                            color="amber"
                        />

                        <StatWidgetCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            label="Tokens Balance"
                            value={`${stats.credits} Tokens`}
                            sub="Available for AI logging"
                            color="cyan"
                        />
                    </div>

                    {/* Main Content Layout Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left & Middle Column (2 cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            <EnergyBalanceChart chartData={chartData} goal={goal} />
                            <MealFeedTimeline meals={todaySummary.meals} />
                        </div>

                        {/* Right Sidebar (1 col) */}
                        <div className="space-y-6">
                            <MacroProgressRings
                                calories={todaySummary.calories}
                                goal={goal}
                                protein={todaySummary.protein_g}
                                proteinGoal={todaySummary.proteinGoal}
                                fat={todaySummary.fat_g}
                                fatGoal={todaySummary.fatGoal}
                                carbs={todaySummary.carbs_g}
                                carbsGoal={todaySummary.carbsGoal}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <BiometricsModal show={showGoals} onClose={() => setShowGoals(false)} metrics={metrics} />
        </AuthenticatedLayout>
    );
}
