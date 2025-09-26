import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateDisplayProps {
    startDate?: string;
    endDate?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'compact';
    className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
    startDate,
    endDate,
    size = 'md',
    variant = 'default',
    className = ''
}) => {
    const formatDay = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric' });
    const formatMonth = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase();
    const formatYear = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric' });
    const formatYearShort = (dateString: string) => new Date(dateString).toLocaleDateString('fr-FR', { year: '2-digit' });

    if (!startDate) return null;

    const sizeClasses = {
        sm: {
            container: 'w-12 h-12',
            day: 'text-lg font-bold leading-4',
            month: 'text-[8px] font-semibold tracking-wide',
            year: 'text-[8px]',
            arrow: 'w-12'
        },
        md: {
            container: 'w-16 h-16',
            day: 'text-xl font-bold leading-5',
            month: 'text-[10px] font-semibold tracking-wide',
            year: 'text-[10px]',
            arrow: 'w-16'
        },
        lg: {
            container: 'w-20 h-20',
            day: 'text-2xl font-bold leading-6',
            month: 'text-xs font-semibold tracking-wide',
            year: 'text-xs',
            arrow: 'w-20'
        }
    };

    const currentSizeClasses = sizeClasses[size];

    if (variant === 'compact') {
        // Compact version for table cells or small spaces
        return (
            <div className={cn('flex items-center gap-1', className)}>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatDay(startDate)} {formatMonth(startDate).toLowerCase()} {formatYearShort(startDate)}
                </span>
                {endDate && (
                    <>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDay(endDate)} {formatMonth(endDate).toLowerCase()} {formatYearShort(endDate)}
                        </span>
                    </>
                )}
            </div>
        );
    }

    // Default version with date badges
    return (
        <div className={cn('flex items-center gap-2', className)}>
            {startDate && (
                <div className={cn(
                    'rounded-md bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center mx-auto md:mx-0',
                    currentSizeClasses.container
                )}>
                    <div className={currentSizeClasses.day}>{formatDay(startDate)}</div>
                    <div className={cn(currentSizeClasses.month)}>{formatMonth(startDate)}</div>
                    <div className={cn(currentSizeClasses.year, 'text-emerald-700')}>{formatYear(startDate)}</div>
                </div>
            )}
            {startDate && endDate && (
                <div className={cn('flex items-center justify-center', currentSizeClasses.arrow)}>
                    <ArrowRight className="w-6 h-6" />
                </div>
            )}
            {endDate && (
                <div className={cn(
                    'rounded-md bg-emerald-100 text-emerald-800 flex flex-col items-center justify-center mx-auto md:mx-0',
                    currentSizeClasses.container
                )}>
                    <div className={currentSizeClasses.day}>{formatDay(endDate)}</div>
                    <div className={cn(currentSizeClasses.month)}>{formatMonth(endDate)}</div>
                    <div className={cn(currentSizeClasses.year, 'text-emerald-700')}>{formatYear(endDate)}</div>
                </div>
            )}
        </div>
    );
};

export default DateDisplay;