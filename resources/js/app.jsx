import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'FitNinja AI';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const pageKey = `./Pages/${name}.jsx`;
        if (pages[pageKey]) {
            return resolvePageComponent(pageKey, pages);
        }
        // Graceful fallback to Error.jsx if page component is missing
        return resolvePageComponent('./Pages/Error.jsx', pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#10b981',
    },
});
