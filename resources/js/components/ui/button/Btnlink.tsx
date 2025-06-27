import { Link } from '@inertiajs/react';
import { JSX } from 'react';

interface IconLinkProps {
    href: string;
    icon: JSX.Element;
    title: string; // Pour l'accessibilité (aria-label)
    size?: number; // Taille de l'icône en rem (par défaut: 1.5rem)
    className?: string;
}

export function BtnLinkCustom({
    href,
    icon,
    title,
    size = 1.5,
    className = '',
}: IconLinkProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-full p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
            aria-label={title}
        >
            <span style={{ fontSize: `${size}rem` }} className="inline-block">
                {icon}
            </span>
        </Link>
    );
}