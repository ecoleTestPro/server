import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    showText?: boolean;
    width?: number;
    height?: number;
    className?: string;
}

export default function AppLogo({ showText = false, width = 60, height = 60, className }: AppLogoProps) {
    return (
        <>
            <div className={`cursor-pointer ${className}`}>
                <AppLogoIcon width={width} height={height} className="cursor-pointer" />
            </div>

            {showText && (
                <div className="ml-1 grid flex-1 text-left text-sm">
                    <span className="mb-0.5 truncate leading-none font-semibold">TestPro</span>
                </div>
            )}
        </>
    );
}
