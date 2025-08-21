import { motionVariants } from '@/utils/motion.util';
import { motion } from 'framer-motion';
import React from 'react';

interface IMotionSectionProps {
    children?: React.ReactNode;
    once?: boolean;
    amount?: number;
    className?: string;
    style?: React.CSSProperties;
    initial?: string;
    whileInView?: string;
    viewport?: { once: boolean; amount: number };
}

export default function MotionSection({ 
    children, 
    once = true, 
    amount = 0.2, 
    className,
    style,
    initial = "hidden",
    whileInView = "visible",
    viewport
}: IMotionSectionProps) {
    const finalViewport = viewport || { once, amount };
    
    return (
        <motion.section 
            initial={initial} 
            whileInView={whileInView} 
            viewport={finalViewport} 
            variants={motionVariants.sectionVariants}
            className={className}
            style={style}
        >
            {children}
        </motion.section>
    );
}
