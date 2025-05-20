import { Link } from '@inertiajs/react';
import { JSX } from 'react';

interface BtnLinkCustomProps {
    href: string;
    text: string;
    icon: JSX.Element;
    iconPosition?: 'left' | 'right';
    iconSize?: number;
    className?: string;
}

export function BtnLinkCustom({
    className,
    text,
    href,
    icon,
    iconPosition = 'left',
    iconSize = 4,
}: BtnLinkCustomProps) {
    return (
        <Link
            href={href}
            className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md border border-primary font-medium ${className || ''}`}
        >
            {/* Normal State */}
            <div className="inline-flex h-10 translate-y-0 items-center justify-center bg-white dark:bg-neutral-900 px-6 text-primary transition group-hover:-translate-y-[150%]">
                {iconPosition === 'left' && <span className="mr-2">{icon}</span>}
                {text}
                {iconPosition === 'right' && <span className="ml-2">{icon}</span>}
            </div>

            {/* Hover State */}
            <div className="absolute inline-flex h-10 w-full translate-y-[100%] items-center justify-center bg-primary px-6 text-neutral-50 dark:bg-primary dark:text-neutral-950 transition duration-300 group-hover:translate-y-0">
                {iconPosition === 'left' && <span className="mr-2">{icon}</span>}
                {text}
                {iconPosition === 'right' && <span className="ml-2">{icon}</span>}
            </div>
        </Link>
    );
}