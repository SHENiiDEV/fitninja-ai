import ApplicationLogo from '@/Components/ApplicationLogo';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';

export default function Error({ status = 404 }) {
    const titleMap = {
        404: '404 — Lost in the Night Routine',
        500: '500 — Temporary Clinical Rest',
        403: '403 — Restricted Medical Section',
        503: '503 — Scheduled System Care',
    };

    const descriptionMap = {
        404: 'The requested route or fitness protocol has fallen asleep or vanished into stealth mode. (Page Not Found)',
        500: 'Our neural servers are currently undergoing temporary clinical rest to optimize deep learning models.',
        403: 'Access restricted to unauthorized users. High-level executive authorization is required.',
        503: 'Scheduled system care and maintenance in progress. Neural processing will resume shortly.',
    };

    const title = titleMap[status] || `${status} — Neural Exception`;
    const description = descriptionMap[status] || 'An unexpected neural processing exception occurred.';

    return (
        <>
            <Head title={title} />

            <div className="relative flex min-h-screen flex-col justify-between bg-[#070A11] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-600/15 blur-[160px]" />
                    <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-teal-600/15 blur-[160px]" />
                </div>

                {/* Grid Pattern */}
                <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Navigation Bar */}
                <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8 border-b border-slate-800/80 backdrop-blur-xl">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10" />
                        <span className="text-xl font-black tracking-tight text-white">
                            FitNinja <span className="text-emerald-400">AI</span>
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </header>

                {/* Main Error Hero Section */}
                <main className="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
                    <div className="relative mb-6">
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl animate-pulse" />
                        <ApplicationLogo className="relative h-28 w-28 drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]" />
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                        <span>⚡ HTTP {status} SYSTEM ERROR</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h1>

                    <p className="mt-4 max-w-xl text-base text-slate-400 leading-relaxed font-light">
                        {description}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40"
                        >
                            Return to Homepage →
                        </Link>

                        <Link
                            href={route('dashboard')}
                            className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/80 px-7 py-4 text-sm font-bold text-slate-200 backdrop-blur-xl transition-all hover:border-slate-700 hover:text-white"
                        >
                            Launch Dashboard
                        </Link>
                    </div>

                    <div className="mt-12 text-xs text-slate-500 font-light">
                        Need technical support? Contact corporate care at{' '}
                        <a href="mailto:support@fitninja.co.uk" className="font-semibold text-emerald-400 underline hover:text-emerald-300">
                            support@fitninja.co.uk
                        </a>
                    </div>
                </main>

                <FooterWithLegal />
            </div>
        </>
    );
}
