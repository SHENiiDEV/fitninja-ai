import { Link } from '@inertiajs/react';

export default function FooterWithLegal() {
    return (
        <footer className="relative z-10 border-t border-slate-800/80 bg-[#070A11] py-16 text-sm text-slate-400 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-slate-800/60">
                    {/* Brand & Corporate Registered Information */}
                    <div className="md:col-span-5 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                FitNinja <span className="text-emerald-400">AI</span>
                            </span>
                        </Link>

                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
                            High-Performance Neural Fitness & Executive Nutrition Platform.
                        </p>

                        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3 text-[11px] text-slate-400 space-y-1">
                            <p className="font-semibold text-slate-200">CHANGE IT UP SERVICES LTD</p>
                            <p>Company Number: <span className="font-mono text-slate-300">16107295</span></p>
                            <p>Registered Office: 14 Broadway, Nottingham, United Kingdom, NG1 1PS</p>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                256-Bit Encrypted
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-300">
                                SWIFT / IBAN Verified
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Executive Platform</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home & Features</Link></li>
                            <li><Link href={route('billing.index')} className="hover:text-emerald-400 transition-colors">Executive Token Store (€500)</Link></li>
                            <li><Link href={route('dashboard')} className="hover:text-emerald-400 transition-colors">Web Analytics Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Legal Policies */}
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Governance</h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <Link href={route('legal.privacy')} className="hover:text-emerald-400 transition-colors">
                                    Privacy Policy & Media Encryption
                                </Link>
                            </li>
                            <li>
                                <Link href={route('legal.terms')} className="hover:text-emerald-400 transition-colors">
                                    Terms of Service & Chargeback Terms
                                </Link>
                            </li>
                            <li>
                                <Link href={route('legal.refund')} className="hover:text-emerald-400 transition-colors">
                                    14-Day Refund Guarantee Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} CHANGE IT UP SERVICES LTD (Company No. 16107295). All rights reserved.</p>
                    <p className="text-[11px] text-slate-600">Strictly for Personal Fitness Coaching • Non-Financial Advice</p>
                </div>
            </div>
        </footer>
    );
}
