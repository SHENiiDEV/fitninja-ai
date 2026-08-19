import '../css/app.css';
import './bootstrap';

import CookieConsent from '@/Components/CookieConsent';
import OfflineBanner from '@/Components/OfflineBanner';
import { CurrencyProvider } from '@/Contexts/CurrencyContext';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import ErrorPage from './Pages/Error.jsx';

const appName = import.meta.env.VITE_APP_NAME || 'FitNinja AI';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        if (name === 'Error') {
            return ErrorPage;
        }

        const pages = import.meta.glob('./Pages/**/*.jsx');
        const pageKey = `./Pages/${name}.jsx`;

        if (pages[pageKey]) {
            return resolvePageComponent(pageKey, pages);
        }

        return ErrorPage;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CurrencyProvider>
                <App {...props} />
                <CookieConsent />
                <OfflineBanner />
            </CurrencyProvider>
        );
    },
    progress: {
        color: '#10b981',
    },
});
