import '../css/app.css';
import './bootstrap';

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

        // Statically imported ErrorPage fallback for invalid/missing routes
        return ErrorPage;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#10b981',
    },
});
