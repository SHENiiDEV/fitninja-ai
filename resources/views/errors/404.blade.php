<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 — Page Not Found | FitNinja AI</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#070A11] text-slate-100 font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-white">

    <!-- Ambient Glow -->
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-600/15 blur-[160px]"></div>
        <div class="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-teal-600/15 blur-[160px]"></div>
    </div>

    <!-- Header -->
    <header class="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 border-b border-slate-800/80">
        <a href="/" class="flex items-center gap-3">
            <img src="/images/logo.png" alt="FitNinja AI Logo" class="h-10 w-10 rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <span class="text-xl font-black tracking-tight text-white">
                FitNinja <span class="text-emerald-400">AI</span>
            </span>
        </a>
        <a href="/" class="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            ← Back to Home
        </a>
    </header>

    <!-- Main Hero -->
    <main class="relative z-10 mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div class="relative mb-6">
            <img src="/images/logo.png" alt="FitNinja AI Logo" class="h-28 w-28 rounded-3xl border border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.4)]">
        </div>

        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">
            ⚡ Status 404
        </div>

        <h1 class="text-5xl font-black tracking-tight text-white sm:text-6xl">
            404 — <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Page Not Found</span>
        </h1>

        <p class="mt-4 max-w-xl text-base text-slate-400 leading-relaxed font-light">
            The page or training route you are searching for has vanished into the stealth shadows.
        </p>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="/" class="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105">
                Return to Homepage →
            </a>
            <a href="/login" class="rounded-2xl border border-slate-800 bg-slate-900/80 px-7 py-4 text-sm font-bold text-slate-200 transition-all hover:border-slate-700 hover:text-white">
                Sign In / Log In
            </a>
        </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-slate-800/80 bg-[#070A11] py-8 text-center text-xs text-slate-500">
        <p>© {{ date('Y') }} CHANGE IT UP SERVICES LTD (Company No. 16107295). All rights reserved.</p>
    </footer>

</body>
</html>
