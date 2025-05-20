import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ILoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginFormProps {
    status?: string;
    canResetPassword: boolean;
    onCloseDialog?: () => void;
}

export default function LoginForm({ status, canResetPassword, onCloseDialog }: LoginFormProps) {
    const { t, i18n } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm<Required<ILoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('auth.login'), {
            onFinish: () => reset('password'),
            onSuccess: () => {
                if (onCloseDialog) {
                    onCloseDialog();
                }
            },
            onError: (errors) => {
                console.error('Login error:', errors);
            },
        });
    };

    return (
        <>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('login.email', 'Email address')}</Label>
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
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">{t('login.password', 'Password')}</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    {t('login.forgotPassword', 'Forgot password?')}
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
                            placeholder={t('login.passwordPlaceholder', 'Password')}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">{t('login.rememberMe', 'Remember me')}</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {t('login.loginButton', 'Log in')}
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    {t('login.noAccount', "Don't have an account?")}{' '}
                    <TextLink href={route('auth.register')} tabIndex={5}>
                        {t('login.signUp', 'Sign up')}
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </>
    );
}
