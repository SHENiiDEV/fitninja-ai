import ApplicationLogo from '@/Components/ApplicationLogo';
import FloatingCurrencyPicker from '@/Components/FloatingCurrencyPicker';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function HowItWorks({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="How It Works — FitNinja AI Neural Telemetry" />

            <div className="relative min-h-screen bg-[#070A11] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[180px]" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[180px]" />

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

                    <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-400">
                        <Link href="/" className="cursor-pointer transition-colors hover:text-emerald-400">Home</Link>
                        <Link href="/how-it-works" className="cursor-pointer text-white font-semibold transition-colors">How It Works</Link>
                        <Link href="/about-us" className="cursor-pointer transition-colors hover:text-emerald-400">About Us</Link>
                        <Link href="/contact" className="cursor-pointer transition-colors hover:text-emerald-400">Contact</Link>
                        <Link href="/support" className="cursor-pointer transition-colors hover:text-emerald-400">Support</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <FloatingCurrencyPicker />
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                            >
                                Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-white">
                                    Log In
                                </Link>
                                <Link href={route('register')} className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <FloatingCurrencyPicker />
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 text-slate-300 hover:text-white"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Hero Header Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-16 text-center lg:px-8 lg:pt-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">
                        <span>⚡ Autonomous Multimodal Workflow</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                        How FitNinja AI Powers Your <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            Executive Nutrition Telemetry
                        </span>
                    </h1>

                    <p className="mt-6 mx-auto max-w-3xl text-lg text-slate-400 leading-relaxed font-light">
                        Discover how our zero-shot computer vision, voice note natural language processing, and real-time metabolic algorithms track your nutrition without disrupting your workflow.
                    </p>
                </section>

                {/* Step-by-Step Interactive Workflow */}
                <section className="relative z-10 mx-auto max-w-5xl px-6 py-12 lg:px-8 space-y-12">

                    {/* Step 1 */}
                    <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/90 p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-3 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/20 text-emerald-400 font-black text-3xl border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
                                01
                            </div>
                        </div>
                        <div className="md:col-span-9 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 1 — Instant Provisioning</span>
                            <h3 className="text-2xl font-bold text-white">Register & Receive 10 Free AI Credits</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Sign up in under 60 seconds. Your profile is automatically calibrated with 10 Welcome AI Tokens, allowing you to test photo meal recognition and Telegram voice logging immediately.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/90 p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-3 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-500/20 text-teal-400 font-black text-3xl border border-teal-500/40 shadow-xl shadow-teal-500/10">
                                02
                            </div>
                        </div>
                        <div className="md:col-span-9 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Step 2 — Computer Vision Analysis</span>
                            <h3 className="text-2xl font-bold text-white">Snap & Upload Food Photos</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Take a photo of your lunch or dinner plate. Our multimodal AI breaks down ingredients, estimates protein, carb, fat content, and logs total calories into your daily feed in under 1.2 seconds.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/90 p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-3 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/20 text-cyan-400 font-black text-3xl border border-cyan-500/40 shadow-xl shadow-cyan-500/10">
                                03
                            </div>
                        </div>
                        <div className="md:col-span-9 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Step 3 — Hands-Free Telemetry</span>
                            <h3 className="text-2xl font-bold text-white">Send Telegram Voice Notes</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                Connect your Telegram account and send audio voice messages (*"Had 200g grilled salmon and steamed broccoli for dinner"*). The AI transcribes spoken audio into verified macro logs instantly.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="rounded-3xl border border-slate-800/90 bg-[#090d16]/90 p-8 shadow-2xl backdrop-blur-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-3 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/20 text-indigo-400 font-black text-3xl border border-indigo-500/40 shadow-xl shadow-indigo-500/10">
                                04
                            </div>
                        </div>
                        <div className="md:col-span-9 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step 4 — Metabolic Dashboards & B2B Invoices</span>
                            <h3 className="text-2xl font-bold text-white">Monitor BMR/TDEE & Download Tax Receipts</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-light">
                                View your 14-day macro analytics on the web dashboard. Need more AI credits? Top up via card or bank wire and instantly download official UK B2B PDF tax receipts.
                            </p>
                        </div>
                    </div>

                </section>

                <FooterWithLegal />
            </div>
        </>
    );
}
