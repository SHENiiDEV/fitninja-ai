import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-black text-white">Reset Password</h2>
                <p className="mt-1 text-xs text-slate-400">
                    Enter your registered email address and we will send you a password reset link.
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs font-semibold text-emerald-400 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 font-medium text-xs" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="name@example.com"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="cursor-pointer mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 disabled:opacity-50"
                >
                    {processing ? 'Sending Link...' : 'Send Password Reset Link'}
                </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
                Remember your password?{' '}
                <Link href={route('login')} className="cursor-pointer font-bold text-emerald-400 hover:underline">
                    Back to Sign In
                </Link>
            </div>
        </GuestLayout>
    );
}
