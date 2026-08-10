import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    const intakeItem = payload.find((p) => p.dataKey === 'calories');
    const intake = intakeItem ? intakeItem.value : 0;
    const goalItem = payload.find((p) => p.name === 'Target Goal');
    const targetGoal = goalItem ? (typeof goalItem.value === 'function' ? goalItem.value() : goalItem.value) : null;

    return (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-xs shadow-2xl backdrop-blur space-y-1.5 min-w-44">
            <p className="font-bold text-slate-200 border-b border-slate-800 pb-1">{label}</p>
            <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" /> Intake:
                </span>
                <span className="font-black text-emerald-400">{intake} kcal</span>
            </div>
            {targetGoal && (
                <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-400 font-medium flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" /> Goal:
                    </span>
                    <span className="font-bold text-amber-400">{targetGoal} kcal</span>
                </div>
            )}
        </div>
    );
}

export default function EnergyBalanceChart({ chartData, goal }) {
    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-extrabold text-white">14-Day Energy Balance Trend</h3>
                    <p className="text-xs text-slate-400">Intake calories vs target ceiling</p>
                </div>
                {goal && (
                    <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Intake
                        </span>
                        <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                            <span className="inline-block h-2 w-2 rounded-full bg-amber-500" /> Target ({goal} kcal)
                        </span>
                    </div>
                )}
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                        <defs>
                            <linearGradient id="intakeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            axisLine={{ stroke: '#334155', opacity: 0.5 }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="calories"
                            stroke="#10b981"
                            strokeWidth={3}
                            fill="url(#intakeGradient)"
                            dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }}
                            activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                        />
                        {goal && (
                            <Area
                                type="monotone"
                                dataKey={() => goal}
                                stroke="#f59e0b"
                                strokeDasharray="6 4"
                                strokeWidth={1.5}
                                fill="none"
                                name="Target Goal"
                                dot={false}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
