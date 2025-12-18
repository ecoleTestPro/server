'use client';

import AppLogo from '@/components/app-logo';
import { Link, router } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderSearch from './header-search';

interface SearchMobileProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export default function SearchMobile({ isOpen, onClose, className }: SearchMobileProps) {
    const { t } = useTranslation();

    // Fermer la recherche mobile et lors de la navigation
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Fermer la recherche lors de la navigation
    useEffect(() => {
        const handleStart = () => {
            onClose();
        };

        const cleanup = router.on('start', handleStart);

        return cleanup;
    }, [onClose]);

    // Fermer avec la touche Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 z-50 ${className} ${isOpen ? 'block' : 'hidden'}`}>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
                onClick={onClose}
            />

            {/* Search Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header de la recherche mobile */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                    <Link href="/" onClick={onClose} className="flex items-center">
                        <AppLogo width={120} height={48} className="" />
                    </Link>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        aria-label={t('HEADER.CLOSE_SEARCH', 'Fermer la recherche')}
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Zone de recherche principale */}
                <div className="p-4">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('HEADER.SEARCH_TITLE', 'Rechercher')}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('HEADER.SEARCH_DESCRIPTION', 'Trouvez des formations, des cours et des ressources')}
                        </p>
                    </div>

                    <HeaderSearch className="w-full mb-6" />

                    {/* Suggestions de recherche rapide */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                {t('HEADER.POPULAR_SEARCHES', 'Recherches populaires')}
                            </h3>
                            <div className="space-y-2">
                                <Link
                                    href="/formations"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    {t('HEADER.ALL_FORMATIONS', 'Toutes les formations')}
                                </Link>
                                <Link
                                    href="/formations/programmation"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    {t('HEADER.PROGRAMMING_COURSES', 'Cours de programmation')}
                                </Link>
                                <Link
                                    href="/formations/certifications"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    {t('HEADER.CERTIFICATIONS', 'Certifications')}
                                </Link>
                                <Link
                                    href="/reconversion-metier"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    {t('HEADER.CAREER_CHANGE', 'Reconversion professionnelle')}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{t('HEADER.QUICK_ACCESS', 'Accès rapide')}</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/calendrier"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    📅 {t('HEADER.CALENDAR', 'Calendrier des sessions')}
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    📞 {t('HEADER.CONTACT', 'Nous contacter')}
                                </Link>
                                <Link
                                    href="/about-us"
                                    onClick={onClose}
                                    className="block text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                                >
                                    ℹ️ {t('HEADER.ABOUT', 'À propos')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
