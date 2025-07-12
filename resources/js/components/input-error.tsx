import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string | string[] }) {
    return message ? (
        <>
            <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)}>
                {Array.isArray(message) ? message.join(', ') : message}
            </p>
        </>
    ) : null;
}
