import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log In" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-black text-white">Welcome Back</h2>
                <p className="mt-1 text-xs text-slate-400">Log in to manage your AI fitness goals</p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-400 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 font-medium text-xs" />
                    <div className="relative mt-1">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full rounded-xl border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="name@example.com"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-400" />
                    <InputError message={errors.telegram} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" className="text-slate-300 font-medium text-xs" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="cursor-pointer text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="relative mt-1">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-xl border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="cursor-pointer flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/40"
                        />
                        <span className="text-xs text-slate-400 font-medium">Remember me</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="cursor-pointer mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 disabled:opacity-50"
                >
                    {processing ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
                Don't have an account?{' '}
                <Link href={route('register')} className="cursor-pointer font-bold text-emerald-400 hover:underline">
                    Create Account
                </Link>
            </div>
        </GuestLayout>
    );
}
