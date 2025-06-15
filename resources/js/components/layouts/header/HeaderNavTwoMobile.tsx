'use client';

import { Link } from '@inertiajs/react';
import { ChevronDownIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { IMainMenuItem } from '@/types/header.type';

interface NavigationMenuProps {
    menu: IMainMenuItem[];
    menuRight?: IMainMenuItem[];
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export function HeaderNavTwoSidebar({ menu, menuRight, isOpen, onClose, className }: NavigationMenuProps) {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    const toggleMenu = (id: string) => {
        setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (!menu || menu.length === 0) {
        return null;
    }

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 z-50 h-full w-[280px] transform bg-white transition-transform duration-300 dark:bg-gray-900 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } ${className}`}
                aria-label="Menu mobile"
            >
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Menu</span>
                    <button
                        onClick={onClose}
                        aria-label="Fermer le menu"
                        className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                    >
                        <XIcon className="size-5" />
                    </button>
                </div>

                <div className="flex h-[calc(100%-60px)] flex-col space-y-2 overflow-y-auto p-4">
                    {menu.map((menuItem) => (
                        <div key={menuItem.id} className="w-full">
                            {menuItem.children ? (
                                <button
                                    onClick={() => toggleMenu(menuItem.id)}
                                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                    aria-expanded={openMenus[menuItem.id] || false}
                                    aria-controls={`submenu-${menuItem.id}`}
                                >
                                    <span>{menuItem.label}</span>
                                    <span className="ml-2">
                                        {openMenus[menuItem.id] ? <ChevronDownIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    href={menuItem.href || '#'}
                                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                                    onClick={onClose}
                                >
                                    {menuItem.label}
                                </Link>
                            )}

                            {menuItem.children && (
                                <div
                                    id={`submenu-${menuItem.id}`}
                                    className={`overflow-hidden transition-all duration-300 ${openMenus[menuItem.id] ? 'max-h-[1000px]' : 'max-h-0'}`}
                                >
                                    <ul className="ml-4 space-y-1 border-l border-gray-200 dark:border-gray-700">
                                        {menuItem.children.items.map((child) => (
                                            <li key={child.id}>
                                                <Link
                                                    href={child.href || '#'}
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                    onClick={onClose}
                                                >
                                                    {child.label}
                                                </Link>
                                                {child.subItems && child.subItems.length > 0 && (
                                                    <ul className="ml-4 space-y-1 border-l border-gray-200 dark:border-gray-700">
                                                        {child.subItems.map((subItem) => (
                                                            <li key={subItem.id}>
                                                                <Link
                                                                    href={subItem.href || '#'}
                                                                    className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                                    onClick={onClose}
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
}
