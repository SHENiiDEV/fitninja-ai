import React from 'react';
import { useForm } from '@inertiajs/react';

export default function BiometricsModal({ show, onClose, metrics }) {
    const { data, setData, put, processing } = useForm({
        target_weight: metrics?.targetWeight ?? '',
        current_weight: metrics?.currentWeight ?? '',
        height: metrics?.height ?? '',
        age: metrics?.age ?? 25,
        gender: metrics?.gender ?? 'male',
        fitness_goal: metrics?.fitnessGoal ?? 'lose',
        activity_level: metrics?.activityLevel ?? 'moderate',
        daily_calorie_goal: metrics?.dailyCalorieGoal ?? 2000,
        protein_goal: metrics?.proteinGoal ?? 150,
        fat_goal: metrics?.fatGoal ?? 65,
        carbs_goal: metrics?.carbsGoal ?? 200,
    });

    const calculateRecommended = () => {
        const w = parseFloat(data.current_weight) || 75;
        const h = parseFloat(data.height) || 175;
        const a = parseInt(data.age) || 25;

        // Mifflin-St Jeor Equation for BMR
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        bmr = data.gender === 'male' ? bmr + 5 : bmr - 161;

        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9,
        };
        const mult = multipliers[data.activity_level] || 1.55;
        let tdee = bmr * mult;

        if (data.fitness_goal === 'lose') tdee -= 500;
        if (data.fitness_goal === 'gain') tdee += 300;

        const cal = Math.max(1200, Math.round(tdee));
        const protein = Math.round(w * (data.fitness_goal === 'gain' ? 2.2 : 2.0));
        const fat = Math.round((cal * 0.25) / 9);
        const carbs = Math.round((cal - (protein * 4) - (fat * 9)) / 4);

        setData((prev) => ({
            ...prev,
            daily_calorie_goal: cal,
            protein_goal: protein,
            fat_goal: fat,
            carbs_goal: Math.max(50, carbs),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('metrics.update'), { onSuccess: () => onClose() });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto" onClick={onClose}>
            <div className="w-full max-w-lg transform rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl transition-all my-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">Biometrics & Macro Goals</h3>
                        <p className="text-xs text-slate-400">Auto-calculate BMR & TDEE macro targets for your body</p>
                    </div>
                    <button type="button" onClick={onClose} className="cursor-pointer text-slate-400 hover:text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Current Weight (kg)</label>
                            <input type="number" step="0.1" value={data.current_weight} onChange={(e) => setData('current_weight', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                        </div>
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Target Weight (kg)</label>
                            <input type="number" step="0.1" value={data.target_weight} onChange={(e) => setData('target_weight', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                        </div>
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Height (cm)</label>
                            <input type="number" step="0.1" value={data.height} onChange={(e) => setData('height', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Age</label>
                            <input type="number" value={data.age} onChange={(e) => setData('age', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                        </div>
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Gender</label>
                            <select value={data.gender} onChange={(e) => setData('gender', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block font-semibold text-slate-400">Fitness Goal</label>
                            <select value={data.fitness_goal} onChange={(e) => setData('fitness_goal', e.target.value)}
                                className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500">
                                <option value="lose">Fat Loss (-500 kcal)</option>
                                <option value="maintain">Maintain Weight</option>
                                <option value="gain">Muscle Gain (+300 kcal)</option>
                            </select>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold">⚡ Auto-Calculate Recommended Targets</span>
                        <button
                            type="button"
                            onClick={calculateRecommended}
                            className="cursor-pointer rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow hover:bg-emerald-400 transition-all"
                        >
                            Calculate BMR
                        </button>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                        <span className="text-slate-300 font-bold uppercase tracking-wider block mb-2">Daily Target Ceiling</span>
                        <div className="grid grid-cols-4 gap-3">
                            <div>
                                <label className="mb-1 block font-semibold text-slate-400">Calories (kcal)</label>
                                <input type="number" value={data.daily_calorie_goal} onChange={(e) => setData('daily_calorie_goal', e.target.value)}
                                    className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white font-bold focus:border-emerald-500" />
                            </div>
                            <div>
                                <label className="mb-1 block font-semibold text-slate-400">Protein (g)</label>
                                <input type="number" value={data.protein_goal} onChange={(e) => setData('protein_goal', e.target.value)}
                                    className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                            </div>
                            <div>
                                <label className="mb-1 block font-semibold text-slate-400">Fat (g)</label>
                                <input type="number" value={data.fat_goal} onChange={(e) => setData('fat_goal', e.target.value)}
                                    className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                            </div>
                            <div>
                                <label className="mb-1 block font-semibold text-slate-400">Carbs (g)</label>
                                <input type="number" value={data.carbs_goal} onChange={(e) => setData('carbs_goal', e.target.value)}
                                    className="w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                        <button type="button" onClick={onClose}
                            className="cursor-pointer flex-1 rounded-xl border border-slate-700 px-4 py-2.5 font-semibold text-slate-300 hover:bg-slate-800">
                            Cancel
                        </button>
                        <button type="submit" disabled={processing}
                            className="cursor-pointer flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 font-bold text-white shadow-lg hover:scale-105 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save All Goals'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
