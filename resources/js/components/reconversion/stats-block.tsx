import MotionSection from '@/components/motion/MotionSection';
import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatItem {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
}

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 1.5,
                ease: 'easeOut',
                onUpdate: (latest) => setDisplay(Math.round(latest)),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="text-4xl font-bold text-primary-600 md:text-5xl">
            {prefix}
            {display}
            {suffix}
        </span>
    );
}

export default function StatsBlock() {
    const stats: StatItem[] = [
        {
            value: 20,
            prefix: '+',
            label: 'PROGRAMMES DE RECONVERSION DISPENSÉS AUPRÈS D’ORGANISMES NATIONAUX ET INTERNATIONAUX',
        },
        { value: 8000, prefix: '+', label: 'HEURES DE COURS' },
        { value: 80, prefix: '+', suffix: '%', label: 'RÉUSSITE AUX CERTIFICATIONS' },
    ];

    return (
        <MotionSection className="bg-white py-12 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">RECONVERSION MÉTIER</h2>
                <div className="grid gap-8 text-center md:grid-cols-3">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="space-y-2"
                        >
                            <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            <p className="mx-auto max-w-xs text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MotionSection>
    );
}
