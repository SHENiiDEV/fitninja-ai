import React from 'react';

export default function StatWidgetCard({ icon, label, value, sub, color = 'emerald', badge }) {
    const gradients = {
        emerald: 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/30 text-emerald-400 shadow-emerald-500/10',
        violet: 'from-violet-500/20 via-purple-500/10 to-transparent border-violet-500/30 text-violet-400 shadow-violet-500/10',
        amber: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/30 text-amber-400 shadow-amber-500/10',
        cyan: 'from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-500/30 text-cyan-400 shadow-cyan-500/10',
    };

    const iconBg = {
        emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
        amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    };

    return (
        <div className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br bg-slate-900/80 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${gradients[color]}`}>
            {/* Ambient Background Light Glow */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-current opacity-10 blur-2xl transition-opacity group-hover:opacity-20" />

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${iconBg[color]} shadow-inner transition-transform duration-300 group-hover:scale-110`}>
                        {icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
                        <h4 className="mt-1 text-2xl font-black text-white tracking-tight">{value}</h4>
                        {sub && <p className="mt-0.5 text-xs text-slate-400 font-medium">{sub}</p>}
                    </div>
                </div>
                {badge && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                        {badge}
                    </span>
                )}
            </div>
        </div>
    );
}
