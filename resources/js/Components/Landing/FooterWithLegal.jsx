import { Link } from '@inertiajs/react';

export default function FooterWithLegal() {
    return (
        <footer className="relative z-10 border-t border-slate-900 bg-slate-950 py-12 text-sm text-slate-500">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="font-bold text-white">FitNinja AI</span>
                        <span>• © {new Date().getFullYear()} All rights reserved.</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-400">
                        <a href="#features" className="cursor-pointer hover:text-white transition-colors">Features</a>
                        <a href="#pricing" className="cursor-pointer hover:text-white transition-colors">Pricing</a>
                        <a href="#faq" className="cursor-pointer hover:text-white transition-colors">FAQ</a>
                        <span className="text-slate-800">|</span>
                        <Link href={route('legal.privacy')} className="cursor-pointer font-semibold text-slate-300 hover:text-emerald-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href={route('legal.terms')} className="cursor-pointer font-semibold text-slate-300 hover:text-emerald-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href={route('legal.refund')} className="cursor-pointer font-semibold text-slate-300 hover:text-emerald-400 transition-colors">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
