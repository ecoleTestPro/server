import '@/i18n';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import SvgGoogle from '@/components/icons/svg/google';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Logger } from '@/utils/console.util';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    privacy: boolean;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: 'john doe',
        email: 'keraste38@gmail.com',
        password: 'password',
        password_confirmation: 'password',
        phone: '1234567890',
        privacy: false,
    });

    const { t, i18n } = useTranslation();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('auth.register'), {
            onFinish: (response) => {
                Logger.log('Registration response:', response);
            },
            onSuccess: () => {
                toast.success(t('register.successMessage', 'Inscription réussie !'));
            },
            onError: (errors) => {
                toast.error(t('register.errorMessage', "Erreur lors de l'inscription"));
                Logger.error('Registration error:', errors);
            },
        });
    };

    return (
        <>
            <AuthLayout title={t('register.title')} description={t('register.description')}>
                <Head title={t('register.title')} />
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    {/* Form Fields */}
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">{t('register.fullName')}</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder={t('register.fullName')}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('register.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder={t('register.email')}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">{t('register.phoneNumber')}</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                tabIndex={2}
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder={t('register.phoneNumber')}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('register.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder={t('register.password')}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">{t('register.confirmPassword')}</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder={t('register.confirmPassword')}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Privacy Policy */}
                        <div className="grid gap-2">
                            <p className="text-sm text-gray-600">{t('register.privacy.privacyText')}</p>
                            <div className="flex items-center">
                                <input
                                    id="privacy"
                                    type="checkbox"
                                    required
                                    tabIndex={5}
                                    disabled={processing}
                                    onChange={(e) => setData('privacy', e.target.checked)}
                                />
                                <Label htmlFor="privacy" className="ml-2">
                                    {t('register.privacy.privacyCheck')}
                                </Label>
                            </div>
                            <TextLink href="#" className="mt-1 text-sm text-blue-500" tabIndex={6}>
                                {t('register.privacy.privacyPolicy')}
                            </TextLink>
                            <InputError message={errors.privacy} />
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            {t('register.signUp')}
                        </Button>
                    </div>

                    {/* Or Sign Up with Email */}
                    <p className="text-center text-gray-500">{t('register.orSignUpWith')}</p>
                    {/* Social Login Buttons */}
                    <div className="mb-4 flex justify-center gap-2">
                        <Button variant="outline" className="flex items-center justify-center">
                            <SvgGoogle className="mr-2 h-4 w-4" width={24} height={24} />
                            {t('register.signUpWithGoogle')}
                        </Button>
                    </div>

                    {/* Already have an account? */}
                    <div className="mt-4 text-center text-sm">
                        {t('register.alreadyHaveAccount')}{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            {t('register.signIn')}
                        </TextLink>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}
