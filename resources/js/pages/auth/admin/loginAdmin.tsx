import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import AuthAdminLayout from '@/layouts/auth/auth-admin-layout';
import LoginAdminForm from './loginAdminForm';

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
        <AuthAdminLayout
            title={t('login.title', 'Log in to your account')}
            description={t('login.description', 'Enter your email and password below to log in')}
        >
            <Head title={t('login.title', 'Log in')} />

            <LoginAdminForm status={status} canResetPassword={canResetPassword} />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthAdminLayout>
    );
}
