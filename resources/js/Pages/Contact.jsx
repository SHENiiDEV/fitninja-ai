import ApplicationLogo from '@/Components/ApplicationLogo';
import FloatingCurrencyPicker from '@/Components/FloatingCurrencyPicker';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Contact({ auth, companyName, companyNumber, companyAddress, supportEmail, status }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact Us — Executive Support & Company Details" />

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
                        <Link href="/contact" className="cursor-pointer text-white font-semibold transition-colors">Contact</Link>
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
                <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-12 text-center lg:px-8 lg:pt-16">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">
                        <span>✉️ Executive Corporate Desk & Support</span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                        Contact FitNinja <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">AI</span>
                    </h1>

                    <p className="mt-4 mx-auto max-w-2xl text-base text-slate-400 font-light">
                        Have a question regarding corporate billing, B2B token suites, or technical setup? Reach out directly to our UK corporate desk below.
                    </p>
                </section>

                {/* Main Content Grid: Corporate Info + Contact Form */}
                <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
                    {status === 'message-sent' && (
                        <div className="mb-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center text-sm font-semibold text-emerald-400 shadow-xl backdrop-blur-xl animate-fade-in">
                            🎉 Thank you! Your message has been transmitted to <span className="underline font-mono">{supportEmail}</span>. Our executive desk will reply within 24 hours.
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Corporate Details Card */}
                        <div className="lg:col-span-5 rounded-3xl border border-slate-800/90 bg-[#090d16]/95 p-8 shadow-2xl backdrop-blur-2xl space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Merchant of Record</span>
                                <h3 className="text-2xl font-black text-white mt-1">{companyName}</h3>
                                <p className="text-xs text-slate-400 mt-1">UK Registered Entity Co. #{companyNumber}</p>
                            </div>

                            <div className="space-y-4 text-xs text-slate-300 pt-4 border-t border-slate-800/80">
                                <div>
                                    <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">Corporate Head Office:</span>
                                    <p className="font-mono text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        {companyAddress}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">Executive Support Email:</span>
                                    <a
                                        href={`mailto:${supportEmail}`}
                                        className="font-semibold text-emerald-400 hover:text-emerald-300 underline font-mono text-sm"
                                    >
                                        {supportEmail}
                                    </a>
                                </div>

                                <div>
                                    <span className="text-slate-500 font-semibold uppercase tracking-wider block mb-1">Response Guarantee:</span>
                                    <p className="text-slate-400">Under 24 hours for all token & billing inquiries.</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Contact Form */}
                        <div className="lg:col-span-7 rounded-3xl border border-slate-800/90 bg-[#090d16]/95 p-8 shadow-2xl backdrop-blur-2xl">
                            <h3 className="text-xl font-bold text-white mb-6">Send an Executive Inquiry</h3>

                            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                                <div>
                                    <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">Your Full Name:</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. Alexander Vance"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    {errors.name && <span className="text-rose-400 text-[11px] mt-1">{errors.name}</span>}
                                </div>

                                <div>
                                    <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">Your Email Address:</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="alexander@company.com"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    {errors.email && <span className="text-rose-400 text-[11px] mt-1">{errors.email}</span>}
                                </div>

                                <div>
                                    <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">Inquiry Subject:</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="e.g. B2B Corporate Token Order / Tax Invoice Request"
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    {errors.subject && <span className="text-rose-400 text-[11px] mt-1">{errors.subject}</span>}
                                </div>

                                <div>
                                    <label className="block text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">Detailed Message:</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Please provide details regarding your inquiry..."
                                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                    {errors.message && <span className="text-rose-400 text-[11px] mt-1">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Transmitting Ticket...' : 'Transmit Inquiry to Executive Support →'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <FooterWithLegal />
            </div>
        </>
    );
}
