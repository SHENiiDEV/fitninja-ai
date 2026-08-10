import React from 'react';
import { router } from '@inertiajs/react';

export default function MealFeedTimeline({ meals }) {
    if (!meals?.length) {
        return (
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 text-center backdrop-blur-2xl">
                <h3 className="text-base font-extrabold text-white mb-4">Today's Logged Entries</h3>
                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <p className="text-sm font-bold text-slate-200">No meal entries for today yet</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                        Send text or voice notes to the Telegram bot to record your meals & workouts automatically!
                    </p>
                </div>
            </div>
        );
    }

    const handleDelete = (index) => {
        if (confirm('Delete this meal entry from today\'s daily log?')) {
            router.delete(route('dashboard.meals.destroy', index));
        }
    };

    return (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                <h3 className="text-base font-extrabold text-white">Today's Logged Entries</h3>
                <span className="text-xs font-semibold text-slate-400">
                    {meals.length} {meals.length === 1 ? 'entry' : 'entries'}
                </span>
            </div>

            <div className="space-y-3">
                {meals.map((meal, i) => (
                    <div
                        key={i}
                        className="group relative flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 transition-all duration-300 hover:border-slate-700 hover:bg-slate-950/90"
                    >
                        <div className="space-y-1">
                            <span className="text-sm font-bold text-slate-100 block">{meal.name}</span>
                            {(meal.protein_g > 0 || meal.fat_g > 0 || meal.carbs_g > 0) && (
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                                    <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-rose-400 border border-rose-500/20">🥩 {meal.protein_g || 0}g</span>
                                    <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-400 border border-amber-500/20">🥑 {meal.fat_g || 0}g</span>
                                    <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-cyan-400 border border-cyan-500/20">🍞 {meal.carbs_g || 0}g</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`rounded-full border px-3 py-1 text-xs font-bold ${meal.calories < 0 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                                {meal.calories < 0 ? `🔥 ${meal.calories} kcal` : `🍽 ${meal.calories} kcal`}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDelete(i)}
                                className="cursor-pointer text-slate-500 opacity-0 group-hover:opacity-100 hover:text-rose-400 transition-all p-1"
                                title="Delete entry"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
