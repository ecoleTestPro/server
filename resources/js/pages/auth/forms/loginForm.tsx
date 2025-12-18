import { useForm } from '@inertiajs/react';
import { CheckCircle, Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TextLink from '@/components/text-link';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logger } from '@/utils/console.util';

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
    const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<ILoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoginError(null);
        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: () => {
                if (onCloseDialog) {
                    onCloseDialog();
                }
            },
            onError: (errors) => {
                Logger.log('Login error:', errors);
                setLoginError(errors.email || errors.password || t('login.error', 'Login failed. Please try again.'));
            },
        });
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="w-full max-w-md mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
                        <div className="text-white text-lg sm:text-2xl">🎓</div>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{t('login.welcome', 'Bienvenue')}</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2">
                        {t('login.subtitle', 'Connectez-vous à votre compte')}
                    </p>
                </div>

                {status && (
                    <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-200">{status}</div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4 sm:space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('login.email', 'Adresse e-mail')}
                        </Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail
                                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200 ${
                                        focusedField === 'email' || data.email ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder={t('login.emailPlaceholder', 'votre.email@exemple.com')}
                                className={`pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-12 text-sm sm:text-base transition-all duration-200 border-2 ${
                                    focusedField === 'email'
                                        ? 'border-emerald-500 shadow-md shadow-emerald-100 dark:shadow-emerald-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                } ${errors.email ? 'border-red-400 focus:border-red-500' : ''}`}
                            />
                            {data.email && isValidEmail(data.email) && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                                </div>
                            )}
                        </div>
                        {errors.email && (
                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                                <span className="inline-block w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('login.password', 'Mot de passe')}
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors"
                                    tabIndex={5}
                                >
                                    {t('login.forgotPassword', 'Oublié ?')}
                                </TextLink>
                            )}
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock
                                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-200 ${
                                        focusedField === 'password' || data.password ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                placeholder={t('login.passwordPlaceholder', '••••••••')}
                                className={`pl-9 sm:pl-10 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base transition-all duration-200 border-2 ${
                                    focusedField === 'password'
                                        ? 'border-emerald-500 shadow-md shadow-emerald-100 dark:shadow-emerald-900/20'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                } ${errors.password ? 'border-red-400 focus:border-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors" />
                                ) : (
                                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1">
                                <span className="inline-block w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center justify-between py-1">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) => setData('remember', !!checked)}
                                tabIndex={3}
                                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                            />
                            <Label htmlFor="remember" className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                                {t('login.rememberMe', 'Se souvenir de moi')}
                            </Label>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {loginError && (
                        <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                                <span className="text-xs sm:text-sm text-red-800 dark:text-red-200">{loginError}</span>
                            </div>
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-10 sm:h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                        tabIndex={4}
                        disabled={processing}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {processing && <LoaderCircle className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />}
                            <span>{processing ? t('login.logging', 'Connexion...') : t('login.loginButton', 'Se connecter')}</span>
                        </div>
                    </Button>

                    {/* Divider */}
                    <div className="relative my-4 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs sm:text-sm">
                            <span className="px-3 sm:px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">{t('login.or', 'ou')}</span>
                        </div>
                    </div>

                    {/* Sign up link */}
                    <div className="text-center px-2">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {t('login.noAccount', "Vous n'avez pas de compte ?")}{' '}
                            <TextLink
                                href={route('auth.register')}
                                tabIndex={5}
                                className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                            >
                                {t('login.signUp', 'Créer un compte')}
                            </TextLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
