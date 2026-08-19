import { useEffect, useState } from 'react';

export default function OfflineBanner() {
    const [isOnline, setIsOnline] = useState(true);
    const [showRestored, setShowRestored] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowRestored(true);
            const timer = setTimeout(() => {
                setShowRestored(false);
            }, 3500);
            return () => clearTimeout(timer);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowRestored(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check initial state
        if (!navigator.onLine) {
            setIsOnline(false);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline && !showRestored) return null;

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
            {!isOnline ? (
                <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/90 px-4 py-3 text-xs font-bold text-rose-200 shadow-2xl backdrop-blur-xl animate-bounce">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                        <span>⚠️ Mobile Network Disconnected — Waiting for internet connection...</span>
                    </div>
                </div>
            ) : showRestored ? (
                <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/90 px-4 py-3 text-xs font-bold text-emerald-200 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span>✅ Internet Connection Restored — Neural sync re-established.</span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
