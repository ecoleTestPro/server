import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY_PUBLIC } from './data/data.constant';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'TestPro';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY_PUBLIC}>
                <App {...props} />
            </GoogleReCaptchaProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
