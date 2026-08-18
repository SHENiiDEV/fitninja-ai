import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col justify-between bg-[#070A11] text-slate-100 selection:bg-emerald-500 selection:text-white">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-20 -top-20 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[150px]" />
                <div className="absolute -right-20 -bottom-20 h-[450px] w-[450px] rounded-full bg-teal-500/10 blur-[150px]" />
            </div>

            {/* Grid Overlay */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:3rem_3rem]" />

            <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6">
                <div className="mb-6 flex flex-col items-center text-center">
                    <Link href="/" className="group cursor-pointer flex items-center gap-3 transition-transform hover:scale-105">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-xl shadow-emerald-500/25 ring-1 ring-white/20">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            FitNinja <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">AI</span>
                        </span>
                    </Link>
                </div>

                <div className="w-full max-w-xl md:max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
                    {children}
                </div>
            </div>

            <FooterWithLegal />
        </div>
    );
}
