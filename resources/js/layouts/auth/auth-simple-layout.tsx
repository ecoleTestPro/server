import AppLogoIcon from '@/components/app-logo-icon';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="flex h-[100vh] flex-col items-center justify-center bg-white bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:bg-neutral-900 dark:from-neutral-900 dark:to-neutral-900">
            <div className="mx-auto flex min-h-[100vh] w-full flex-col justify-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] lg:max-w-[50%] lg:px-6">
                <div className="mt-[50px] flex items-center justify-center p-4 text-center">
                    <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                        <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                        {/* {name} */}
                    </Link>
                </div>

                <div
                    className="glassmorphism mx-auto my-auto mt-8 mb-auto flex w-[450px] max-w-[550px] flex-col md:mt-[70px] md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]"
                    style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                >
                    <div className="px-4">
                        <p className="text-[32px] font-bold text-zinc-950 dark:text-white">{title}</p>
                        <p className="mt-2.5 mb-2.5 font-normal text-zinc-950 dark:text-zinc-400">{description}</p>
                    </div>

                    <div className="relative my-4">
                        <div className="relative flex items-center py-1">
                            <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
                            <div className="grow border-t border-zinc-200 dark:border-zinc-700"></div>
                        </div>
                    </div>

                    <div className="p-4">{children}</div>
                </div>
            </div>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </div>
    );
}
