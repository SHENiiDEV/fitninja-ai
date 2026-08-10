import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name ?? '',
            email: user.email ?? '',
            phone: user.phone ?? '',
            billing_address: user.billing_address ?? '',
            billing_city: user.billing_city ?? '',
            billing_country: user.billing_country ?? '',
            billing_postcode: user.billing_postcode ?? '',
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-bold text-white">
                    Personal & Billing Profile
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                    Update your account's profile information, contact phone, and invoice billing address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" className="text-slate-300 font-semibold text-xs" />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-1.5 text-xs text-rose-400" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 font-semibold text-xs" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-1.5 text-xs text-rose-400" message={errors.email} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone Number (For Payment Receipts)" className="text-slate-300 font-semibold text-xs" />
                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        value={data.phone}
                        placeholder="+44 7700 900077"
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />
                    <InputError className="mt-1.5 text-xs text-rose-400" message={errors.phone} />
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Billing & Invoice Address</h3>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="billing_address" value="Street Address" className="text-slate-300 font-semibold text-xs" />
                            <TextInput
                                id="billing_address"
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                value={data.billing_address}
                                placeholder="10 Downing Street"
                                onChange={(e) => setData('billing_address', e.target.value)}
                                autoComplete="street-address"
                            />
                            <InputError className="mt-1.5 text-xs text-rose-400" message={errors.billing_address} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <InputLabel htmlFor="billing_city" value="City" className="text-slate-300 font-semibold text-xs" />
                                <TextInput
                                    id="billing_city"
                                    className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    value={data.billing_city}
                                    placeholder="London"
                                    onChange={(e) => setData('billing_city', e.target.value)}
                                    autoComplete="address-level2"
                                />
                                <InputError className="mt-1.5 text-xs text-rose-400" message={errors.billing_city} />
                            </div>

                            <div>
                                <InputLabel htmlFor="billing_country" value="Country" className="text-slate-300 font-semibold text-xs" />
                                <TextInput
                                    id="billing_country"
                                    className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    value={data.billing_country}
                                    placeholder="United Kingdom"
                                    onChange={(e) => setData('billing_country', e.target.value)}
                                    autoComplete="country-name"
                                />
                                <InputError className="mt-1.5 text-xs text-rose-400" message={errors.billing_country} />
                            </div>

                            <div>
                                <InputLabel htmlFor="billing_postcode" value="Postcode / Zip" className="text-slate-300 font-semibold text-xs" />
                                <TextInput
                                    id="billing_postcode"
                                    className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    value={data.billing_postcode}
                                    placeholder="SW1A 2AA"
                                    onChange={(e) => setData('billing_postcode', e.target.value)}
                                    autoComplete="postal-code"
                                />
                                <InputError className="mt-1.5 text-xs text-rose-400" message={errors.billing_postcode} />
                            </div>
                        </div>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-xs text-slate-300">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="cursor-pointer font-bold text-emerald-400 underline hover:text-emerald-300"
                            >
                                Re-send verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-semibold text-emerald-400">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 disabled:opacity-50"
                    >
                        Save Profile & Billing Info
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-semibold text-emerald-400">
                            ✓ Saved successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
