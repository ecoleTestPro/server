'use client';

import { IMainMenuItem, MenuChildItem } from '@/types/header.type';
import { Link, router } from '@inertiajs/react';
import { ChevronDownIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLogo from '@/components/app-logo';
import HeaderSearch from './header-search';
import HeaderUserAction from './headerUserAction';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

interface HeaderMobileProps {
    menu: IMainMenuItem[];
    menuRight?: IMainMenuItem[];
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

interface ExpandedItems {
    [key: string]: boolean;
}

export default function HeaderMobile({ menu, menuRight, isOpen, onClose, className }: HeaderMobileProps) {
    const { t } = useTranslation();
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

    // Fermer le menu mobile quand on clique en dehors et lors de la navigation
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

    // Fermer le menu lors de la navigation
    useEffect(() => {
        const handleStart = () => {
            onClose();
        };

        // In Inertia.js v2.0, use addEventListener on the router object
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

    const toggleExpanded = (itemId: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const renderMenuItem = (item: IMainMenuItem, level: number = 0) => {
        const hasChildren = item.children && item.children.items && item.children.items.length > 0;
        const isExpanded = expandedItems[item.id];
        const paddingLeft = level * 16;

        return (
            <div key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                {hasChildren ? (
                    <div>
                        <button
                            onClick={() => toggleExpanded(item.id)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                            style={{ paddingLeft: paddingLeft + 16 }}
                        >
                            <span className="font-medium">{item.label}</span>
                            {isExpanded ? (
                                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            )}
                        </button>
                        
                        {isExpanded && item.children && (
                            <div className="bg-gray-50 dark:bg-gray-800">
                                {item.children.items.map((childItem) => 
                                    renderChildMenuItem(childItem, level + 1)
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href={item.href??''}
                        onClick={onClose}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
                        style={{ paddingLeft: paddingLeft + 16 }}
                    >
                        <span className="font-medium">{item.label}</span>
                    </Link>
                )}
            </div>
        );
    };

    const renderChildMenuItem = (item: MenuChildItem, level: number = 0) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isExpanded = expandedItems[item.id];
        const paddingLeft = level * 16;

        return (
            <div key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                {hasSubItems ? (
                    <div>
                        <button
                            onClick={() => toggleExpanded(item.id)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            style={{ paddingLeft: paddingLeft + 16 }}
                        >
                            <div className="flex items-center">
                                {item.image && (
                                    <img 
                                        src={item.image} 
                                        alt={item.label}
                                        className="mr-3 h-8 w-8 rounded object-cover"
                                    />
                                )}
                                <div>
                                    <span className="block text-sm font-medium">{item.label}</span>
                                    {item.description && (
                                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                                            {item.description.substring(0, 60)}...
                                        </span>
                                    )}
                                </div>
                            </div>
                            {isExpanded ? (
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            ) : (
                                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                        
                        {isExpanded && item.subItems && (
                            <div className="bg-gray-100 dark:bg-gray-700">
                                {item.subItems.map((subItem) => 
                                    renderChildMenuItem(subItem, level + 1)
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href={item.href}
                        onClick={onClose}
                        className="block px-4 py-3 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        style={{ paddingLeft: paddingLeft + 16 }}
                    >
                        <div className="flex items-center">
                            {item.image && (
                                <img 
                                    src={item.image} 
                                    alt={item.label}
                                    className="mr-3 h-8 w-8 rounded object-cover"
                                />
                            )}
                            <div>
                                <span className="block text-sm font-medium">{item.label}</span>
                                {item.description && (
                                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                                        {item.description.substring(0, 60)}...
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    };

    return (
        <div className={`fixed inset-0 z-50 ${className} ${isOpen ? 'block' : 'hidden'}`}>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
                }`}
                onClick={onClose}
            />
            
            {/* Mobile Menu Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-full max-w-sm bg-white shadow-xl dark:bg-gray-900 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header du menu mobile */}
                <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                    <Link href="/" onClick={onClose} className="flex items-center">
                        <AppLogo width={120} height={48} className="" />
                    </Link>
                    
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        aria-label={t('HEADER.CLOSE_MENU', 'Fermer le menu')}
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Barre de recherche mobile */}
                <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700 sm:hidden">
                    <HeaderSearch className="w-full" />
                </div>

                {/* Actions utilisateur mobile */}
                <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <HeaderUserAction />
                        <AppearanceToggleDropdown />
                    </div>
                </div>

                {/* Menu de navigation */}
                <div className="h-full overflow-y-auto pb-20">
                    {/* Menu principal */}
                    <div className="py-2">
                        <div className="px-4 py-2">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                {t('HEADER.MAIN_MENU', 'Menu principal')}
                            </h3>
                        </div>
                        {menu.map((item) => renderMenuItem(item))}
                    </div>

                    {/* Menu de droite */}
                    {menuRight && menuRight.length > 0 && (
                        <div className="py-2">
                            <div className="px-4 py-2">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    {t('HEADER.ADDITIONAL_MENU', 'Menu additionnel')}
                                </h3>
                            </div>
                            {menuRight.map((item) => renderMenuItem(item))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}