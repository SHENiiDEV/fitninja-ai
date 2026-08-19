import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import ApplicationLogo from '@/Components/ApplicationLogo';
import FloatingCurrencyPicker from '@/Components/FloatingCurrencyPicker';
import LiveDemoSimulator from '@/Components/Landing/LiveDemoSimulator';
import { useCurrency } from '@/Contexts/CurrencyContext';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [faqOpen, setFaqOpen] = useState(null);
    const { formatPrice, currency } = useCurrency();

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    return (
        <>
            <Head title="FitNinja AI — Autonomous AI Fitness & Nutrition Coach" />

            <div className="relative min-h-screen bg-[#090D16] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white">
                {/* Ambient Background Glows */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[160px]" />
                <div className="pointer-events-none absolute right-0 top-1/4 h-[700px] w-[700px] rounded-full bg-teal-500/10 blur-[180px]" />
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

                    <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-400">
                        <a href="#demo" className="cursor-pointer transition-colors hover:text-emerald-400">Live AI Demo</a>
                        <a href="#features" className="cursor-pointer transition-colors hover:text-emerald-400">Features</a>
                        <a href="#how-it-works" className="cursor-pointer transition-colors hover:text-emerald-400">How It Works</a>
                        <a href="#pricing" className="cursor-pointer transition-colors hover:text-emerald-400">Pricing</a>
                        <a href="#faq" className="cursor-pointer transition-colors hover:text-emerald-400">FAQ</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <FloatingCurrencyPicker />
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
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
                                    className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:shadow-emerald-500/40"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-20 text-center lg:px-8 lg:pt-20">
                    <div className="mx-auto max-w-4xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-emerald-400 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            Next-Gen Neural Nutrition Engine
                        </div>

                        <h1 className="mt-8 text-5xl font-black tracking-tight text-white sm:text-7xl sm:leading-[1.1]">
                            Your Autonomous <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI Fitness Coach</span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-slate-400 sm:text-xl max-w-2xl mx-auto font-light">
                            Log meals and workouts naturally in Telegram. Get instant neural calorie & macro breakdowns (Protein 🥩, Fats 🥑, Carbs 🍞) and track your transformation.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="cursor-pointer flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 hover:shadow-emerald-500/50"
                            >
                                Get Started Free →
                            </Link>
                            <Link
                                href={auth?.user ? route('dashboard') : route('login')}
                                className="cursor-pointer flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-8 py-4 text-base font-bold text-slate-200 backdrop-blur-xl transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                            >
                                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Launch Web Dashboard
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Interactive Live AI Simulator Component */}
                <LiveDemoSimulator />

                {/* Stats Counter Banner */}
                <section className="relative z-10 border-y border-slate-800/80 bg-slate-950/60 py-10 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
                            <div>
                                <p className="text-4xl font-black text-emerald-400">99.4%</p>
                                <p className="mt-1 text-sm font-medium text-slate-400">Calorie & Macro Accuracy</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-teal-300">&lt; 1.2s</p>
                                <p className="mt-1 text-sm font-medium text-slate-400">Neural Response Time</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-cyan-400">24 / 7</p>
                                <p className="mt-1 text-sm font-medium text-slate-400">Continuous AI Coaching</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                            Everything You Need for Effortless Nutrition
                        </h2>
                        <p className="mt-4 text-slate-400">
                            Eliminate manual searching and clunky database lookups. Simply talk to your AI.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-emerald-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">Natural Language & Voice</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Send text or voice notes in Telegram. The AI extracts exact portions, calories, and macros (Protein, Fats, Carbs).
                            </p>
                        </div>

                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-teal-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">Workout Energy Burn</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Mention your workouts like "Ran 5km in 25 mins". FitNinja automatically deducts burned calories from your daily balance.
                            </p>
                        </div>

                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-cyan-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">14-Day Macro Trend</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Visualize your energy intake vs targets with interactive Recharts graphics and macro bars on your web dashboard.
                            </p>
                        </div>

                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-purple-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">BMR & TDEE Calculator</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Auto-calculate target weight, calorie ceiling, and macro ratios using the Mifflin-St Jeor equation.
                            </p>
                        </div>

                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-amber-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">Private & Encrypted</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Your fitness logs and biometric data are securely encrypted and accessible only by you.
                            </p>
                        </div>

                        <div className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-all hover:border-rose-500/40 hover:bg-slate-900/80">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-bold text-white">Telegram Deep Linking</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                Connect your web profile to Telegram in 1 click with deep linking (`/start connect_XXXX`).
                            </p>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="relative z-10 border-t border-slate-800/80 bg-slate-950/40 py-24 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">How FitNinja AI Works</h2>
                            <p className="mt-4 text-slate-400">Three simple steps to transform your nutrition workflow.</p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl font-black text-emerald-400">1</div>
                                <h3 className="mt-6 text-xl font-bold text-white">Message the Bot</h3>
                                <p className="mt-2 text-sm text-slate-400">Send a quick message or voice note in Telegram whenever you eat or exercise.</p>
                            </div>

                            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/20 text-2xl font-black text-teal-400">2</div>
                                <h3 className="mt-6 text-xl font-bold text-white">AI Analyzes Content</h3>
                                <p className="mt-2 text-sm text-slate-400">Our neural engine breaks down ingredients, estimates calories, and updates your daily totals.</p>
                            </div>

                            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-2xl font-black text-cyan-400">3</div>
                                <h3 className="mt-6 text-xl font-bold text-white">Review Web Insights</h3>
                                <p className="mt-2 text-sm text-slate-400">Open your web dashboard to inspect 14-day energy trends, streaks, and target achievements.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Pay As You Go Tokens */}
                <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">High-Performance AI Coaching Suites</h2>
                        <p className="mt-4 text-slate-400">High-Ticket Neural Nutrition & Fitness Coaching for Executives & Athletes (€1.00 = 1 AI Token).</p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                        {/* Fitness Foundations */}
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Foundations</span>
                                <h3 className="mt-2 text-2xl font-bold text-white">100 Tokens</h3>
                                <p className="mt-1 text-4xl font-extrabold text-white">{formatPrice(100)}</p>
                                <p className="mt-1 text-xs text-slate-400">{formatPrice(1)} per AI interaction</p>
                                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">✓ 100 High-Performance AI Interactions</li>
                                    <li className="flex items-center gap-2">✓ Text, Voice & Photo Food Recognition</li>
                                    <li className="flex items-center gap-2">✓ Full 14-Day Web Dashboard</li>
                                </ul>
                            </div>
                            <Link
                                href={route('login')}
                                className="cursor-pointer mt-8 block rounded-2xl border border-slate-700 bg-slate-800 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-slate-700"
                            >
                                Order {formatPrice(100)} Pack
                            </Link>
                        </div>

                        {/* Pro Transformation Suite */}
                        <div className="relative rounded-3xl border-2 border-emerald-500 bg-gradient-to-b from-slate-900 to-slate-950 p-8 flex flex-col justify-between shadow-2xl shadow-emerald-500/10">
                            <span className="absolute -top-3 right-8 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-extrabold uppercase text-slate-950">Most Popular (Core Tier)</span>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pro Transformation</span>
                                <h3 className="mt-2 text-2xl font-bold text-white">500 Tokens</h3>
                                <p className="mt-1 text-4xl font-extrabold text-white">{formatPrice(500)}</p>
                                <p className="mt-1 text-xs text-emerald-400">{formatPrice(1)} per AI interaction</p>
                                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                                    <li className="flex items-center gap-2 text-emerald-400">✓ 500 High-Performance AI Interactions</li>
                                    <li className="flex items-center gap-2 text-emerald-400">✓ VIP Priority Neural Engine Access</li>
                                    <li className="flex items-center gap-2 text-emerald-400">✓ Card & SWIFT Bank Wire Authorization</li>
                                </ul>
                            </div>
                            <Link
                                href={route('login')}
                                className="cursor-pointer mt-8 block rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105"
                            >
                                Order {formatPrice(500)} Pro Suite
                            </Link>
                        </div>

                        {/* Elite Athlete Performance */}
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Elite Performance</span>
                                <h3 className="mt-2 text-2xl font-bold text-white">1,500 Tokens</h3>
                                <p className="mt-1 text-4xl font-extrabold text-white">{formatPrice(1500)}</p>
                                <p className="mt-1 text-xs text-slate-400">{formatPrice(1)} per AI interaction</p>
                                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-2">✓ 1,500 High-Performance AI Interactions</li>
                                    <li className="flex items-center gap-2">✓ Unlimited Dashboard Analytics</li>
                                    <li className="flex items-center gap-2">✓ Dedicated Account Manager & Priority Line</li>
                                </ul>
                            </div>
                            <Link
                                href={route('login')}
                                className="cursor-pointer mt-8 block rounded-2xl border border-slate-700 bg-slate-800 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-slate-700"
                            >
                                Order {formatPrice(1500)} Elite Pack
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq" className="relative z-10 border-t border-slate-800/80 bg-slate-950/40 py-24 backdrop-blur-md">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
                        </div>

                        <div className="mt-12 space-y-4">
                            {[
                                {
                                    q: 'How does FitNinja calculate calories & macro nutrients from text?',
                                    a: 'FitNinja utilizes a proprietary neural AI engine trained on extensive nutritional databases. It parses ingredients, cooking methods, and portion sizes to calculate kilocalories, protein, fats, and carbohydrates automatically.'
                                },
                                {
                                    q: 'Can I track workouts and burned energy?',
                                    a: 'Yes! Simply message your workout details (e.g. "30 mins cycling" or "5km run"). The AI estimates calories burned and deducts them from your daily intake.'
                                },
                                {
                                    q: 'How do I top up AI tokens?',
                                    a: 'You can purchase token packs (£1 = 20 Tokens) via Debit/Credit Card or Direct Bank Transfer (IBAN/SWIFT) directly on the website billing page.'
                                },
                            ].map((faq, idx) => (
                                <div key={idx} className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="cursor-pointer flex w-full items-center justify-between p-6 text-left font-bold text-white transition-colors hover:text-emerald-400"
                                    >
                                        <span>{faq.q}</span>
                                        <span className="text-xl">{faqOpen === idx ? '−' : '+'}</span>
                                    </button>
                                    {faqOpen === idx && (
                                        <div className="px-6 pb-6 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer with Legal Pages Links */}
                <FooterWithLegal />
            </div>
        </>
    );
}
