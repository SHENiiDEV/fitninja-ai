import ApplicationLogo from '@/Components/ApplicationLogo';
import FloatingCurrencyPicker from '@/Components/FloatingCurrencyPicker';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Support({ auth, supportEmail }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            q: 'How does FitNinja AI process food photos and voice notes?',
            a: 'Our zero-shot computer vision neural model scans your meal photos to recognize food volume and ingredients. Voice notes sent via Telegram are transcribed and converted into verified macronutrient data in under 1.2 seconds.',
        },
        {
            q: 'What is the value of 1 AI Token?',
            a: '1 AI Token equals 1 high-performance interaction (either 1 food photo macro scan, 1 Telegram voice note transcription, or 1 AI coaching prompt). Tokens are priced at €1.00 per token.',
        },
        {
            q: 'How do I download official B2B PDF Tax Invoices?',
            a: 'Navigating to the Tokens & Billing Store (/billing) shows your full transaction history. Next to each transaction, click the "Invoice (PDF)" button to download an official UK tax receipt issued by CHANGE IT UP SERVICES LTD (Co. No. 16107295).',
        },
        {
            q: 'What is your refund policy on unused token packages?',
            a: 'In accordance with UK consumer regulations, unconsumed AI token packages are protected by a 14-day money-back guarantee. If you are unsatisfied, contact support@fitninja.co.uk for a full refund.',
        },
        {
            q: 'How do I connect my Telegram account for voice notes?',
            a: 'Log into your web dashboard and copy your unique 6-digit Telegram linking code. Send this code to @FitNinjaAIBot to activate 24/7 audio telemetry.',
        },
    ];

    return (
        <>
            <Head title="Support & Help Desk — FitNinja AI" />

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
                        <Link href="/about-us" className="cursor-pointer transition-colors hover:text-emerald-400">About Us</Link>
                        <Link href="/how-it-works" className="cursor-pointer transition-colors hover:text-emerald-400">How It Works</Link>
                        <Link href="/contact" className="cursor-pointer transition-colors hover:text-emerald-400">Contact</Link>
                        <Link href="/support" className="cursor-pointer text-white font-semibold transition-colors">Support</Link>
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
                <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-12 text-center lg:px-8 lg:pt-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">
                        <span>❓ Executive Help Desk & Knowledge Base</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                        FitNinja AI <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Support Desk</span>
                    </h1>

                    <p className="mt-4 mx-auto max-w-2xl text-base text-slate-400 font-light">
                        Find answers to common questions about token credits, B2B tax receipts, and Telegram voice telemetry, or transmit a ticket to our executive support team.
                    </p>
                </section>

                {/* Support Channels Grid */}
                <section className="relative z-10 mx-auto max-w-6xl px-6 py-8 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-3xl border border-slate-800 bg-[#090d16]/90 p-6 text-center shadow-xl backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold text-2xl mx-auto mb-4">
                                ✉️
                            </div>
                            <h3 className="text-lg font-bold text-white">Executive Email</h3>
                            <p className="mt-2 text-xs text-slate-400 font-light">Direct support for billing & account inquiries within 24–48 hours (SLA Guarantee).</p>
                            <a href={`mailto:${supportEmail}`} className="mt-4 inline-block font-mono text-xs text-emerald-400 font-bold hover:underline">
                                {supportEmail}
                            </a>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-[#090d16]/90 p-6 text-center shadow-xl backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-400 font-bold text-2xl mx-auto mb-4">
                                📄
                            </div>
                            <h3 className="text-lg font-bold text-white">Tax Invoices</h3>
                            <p className="mt-2 text-xs text-slate-400 font-light">Download UK VAT & Reverse Charge PDF receipts from your profile.</p>
                            <Link href={route('billing.index')} className="mt-4 inline-block text-xs text-teal-400 font-bold hover:underline">
                                Launch Billing Store →
                            </Link>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-[#090d16]/90 p-6 text-center shadow-xl backdrop-blur-xl">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 font-bold text-2xl mx-auto mb-4">
                                💬
                            </div>
                            <h3 className="text-lg font-bold text-white">Telegram Sync</h3>
                            <p className="mt-2 text-xs text-slate-400 font-light">Link your 6-digit telemetry code for 24/7 audio voice note logging.</p>
                            <Link href={route('dashboard')} className="mt-4 inline-block text-xs text-cyan-400 font-bold hover:underline">
                                Link Telegram Code →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ Accordion Section */}
                <section className="relative z-10 mx-auto max-w-4xl px-6 py-12 lg:px-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-slate-800 bg-[#090d16]/90 overflow-hidden shadow-lg backdrop-blur-xl transition-all"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="cursor-pointer flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-emerald-400"
                                >
                                    <span>{faq.q}</span>
                                    <span className="ml-4 text-emerald-400 text-lg font-mono">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 font-light">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href={route('contact')}
                            className="cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all inline-block"
                        >
                            Need Further Assistance? Open Contact Ticket →
                        </Link>
                    </div>
                </section>

                <FooterWithLegal />
            </div>
        </>
    );
}
