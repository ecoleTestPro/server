import { memo } from 'react';

interface AppLogoIconProps {
    width?: number;
    height?: number;
    className?: string;
}

function AppLogoIcon(props: AppLogoIconProps) {
    const { width = 100, height = 42, className = '' } = props;

    // Render the image directly. Defining a nested component here causes React
    // to treat it as a new component on each render, which can unmount/remount
    // the <img> and trigger repeated network requests when parents re-render
    // (e.g., on scroll).
    return <img width={width} height={height} src="/logo.png" alt="Logo" className={className} loading="eager" decoding="async" draggable={false} />;
}

export default memo(AppLogoIcon);
