import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import FooterWithLegal from '@/Components/Landing/FooterWithLegal';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('billing.index')}
                                    active={route().current('billing.index')}
                                >
                                    💳 Tokens & Billing
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Slide-out Drawer */}
                {showingNavigationDropdown && (
                    <div className="fixed inset-0 z-50 sm:hidden">
                        <div
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setShowingNavigationDropdown(false)}
                        />

                        <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-[#090d16]/95 border-l border-slate-800 p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                    <div className="flex items-center gap-2.5">
                                        <ApplicationLogo className="h-8 w-8" />
                                        <span className="text-base font-black tracking-tight text-white">
                                            FitNinja <span className="text-emerald-400">AI</span>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-6 space-y-2">
                                    <ResponsiveNavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        📊 Dashboard & Analytics
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('billing.index')}
                                        active={route().current('billing.index')}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        💳 Tokens & Billing Store
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                        active={route().current('profile.edit')}
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        👤 User Profile & Settings
                                    </ResponsiveNavLink>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <div className="mb-4">
                                    <div className="text-sm font-bold text-white">{user.name}</div>
                                    <div className="text-xs text-slate-400">{user.email}</div>
                                </div>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="w-full text-center bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <FooterWithLegal />
        </div>
    );
}
