import { motion, useAnimation, Variants } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import MotionSection from '../motion/MotionSection';

export default function ContactSuccessSubmited() {
    const checkControls = useAnimation();

    // Animation pour l'icône de succès
    useEffect(() => {
        checkControls.start({
            scale: [1, 1.2, 1],
            opacity: [0, 1],
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                times: [0, 0.5, 1],
            },
        });
    }, [checkControls]);

    // Définir les variantes avec un typage explicite
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut', // Utiliser une valeur valide de Easing
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut', // Valeur conforme à Easing'
            },
        },
    };

    // Variantes pour le bouton
    const buttonVariants: Variants = {
        hover: {
            scale: [1, 1.05],
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        tap: { scale: [0.95] },
    };

    return (
        <MotionSection>
            <motion.div
                className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-b from-gray-50 to-gray-50 dark:from-gray-800 dark:to-gray-900"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="relative flex flex-col items-center bg-white items-center dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-transform hover:-translate-y-1"
                    variants={childVariants}
                >
                    <motion.h2
                        className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4"
                        variants={childVariants}
                    >
                        Merci pour votre message !
                    </motion.h2>
                    <motion.p
                        className="text-center text-gray-600 dark:text-gray-300 mb-6"
                        variants={childVariants}
                    >
                        Votre message a été envoyé avec succès. Notre équipe vous contactera sous peu.
                    </motion.p>
                    <motion.div
                        className="mb-6"
                        variants={childVariants}
                        animate={checkControls}
                    >
                        <svg
                            className="w-16 h-16 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, ease: 'easeInOut' }}
                            />
                        </svg>
                    </motion.div>
                    <motion.div variants={childVariants}>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                        >
                            <motion.span
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Retour à l'accueil
                            </motion.span>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </MotionSection>
    );
}