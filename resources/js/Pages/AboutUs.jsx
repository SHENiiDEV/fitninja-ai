import ApplicationLogo from '@/Components/ApplicationLogo';
import FloatingCurrencyPicker from '@/Components/FloatingCurrencyPicker';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AboutUs({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="About Us — FitNinja AI Executive Health" />

            <div className="relative min-h-screen bg-[#070A11] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white overflow-hidden">
                {/* Ambient Background Glows */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[180px]" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[180px]" />
                <div className="pointer-events-none absolute left-1/3 bottom-10 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[160px]" />

                {/* Grid Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Navigation Header */}
                <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-11 w-11" />
                        <span className="text-2xl font-black tracking-tight text-white">
                            FitNinja <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-400">
                        <Link href="/" className="cursor-pointer transition-colors hover:text-emerald-400">Home</Link>
                        <Link href="/about-us" className="cursor-pointer text-white font-semibold transition-colors">About Us</Link>
                        <a href="/#features" className="cursor-pointer transition-colors hover:text-emerald-400">Features</a>
                        <a href="/#pricing" className="cursor-pointer transition-colors hover:text-emerald-400">Pricing</a>
                        <a href="/#faq" className="cursor-pointer transition-colors hover:text-emerald-400">FAQ</a>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <FloatingCurrencyPicker />
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                            >
                                Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="cursor-pointer text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <FloatingCurrencyPicker />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 text-slate-300 hover:text-white"
                            aria-label="Open Mobile Menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Mobile Right Slide-out Drawer */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-[#090d16]/95 border-l border-slate-800 p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                                    <div className="flex items-center gap-2.5">
                                        <ApplicationLogo className="h-9 w-9" />
                                        <span className="text-lg font-black tracking-tight text-white">
                                            FitNinja <span className="text-emerald-400">AI</span>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="mt-6 flex flex-col gap-4 text-sm font-semibold">
                                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 border border-slate-800/60 bg-slate-950/40 text-slate-200">
                                        🏠 Home Page
                                    </Link>
                                    <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold">
                                        ⚡ About Us
                                    </Link>
                                    <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 border border-slate-800/60 bg-slate-950/40 text-slate-200">
                                        💎 Pricing & Tokens
                                    </a>
                                </nav>
                            </div>
                            <div className="pt-6 border-t border-slate-800/80 space-y-3">
                                <Link href={route('register')} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer block w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-center text-sm font-bold text-white shadow-lg">
                                    Get Started Free
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hero Header Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16 text-center lg:px-8 lg:pt-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
                        <span>⚡ Autonomous Neural Coaching & Executive Health</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Pioneering High-Performance <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            Neural Nutrition & Executive AI
                        </span>
                    </h1>

                    <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-400 leading-relaxed font-light">
                        FitNinja AI was built on a simple premise: high-performing executives, athletes, and leaders shouldn't lose focus to tedious manual calorie logging or complex nutrition spreadsheets. We replace manual friction with zero-latency multimodal neural intelligence.
                    </p>
                </section>

                {/* Live Stats Counter Grid */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
                        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-xl">
                            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">99.4%</div>
                            <div className="mt-2 text-xs font-bold text-slate-300 uppercase tracking-wider">Photo Meal Accuracy</div>
                            <div className="mt-1 text-[11px] text-slate-500">Zero-shot Computer Vision</div>
                        </div>

                        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-xl">
                            <div className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">&lt; 1.2s</div>
                            <div className="mt-2 text-xs font-bold text-slate-300 uppercase tracking-wider">Neural Latency</div>
                            <div className="mt-1 text-[11px] text-slate-500">Instant Telemetry Response</div>
                        </div>

                        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-xl">
                            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">24/7</div>
                            <div className="mt-2 text-xs font-bold text-slate-300 uppercase tracking-wider">Telegram AI Sync</div>
                            <div className="mt-1 text-[11px] text-slate-500">Voice Note & Text Recognition</div>
                        </div>

                        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-xl">
                            <div className="text-3xl sm:text-4xl font-black text-white font-mono">Co. 16107295</div>
                            <div className="mt-2 text-xs font-bold text-slate-300 uppercase tracking-wider">UK Regulated</div>
                            <div className="mt-1 text-[11px] text-slate-500">CHANGE IT UP SERVICES LTD</div>
                        </div>
                    </div>
                </section>

                {/* Core Pillars / Mission Grid */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Core Neural Pillars</h2>
                        <p className="mt-4 text-slate-400">Engineered to optimize metabolic performance, cognitive clarity, and physical recovery for leaders worldwide.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Pillar 1 */}
                        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-xl hover:border-emerald-500/40 transition-all">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold text-2xl border border-emerald-500/30 mb-6">
                                📸
                            </div>
                            <h3 className="text-xl font-bold text-white">Multimodal Neural Vision</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
                                Point your camera at any meal, dish, or restaurant plate. Our deep neural engine parses ingredient volumes, macro density (proteins, fats, carbs), and total calories in real-time.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-xl hover:border-teal-500/40 transition-all">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 font-bold text-2xl border border-teal-500/30 mb-6">
                                🎤
                            </div>
                            <h3 className="text-xl font-bold text-white">Voice Telemetry Engine</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
                                Speak naturally into your phone via Telegram voice notes (*"Double espresso, 3 scrambled eggs, avocado toast"*). Natural language understanding transcribes and logs macro data hands-free.
                            </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-xl hover:border-cyan-500/40 transition-all">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 font-bold text-2xl border border-cyan-500/30 mb-6">
                                📈
                            </div>
                            <h3 className="text-xl font-bold text-white">Metabolic Ceiling Analytics</h3>
                            <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
                                Continuous evaluation of your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Receive proactive notifications when approaching daily macro thresholds.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Corporate Governance & Company Entity Section */}
                <section className="relative z-10 mx-auto max-w-5xl px-6 py-12 lg:px-8">
                    <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/90 p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Corporate Governance</span>
                                <h3 className="mt-1 text-2xl font-black text-white">CHANGE IT UP SERVICES LTD</h3>
                                <p className="text-xs text-slate-400">Merchant of Record & Official Operator of FitNinja AI</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-400">
                                    UK Registered Co. #16107295
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                            <div className="space-y-4 text-xs text-slate-300">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Registered Corporate Address</h4>
                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 leading-relaxed font-mono">
                                    CHANGE IT UP SERVICES LTD<br />
                                    14 Broadway<br />
                                    Nottingham, United Kingdom<br />
                                    NG1 1PS
                                </div>
                            </div>

                            <div className="space-y-4 text-xs text-slate-300">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Compliance & Legal Standards</h4>
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-400">✓</span> 256-Bit Encrypted Data Telemetry & Privacy
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-400">✓</span> UK B2B Tax Receipts & Reverse Charge Invoicing
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-400">✓</span> 14-Day Money-Back Guarantee on Credit Packages
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-emerald-400">✓</span> Direct Executive Support: <code className="text-emerald-300">support@fitninja.co.uk</code>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call To Action Banner */}
                <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 p-10 md:p-14 shadow-2xl backdrop-blur-xl">
                        <h2 className="text-3xl font-black text-white sm:text-4xl">
                            Ready to Upgrade Your Executive Health Routine?
                        </h2>
                        <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm leading-relaxed font-light">
                            Join high-performing executives and athletes. Get 10 Free Welcome AI Credits upon registration today.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
                            >
                                Get Started Free →
                            </Link>
                            <Link
                                href={route('login')}
                                className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-900 px-8 py-4 text-sm font-bold text-slate-200 hover:text-white"
                            >
                                Sign In / Log In
                            </Link>
                        </div>
                    </div>
                </section>

                <FooterWithLegal />
            </div>
        </>
    );
}
