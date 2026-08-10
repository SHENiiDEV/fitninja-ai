import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service — FitNinja AI Executive" />

            <div className="relative min-h-screen bg-[#070A11] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white">
                {/* Background Ambient Glows */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-600/10 blur-[140px]" />
                    <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-teal-600/10 blur-[140px]" />
                </div>

                <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8 border-b border-slate-800/80 backdrop-blur-xl">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            FitNinja <span className="text-emerald-400">AI</span>
                        </span>
                    </Link>

                    <Link href="/" className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </header>

                <main className="relative z-10 mx-auto max-w-4xl px-6 py-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
                        Terms & Governance
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Executive Terms of Service</h1>
                    <p className="mt-2 text-xs text-slate-400">Effective Date: August 10, 2026</p>

                    <div className="mt-10 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
                        {/* Prominent AI & Health Disclaimer */}
                        <section className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-8 space-y-4 backdrop-blur-xl shadow-2xl">
                            <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                                <span>⚠️</span> AI Precision & Health Disclaimer
                            </h2>
                            <p className="text-amber-200/90 leading-relaxed font-medium">
                                FitNinja AI is a high-level digital fitness & executive nutrition assistant powered by advanced neural models.
                                <strong> All nutritional calculations (kilocalories, protein, fats, carbohydrates), voice note transcriptions, and food photo recognitions are mathematical approximations and AI-generated estimates.</strong>
                            </p>
                            <p className="text-amber-200/90 leading-relaxed font-light">
                                While our neural algorithms strive for maximum precision, estimates may contain natural variances based on specific recipe preparation, cooking oils, brand formulations, or photo lighting. FitNinja AI does NOT guarantee 100% exact laboratory precision and is intended strictly for personal coaching, lifestyle awareness, and informational guidance. It does NOT constitute medical, clinical, or financial trading advice.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
                            <p>
                                By registering or using FitNinja AI via Telegram or our website dashboard, you agree to comply with and be bound by these Terms of Service.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">2. High-Level AI Coaching Tokens (€1.00 = 1 Token)</h2>
                            <p>
                                Executive AI token credit packages purchased on our website are priced at €1.00 per token (€1 = 1 interaction). Tokens are consumed at a rate of 1 token per text message log, voice note analysis, or food photo recognition. Tokens do not expire as long as your account remains active.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">3. Multi-Modal Processing (Text, Voice, Photo)</h2>
                            <p>
                                FitNinja AI supports text messages, audio voice notes, and meal photographs submitted in Telegram. By submitting voice or photo media, you grant us permission to process the media solely for generating your nutritional & workout performance analytics.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">4. High-Value Transactions (€500+ Core Tier) & Chargeback Policy</h2>
                            <p>
                                For high-ticket orders (€500 FOREX VIP Trader & €1,500 Institutional suites), all corporate card payments and SWIFT / IBAN wire transfers are final once AI credit tokens are credited. In accordance with digital software licensing regulations, consumed AI tokens are non-refundable. Fraudulent chargeback disputes will result in immediate service suspension and legal enforcement.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">5. Non-Financial Advice Disclaimer</h2>
                            <p>
                                FitNinja AI provides executive fitness, nutritional, and physical energy optimization software. It does NOT offer financial, FOREX trading, investment, or legal advice.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">6. Acceptable Use</h2>
                            <p>
                                You agree not to misuse our Telegram bot or website services, perform automated scraping, or attempt unauthorized access to our infrastructure.
                            </p>
                        </section>
                    </div>
                </main>

                <FooterWithLegal />
            </div>
        </>
    );
}
