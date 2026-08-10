import { useState } from 'react';

export default function LiveDemoSimulator() {
    const [simText, setSimText] = useState('Had 3 poached eggs, wholewheat toast, and half an avocado');
    const [simResult, setSimResult] = useState({
        message: 'Excellent breakfast choice! Poached eggs deliver top-tier protein, avocado supplies healthy monounsaturated fats, and wholewheat toast provides sustained energy.',
        calories: 450,
        protein_g: 24,
        fat_g: 22,
        carbs_g: 32,
        meals: [
            { name: '3 Poached Eggs', calories: 210, protein_g: 18, fat_g: 15, carbs_g: 2 },
            { name: 'Wholewheat Toast', calories: 120, protein_g: 4, fat_g: 1, carbs_g: 22 },
            { name: 'Avocado (half)', calories: 120, protein_g: 2, fat_g: 6, carbs_g: 8 },
        ],
    });
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = (input) => {
        setIsSimulating(true);
        const query = input || simText;
        setSimText(query);

        setTimeout(() => {
            if (query.toLowerCase().includes('run') || query.toLowerCase().includes('workout') || query.toLowerCase().includes('gym') || query.toLowerCase().includes('5km')) {
                setSimResult({
                    message: 'Great workout session! 5km cardio run elevates your metabolic rate and burns stored energy.',
                    calories: -380,
                    protein_g: 0,
                    fat_g: 0,
                    carbs_g: 0,
                    meals: [{ name: '5km Outdoor Run (25 mins)', calories: -380, protein_g: 0, fat_g: 0, carbs_g: 0 }],
                });
            } else if (query.toLowerCase().includes('salmon') || query.toLowerCase().includes('fish') || query.toLowerCase().includes('quinoa')) {
                setSimResult({
                    message: 'Nutrient-dense meal! Salmon provides essential Omega-3 fatty acids, paired with complete plant protein from quinoa.',
                    calories: 580,
                    protein_g: 42,
                    fat_g: 24,
                    carbs_g: 45,
                    meals: [
                        { name: 'Grilled Salmon Fillet', calories: 340, protein_g: 34, fat_g: 20, carbs_g: 0 },
                        { name: 'Cooked Quinoa (1 cup)', calories: 220, protein_g: 8, fat_g: 3, carbs_g: 39 },
                        { name: 'Steamed Broccoli', calories: 20, protein_g: 0, fat_g: 1, carbs_g: 6 },
                    ],
                });
            } else {
                setSimResult({
                    message: 'Balanced meal! Great protein-to-carbohydrate ratio supporting your daily energy ceiling.',
                    calories: 450,
                    protein_g: 24,
                    fat_g: 22,
                    carbs_g: 32,
                    meals: [
                        { name: '3 Poached Eggs', calories: 210, protein_g: 18, fat_g: 15, carbs_g: 2 },
                        { name: 'Wholewheat Toast', calories: 120, protein_g: 4, fat_g: 1, carbs_g: 22 },
                        { name: 'Avocado (half)', calories: 120, protein_g: 2, fat_g: 6, carbs_g: 8 },
                    ],
                });
            }
            setIsSimulating(false);
        }, 300);
    };

    return (
        <section id="demo" className="relative z-10 mx-auto max-w-5xl px-6 py-12 lg:px-8">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl lg:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
                    <div>
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
                            ⚡ Interactive Live AI Demo
                        </span>
                        <h3 className="mt-2 text-2xl font-bold text-white">Test Neural Meal Analysis Live</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <button
                            type="button"
                            onClick={() => runSimulation('Had 3 poached eggs, wholewheat toast, and half an avocado')}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition-all"
                        >
                            🥚 Breakfast Eggs
                        </button>
                        <button
                            type="button"
                            onClick={() => runSimulation('Grilled salmon fillet with 1 cup quinoa and steamed broccoli')}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 hover:border-teal-500 hover:text-teal-400 transition-all"
                        >
                            🐟 Salmon & Quinoa
                        </button>
                        <button
                            type="button"
                            onClick={() => runSimulation('Ran 5km outdoor run in 25 minutes')}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-all"
                        >
                            🏃 5km Cardio Run
                        </button>
                    </div>
                </div>

                {/* Live Input Field */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        value={simText}
                        onChange={(e) => setSimText(e.target.value)}
                        placeholder="Type any food or workout description..."
                        className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3.5 text-sm text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                    <button
                        type="button"
                        onClick={() => runSimulation()}
                        disabled={isSimulating}
                        className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                    >
                        {isSimulating ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>

                {/* Animated AI Results Panel */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
                    {/* Left: AI Commentary */}
                    <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-[#0d1322] p-5 text-left space-y-3">
                        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
                                AI
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">FitNinja Neural Engine</h4>
                                <span className="text-[10px] text-emerald-400">● Live Neural Analysis</span>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-300 font-medium">
                            "{simResult.message}"
                        </p>
                    </div>

                    {/* Right: Macro Breakdown Display */}
                    <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Calorie Breakdown</span>
                            <span className={`text-base font-black ${simResult.calories < 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {simResult.calories < 0 ? `🔥 Burned ${Math.abs(simResult.calories)} kcal` : `🍽 ${simResult.calories} kcal`}
                            </span>
                        </div>

                        {simResult.calories > 0 && (
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                                    <span className="text-[10px] font-semibold text-slate-400 block">Protein 🥩</span>
                                    <span className="text-sm font-bold text-rose-400">{simResult.protein_g}g</span>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                                    <span className="text-[10px] font-semibold text-slate-400 block">Fats 🥑</span>
                                    <span className="text-sm font-bold text-amber-400">{simResult.fat_g}g</span>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                                    <span className="text-[10px] font-semibold text-slate-400 block">Carbs 🍞</span>
                                    <span className="text-sm font-bold text-cyan-400">{simResult.carbs_g}g</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                            {simResult.meals.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-slate-300 font-medium">
                                    <span>• {item.name}</span>
                                    <span className="font-bold text-white">{item.calories} kcal</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
