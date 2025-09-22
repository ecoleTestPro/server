interface AppLogoIconProps {
    width?: number;
    height?: number;
    className?: string;
}

export default function AppLogoIcon(props: AppLogoIconProps) {
    const { width = 100, height = 42, className = '' } = props;

    const PNG = () => {
        return <img width={width} height={height} src="/logo.png" alt="Logo" className={className} />;
    };

    return <PNG />;
}
