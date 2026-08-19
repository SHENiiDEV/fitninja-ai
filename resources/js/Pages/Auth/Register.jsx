import Checkbox from '@/Components/Checkbox';
import DatePicker from '@/Components/DatePicker';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const ALLOWED_COUNTRIES = [
    "United Kingdom", "United States", "Germany", "France", "Italy", "Spain", "Australia", "Austria",
    "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize",
    "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "Gabon", "Gambia",
    "Georgia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel",
    "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
    "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
    "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "South Africa",
    "Sri Lanka", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam", "Zambia"
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        date_of_birth: '',
        address_line1: '',
        city: '',
        country: 'United Kingdom',
        postcode: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-black text-white">Create Account</h2>
                <p className="mt-1 text-xs text-slate-400">Join FitNinja AI and receive 10 free AI tokens</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* 1. Account Credentials */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">1. Account Credentials</h3>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 font-medium text-xs" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="name@example.com"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-1.5 text-xs text-rose-400" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Min 8 characters"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-1.5 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Repeat password"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={errors.password_confirmation} className="mt-1.5 text-xs text-rose-400" />
                        </div>
                    </div>
                </div>

                {/* 2. Personal Information */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">2. Personal Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="name" value="Name (First Name)" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="John"
                                autoComplete="given-name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-1.5 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="surname" value="Surname (Last Name)" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="surname"
                                name="surname"
                                value={data.surname}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Doe"
                                autoComplete="family-name"
                                onChange={(e) => setData('surname', e.target.value)}
                                required
                            />
                            <InputError message={errors.surname} className="mt-1.5 text-xs text-rose-400" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="+44 7123 456789"
                                autoComplete="tel"
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                            />
                            <InputError message={errors.phone} className="mt-1.5 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="date_of_birth" value="Date of Birth" className="text-slate-300 font-medium text-xs mb-1" />
                            <DatePicker
                                value={data.date_of_birth}
                                onChange={(val) => setData('date_of_birth', val)}
                                error={errors.date_of_birth}
                                placeholder="Select Date of Birth"
                            />
                            <InputError message={errors.date_of_birth} className="mt-1.5 text-xs text-rose-400" />
                        </div>
                    </div>
                </div>

                {/* 3. Address Details */}
                <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">3. Residential Address</h3>

                    <div>
                        <InputLabel htmlFor="address_line1" value="1. Street, house number, apartment..." className="text-slate-300 font-medium text-xs" />
                        <TextInput
                            id="address_line1"
                            name="address_line1"
                            value={data.address_line1}
                            className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            placeholder="14 Broadway, Flat 2B"
                            autoComplete="address-line1"
                            onChange={(e) => setData('address_line1', e.target.value)}
                            required
                        />
                        <InputError message={errors.address_line1} className="mt-1.5 text-xs text-rose-400" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <InputLabel htmlFor="city" value="2. City" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="city"
                                name="city"
                                value={data.city}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Nottingham"
                                autoComplete="address-level2"
                                onChange={(e) => setData('city', e.target.value)}
                                required
                            />
                            <InputError message={errors.city} className="mt-1.5 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="country" value="3. Country" className="text-slate-300 font-medium text-xs" />
                            <select
                                id="country"
                                name="country"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-3 py-3 text-sm text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                required
                            >
                                {ALLOWED_COUNTRIES.map((c) => (
                                    <option key={c} value={c} className="bg-slate-900 text-white">
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.country} className="mt-1.5 text-xs text-rose-400" />
                        </div>

                        <div>
                            <InputLabel htmlFor="postcode" value="4. Post Code" className="text-slate-300 font-medium text-xs" />
                            <TextInput
                                id="postcode"
                                name="postcode"
                                value={data.postcode}
                                className="mt-1 block w-full rounded-xl border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="NG1 1PS"
                                autoComplete="postal-code"
                                onChange={(e) => setData('postcode', e.target.value)}
                                required
                            />
                            <InputError message={errors.postcode} className="mt-1.5 text-xs text-rose-400" />
                        </div>
                    </div>
                </div>

                {/* 4. Terms & Conditions Checkbox */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                    <label className="cursor-pointer flex items-start gap-3">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/40"
                            required
                        />
                        <span className="text-xs text-slate-300 leading-relaxed font-light">
                            I agree to the{' '}
                            <Link
                                href={route('legal.terms')}
                                target="_blank"
                                className="font-bold text-emerald-400 underline hover:text-emerald-300"
                            >
                                Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link
                                href={route('legal.privacy')}
                                target="_blank"
                                className="font-bold text-emerald-400 underline hover:text-emerald-300"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>
                    <InputError message={errors.terms} className="mt-1.5 text-xs text-rose-400" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="cursor-pointer mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.01] hover:shadow-emerald-500/40 disabled:opacity-50"
                >
                    {processing ? 'Creating Account...' : 'Complete Registration →'}
                </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-400">
                Already have an account?{' '}
                <Link href={route('login')} className="cursor-pointer font-bold text-emerald-400 hover:underline">
                    Sign In
                </Link>
            </div>
        </GuestLayout>
    );
}
