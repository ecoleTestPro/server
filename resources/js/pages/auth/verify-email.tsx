// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button/button';
import AuthLayout from '@/layouts/auth/auth-layout';
import { useTranslation } from 'react-i18next';

export default function VerifyEmail({ status }: { status?: string }) {
    const { t, i18n } = useTranslation();
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title={t('verifyEmail.title')} description={t('verifyEmail.description')}>
            <Head title={t('verifyEmail.headTitle')} />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">{t('verifyEmail.linkSent')}</div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {t('verifyEmail.resendButton')}
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm cursor-pointer">
                    {t('verifyEmail.logout')}
                </TextLink>
            </form>
        </AuthLayout>
    );
}
