import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextLink from '@/components/text-link';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ILoginAdminForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginAdminFormProps {
    status?: string;
    canResetPassword: boolean;
    onCloseDialog?: () => void;
}

export default function LoginAdminForm({ status, canResetPassword, onCloseDialog }: LoginAdminFormProps) {
    const { t, i18n } = useTranslation();
    const [loginError, setLoginError] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm<Required<ILoginAdminForm>>({
        email: 'admin@example.com',
        password: 'secret',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoginError(null); // Reset error before submit
        post(route('admin.login.post'), {
            onFinish: () => reset('password'),
            onSuccess: () => {
                if (onCloseDialog) {
                    onCloseDialog();
                }
            },
            onError: (errors) => {
                console.log('Login error:', errors);
                // Stocke le message d'erreur principal (ex: email ou password)
                setLoginError(errors.email || errors.password || t('login.error', 'Echec de la connexion. Veuillez réessayer.'));
            },
        });
    };

    return (
        <>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('login.email', 'Adresse e-mail')}</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('login.emailPlaceholder', 'email@example.com')}
                        />
                        {/* <InputError message={errors.email} /> */}
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">{t('login.password', 'Mot de passe')}</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    {t('login.forgotPassword', 'Mot de passe oublié?')}
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder={t('login.passwordPlaceholder', 'Mot de passe')}
                        />
                        {/* <InputError message={errors.password} /> */}
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">{t('login.rememberMe', 'Se souvenir de moi')}</Label>
                    </div>

                    {loginError && <Alert variant="destructive">{loginError}</Alert>}

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('login.loginButton', 'Se connecter')}
                    </Button>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </>
    );
}
