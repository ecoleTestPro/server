import { motionVariants } from '@/utils/motion.util';
import { motion } from 'framer-motion';
import React from 'react';

interface IMotionSectionProps {
    children?: React.ReactNode;
    once?: boolean;
    amount?: number;
}

export default function MotionSection({ children, once = true, amount = 0.2 }: IMotionSectionProps) {
    return (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once, amount }} variants={motionVariants.sectionVariants}>
            {children}
        </motion.section>
    );
}
