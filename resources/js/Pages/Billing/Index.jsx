import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Billing({ tokens, ratePerToken = 1.00, presetPackages, bankDetails, status }) {
    const [customTokens, setCustomTokens] = useState(30); // default 30 tokens (€30)
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'bank'
    const [copiedField, setCopiedField] = useState(null);

    const { data: cardFormData, setData: setCardFormData, post: postCard, processing: cardProcessing } = useForm({
        tokens_amount: 30,
    });

    const { post: postBankTransfer, processing: bankProcessing } = useForm({
        reference: bankDetails.referenceCode,
    });

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleTokensChange = (val) => {
        const num = Math.max(1, parseInt(val) || 0);
        setCustomTokens(num);
        setCardFormData('tokens_amount', num);
    };

    const handleSelectPreset = (amount) => {
        setCustomTokens(amount);
        setCardFormData('tokens_amount', amount);
    };

    const totalPrice = (customTokens * ratePerToken).toFixed(2);

    const handleCardSubmit = (e) => {
        e.preventDefault();
        postCard(route('billing.card'));
    };

    const handleBankSubmit = (e) => {
        e.preventDefault();
        postBankTransfer(route('billing.bank'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                        Elite AI Token Store
                    </h2>
                    <p className="text-xs text-slate-400">High-Performance AI Coaching Tokens (€1.00 = 1 Token / 1 Interaction)</p>
                </div>
            }
        >
            <Head title="Tokens & Billing — FitNinja AI" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {status === 'tokens-purchased' && (
                        <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm font-semibold text-emerald-400">
                            🎉 Payment successful! {customTokens} AI coaching tokens added to your balance.
                        </div>
                    )}

                    {status === 'bank-transfer-submitted' && (
                        <div className="mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-sm font-semibold text-amber-400">
                            ⏳ Bank transfer notification received. Tokens will be credited upon funds verification.
                        </div>
                    )}

                    {/* Current Token Balance Header */}
                    <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-8 text-white shadow-2xl border border-white/10">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                    Available AI Balance
                                </span>
                                <h3 className="mt-2 text-4xl font-black tracking-tight">
                                    {tokens} <span className="text-2xl font-normal text-emerald-100">AI Tokens</span>
                                </h3>
                                <p className="mt-1 text-xs text-emerald-100/90 font-medium">
                                    1 Token = 1 Message (Text log, Voice message, or Photo food analysis)
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Custom Token Calculator */}
                    <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-white mb-2">1. Select AI Token Package</h3>
                        <p className="text-xs text-slate-400 mb-6">Rate: €1.00 per Token (€1 = 1 Interaction)</p>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
                            {/* Token Input Field */}
                            <div className="lg:col-span-7 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                        Custom Token Quantity:
                                    </label>
                                    <div className="relative flex items-center">
                                        <input
                                            type="number"
                                            min="5"
                                            max="50000"
                                            step="1"
                                            value={customTokens}
                                            onChange={(e) => handleTokensChange(e.target.value)}
                                            className="w-full rounded-2xl border-2 border-emerald-500/60 bg-slate-950 px-5 py-4 text-2xl font-black text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                                        />
                                        <span className="absolute right-5 text-sm font-bold text-slate-400 uppercase tracking-wider">
                                            Tokens
                                        </span>
                                    </div>
                                </div>

                                {/* Presets Shortcuts */}
                                <div>
                                    <span className="text-xs text-slate-400 block mb-2 font-medium">Popular Coaching Packs:</span>
                                    <div className="flex flex-wrap gap-3">
                                        {presetPackages.map((pkg) => (
                                            <button
                                                key={pkg.tokens}
                                                type="button"
                                                onClick={() => handleSelectPreset(pkg.tokens)}
                                                className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                                                    customTokens === pkg.tokens
                                                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-md'
                                                        : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                                                }`}
                                            >
                                                {pkg.tokens} Tokens (€{pkg.price.toFixed(2)})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Real-time Calculated Price Display */}
                            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Price</span>
                                <div className="mt-2 text-5xl font-black text-emerald-400">
                                    €{totalPrice}
                                </div>
                                <p className="mt-2 text-xs text-slate-400">
                                    Includes {customTokens} High-Level AI Coaching Interactions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="mb-8">
                        <h3 className="mb-4 text-lg font-bold text-white">2. Select Payment Method</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`cursor-pointer flex items-center gap-4 rounded-3xl p-5 border-2 text-left transition-all ${
                                    paymentMethod === 'card'
                                        ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                                }`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Debit / Credit Card</h4>
                                    <p className="text-xs text-slate-400">Instant activation via Visa, Mastercard, Apple Pay</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setPaymentMethod('bank')}
                                className={`cursor-pointer flex items-center gap-4 rounded-3xl p-5 border-2 text-left transition-all ${
                                    paymentMethod === 'bank'
                                        ? 'border-emerald-500 bg-emerald-500/10 shadow-lg'
                                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                                }`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Direct Bank Transfer</h4>
                                    <p className="text-xs text-slate-400">Manual wire transfer via IBAN / SWIFT</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Card Payment Submit Card */}
                    {paymentMethod === 'card' && (
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
                            <h4 className="mb-2 text-base font-bold text-white">Checkout with Card</h4>
                            <p className="mb-6 text-xs text-slate-400">
                                You are purchasing <span className="font-bold text-white">{customTokens} AI Tokens</span> for <span className="font-bold text-emerald-400">€{totalPrice}</span>.
                            </p>
                            <form onSubmit={handleCardSubmit}>
                                <button
                                    type="submit"
                                    disabled={cardProcessing}
                                    className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] hover:shadow-emerald-500/40 disabled:opacity-50"
                                >
                                    {cardProcessing ? 'Processing Checkout...' : `Pay €${totalPrice} Now (${customTokens} Tokens)`}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Bank Transfer Details */}
                    {paymentMethod === 'bank' && (
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-xl">
                            <h4 className="mb-2 text-base font-bold text-white">Bank Transfer Wire Details</h4>
                            <p className="mb-6 text-xs text-slate-400">
                                Please transfer <span className="font-bold text-emerald-400">€{totalPrice}</span> for <span className="font-bold text-white">{customTokens} Tokens</span> and include your unique reference code:
                            </p>

                            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment Reference Code (Required)</span>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="font-mono text-base font-bold text-emerald-400">
                                            {bankDetails.referenceCode}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(bankDetails.referenceCode, 'ref')}
                                            className="cursor-pointer rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
                                        >
                                            {copiedField === 'ref' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">IBAN</span>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="font-mono text-xs font-bold text-white">
                                            {bankDetails.iban}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(bankDetails.iban, 'iban')}
                                            className="cursor-pointer rounded-lg bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                                        >
                                            {copiedField === 'iban' ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Beneficiary</span>
                                    <p className="mt-1 text-sm font-semibold text-white">{bankDetails.accountName}</p>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bank Name / BIC</span>
                                    <p className="mt-1 text-sm font-semibold text-white">{bankDetails.bankName} ({bankDetails.swift})</p>
                                </div>
                            </div>

                            <form onSubmit={handleBankSubmit}>
                                <button
                                    type="submit"
                                    disabled={bankProcessing}
                                    className="cursor-pointer w-full rounded-2xl bg-teal-600 px-6 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-teal-500 disabled:opacity-50"
                                >
                                    {bankProcessing ? 'Submitting Notification...' : 'I Have Sent The Wire Transfer'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
