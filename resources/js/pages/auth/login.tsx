import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import AuthLayout from '@/layouts/auth/auth-layout';
import LoginForm from './forms/loginForm';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { t, i18n } = useTranslation();

    return (
        <AuthLayout
            title={t('login.title', 'Log in to your account')}
            description={t('login.description', 'Enter your email and password below to log in')}
        >
            <Head title={t('login.title', 'Log in')} />

            <LoginForm status={status} canResetPassword={canResetPassword} />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
