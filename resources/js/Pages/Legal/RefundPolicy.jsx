import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <>
            <Head title="Refund Policy — FitNinja AI Executive" />

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
                        Billing & Guarantees
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">14-Day Refund Guarantee Policy</h1>
                    <p className="mt-2 text-xs text-slate-400">Effective Date: August 18, 2026</p>

                    <div className="mt-10 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">1. Token Purchase Refunds</h2>
                            <p>
                                We offer a 14-day money-back guarantee for unused AI token credit packs (€1.00 = 1 token) purchased via Corporate Credit Card or Direct Bank Transfer on our website.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">2. Refund Eligibility Conditions</h2>
                            <p>
                                If you have purchased an AI token pack and have not consumed any tokens from that specific order, you are eligible for a 100% full refund within 14 days of purchase.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">3. How to Request a Refund</h2>
                            <p>
                                To request a refund, please send your transaction reference code (`FN-XXXX`) and order details to billing@fitninja.co.uk. Refunds are processed within 3-5 business days back to your original payment account.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-3 backdrop-blur-xl shadow-xl">
                            <h2 className="text-xl font-bold text-white">4. Corporate Entity</h2>
                            <p>
                                Refunds are issued by <strong>CHANGE IT UP SERVICES LTD</strong> (Company Number: 16107295), registered office at 14 Broadway, Nottingham, United Kingdom, NG1 1PS.
                            </p>
                        </section>
                    </div>
                </main>

                <FooterWithLegal />
            </div>
        </>
    );
}
