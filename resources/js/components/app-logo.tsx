import AppLogoIcon from './app-logo-icon';

interface AppLogoProps {
    showText?: boolean;
    width?: number;
    height?: number;
}

export default function AppLogo({ showText = false, width = 52, height = 52 }: AppLogoProps) {
    return (
        <>
            <div className="cursor-pointer">
                <AppLogoIcon width={width} height={height} className="cursor-pointer" />
            </div>

            {showText && (
                <div className="ml-1 grid flex-1 text-left text-sm">
                    <span className="mb-0.5 truncate leading-none font-semibold">Ecole test pro</span>
                </div>
            )}
        </>
    );
}
