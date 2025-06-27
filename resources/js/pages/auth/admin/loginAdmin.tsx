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
            title={t('login.title', 'Se connecter à votre compte')}
            description={t('login.description', 'Entrez votre adresse e-mail et votre mot de passe ci-dessous pour vous connecter')}
        >
            <Head title={t('login.title', 'Se connecter')} />

            <LoginAdminForm status={status} canResetPassword={canResetPassword} />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthAdminLayout>
    );
}
