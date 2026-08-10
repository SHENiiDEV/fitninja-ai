import React from 'react';

export default function MacroProgressRings({ calories, goal, protein, proteinGoal, fat, fatGoal, carbs, carbsGoal }) {
    const pct = goal ? Math.min(100, Math.round((calories / goal) * 100)) : 0;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    const ringColor = calories > goal ? '#rose-500' : calories > goal * 0.8 ? '#f59e0b' : '#10b981';

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
                <div>
                    <h3 className="text-base font-extrabold text-white">Daily Target Progress</h3>
                    <p className="text-xs text-slate-400">Energy & Macro Nutrients Balance</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                    {calories} / {goal} kcal
                </span>
            </div>

            {/* Circular Gauge Ring */}
            <div className="flex flex-col items-center justify-center py-2">
                <div className="relative flex items-center justify-center">
                    <svg className="h-44 w-44 -rotate-90 transform">
                        {/* Gradient Definitions */}
                        <defs>
                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                        </defs>
                        {/* Background Ring */}
                        <circle
                            cx="88" cy="88" r={radius}
                            stroke="currentColor" strokeWidth="10" fill="none"
                            className="text-slate-800/60"
                        />
                        {/* Animated Progress Circle */}
                        <circle
                            cx="88" cy="88" r={radius}
                            stroke="url(#ringGradient)" strokeWidth="10" fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                        />
                    </svg>

                    {/* Center Stat Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-black text-white tracking-tight">{pct}%</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">TARGET</span>
                    </div>
                </div>
            </div>

            {/* Macro Progress Bars */}
            <div className="mt-6 space-y-4 border-t border-slate-800/80 pt-5 text-xs">
                {/* Protein Bar */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                            🥩 Protein
                        </span>
                        <span className="text-slate-400">
                            <span className="font-bold text-rose-400">{protein}</span> / {proteinGoal} g
                        </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all duration-700 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                            style={{ width: `${Math.min(100, Math.round((protein / (proteinGoal || 1)) * 100))}%` }}
                        />
                    </div>
                </div>

                {/* Fats Bar */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                            🥑 Fats
                        </span>
                        <span className="text-slate-400">
                            <span className="font-bold text-amber-400">{fat}</span> / {fatGoal} g
                        </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-700 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                            style={{ width: `${Math.min(100, Math.round((fat / (fatGoal || 1)) * 100))}%` }}
                        />
                    </div>
                </div>

                {/* Carbs Bar */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-semibold">
                        <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                            🍞 Carbs
                        </span>
                        <span className="text-slate-400">
                            <span className="font-bold text-cyan-400">{carbs}</span> / {carbsGoal} g
                        </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                            style={{ width: `${Math.min(100, Math.round((carbs / (carbsGoal || 1)) * 100))}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
