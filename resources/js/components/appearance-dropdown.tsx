import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'light':
                return <Sun className="h-5 w-5" />;
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    const onToggleAppearance = () => {
        const nextAppearance = appearance === 'dark' ? 'light' : 'dark';
        updateAppearance(nextAppearance);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onToggleAppearance();
    };

    return (
        <div className={className} {...props}>
            <Button onClick={handleClick} variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                {getCurrentIcon()}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    );
}
