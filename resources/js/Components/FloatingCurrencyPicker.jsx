import { CURRENCIES, useCurrency } from '@/Contexts/CurrencyContext';
import { useEffect, useRef, useState } from 'react';

export default function FloatingCurrencyPicker() {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative z-40">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-200 shadow-xl backdrop-blur-xl transition-all hover:border-emerald-500/50 hover:text-white"
            >
                <span>{currency.flag}</span>
                <span>{currency.code}</span>
                <svg
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-slate-800 bg-[#090d16]/95 p-1.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                    <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800/60 mb-1">
                        Select Currency
                    </div>
                    {Object.values(CURRENCIES).map((c) => (
                        <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                                setCurrency(c.code);
                                setIsOpen(false);
                            }}
                            className={`cursor-pointer flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                                currency.code === c.code
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span>{c.flag}</span>
                                <span>{c.code}</span>
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{c.symbol}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
