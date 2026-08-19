import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('fitninja_cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('fitninja_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('fitninja_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-50 max-w-md animate-fade-in">
            <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold text-base border border-emerald-500/30">
                        🍪
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Cookie & Data Encryption Privacy</h4>
                        <p className="mt-1 text-xs text-slate-300 leading-relaxed font-light">
                            We use essential cookies and 256-bit encrypted local storage to preserve your active session, token balances, and executive user preferences.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800/60">
                    <Link
                        href={route('legal.privacy')}
                        className="text-[11px] font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        Privacy Policy →
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={declineCookies}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            Decline
                        </button>

                        <button
                            type="button"
                            onClick={acceptCookies}
                            className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                        >
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
