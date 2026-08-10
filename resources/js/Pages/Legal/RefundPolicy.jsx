import { Head, Link } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <>
            <Head title="Refund Policy — FitNinja AI" />

            <div className="relative min-h-screen bg-[#090D16] font-sans text-slate-100 selection:bg-emerald-500 selection:text-white">
                <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8 border-b border-slate-800/80">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg">
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black tracking-tight text-white">
                            FitNinja <span className="text-emerald-400">AI</span>
                        </span>
                    </Link>

                    <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white">
                        ← Back to Home
                    </Link>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <h1 className="text-4xl font-extrabold text-white">Refund Policy</h1>
                    <p className="mt-2 text-xs text-slate-400">Last updated: August 6, 2026</p>

                    <div className="mt-8 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                            <h2 className="text-lg font-bold text-white">1. Token Purchase Refunds</h2>
                            <p>
                                We offer a 14-day money-back guarantee for unused AI token packs purchased via Credit/Debit Card or Bank Transfer on our website.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                            <h2 className="text-lg font-bold text-white">2. Refund Conditions</h2>
                            <p>
                                If you have purchased a token pack and have not consumed any tokens from that pack, you are eligible for a 100% full refund within 14 days of purchase.
                            </p>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
                            <h2 className="text-lg font-bold text-white">3. How to Request a Refund</h2>
                            <p>
                                To request a refund, please send your transaction reference code (`FN-XXXX`) and order details to billing@fitninja.co.uk. Refunds are processed within 3-5 business days.
                            </p>
                        </section>
                    </div>
                </main>

                <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} FitNinja AI. All rights reserved.
                </footer>
            </div>
        </>
    );
}
