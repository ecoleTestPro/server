import { CLASS_NAME } from '@/data/styles/style.constant';
import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Props du composant WelcomeSection
 */
interface WelcomeSectionProps {
    /** Variants d'animation pour les images */
    imageVariants?: any;
}

/**
 * Composant de la section de bienvenue TestPro
 *
 * @component
 * @description Section d'introduction avec image et présentation de l'entreprise TestPro.
 * Contient une image principale avec icône flottante et le texte de présentation.
 */
export default function WelcomeSection({ imageVariants }: WelcomeSectionProps) {
    return (
        <MotionSection
            className={`body-font ${CLASS_NAME.bgWhite}`}
            style={{
                backgroundImage: 'url(assets/images/pattern-15.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                    {/* Section TestPro et Image */}
                    <motion.div
                        className="grid grid-cols-1 items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Section Image avec icône flottante */}
                        <div className="relative">
                            <motion.div
                                className="rounded-xl border border-white/[0.1] bg-white/[0.54] p-4 md:p-6 backdrop-blur-[5.4px] shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-black/[0.1] dark:bg-black/[0.54]"
                                variants={imageVariants}
                            >
                                <img
                                    src="assets/images/Formation-en-ligne-.jpeg"
                                    className="inline-block h-auto w-full rounded-lg object-cover"
                                    alt="Formation en ligne TestPro"
                                />
                            </motion.div>
                            <motion.div
                                className="absolute top-1/2 -mt-[15px] max-w-[100px] md:max-w-[150px] lg:max-w-[180px] -translate-y-1/2 rounded-lg drop-shadow-xl ltr:right-2 ltr:lg:right-[30px] rtl:left-2 rtl:lg:left-[30px]"
                                variants={imageVariants}
                            >
                                <img
                                    src="assets/images/card-icon-1.png"
                                    className="animate-image-flotting inline-block h-auto w-full rounded-lg"
                                    alt="Icône certification"
                                />
                            </motion.div>
                        </div>

                        {/* Section Texte */}
                        <motion.div
                            className="flex flex-col justify-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* En-tête de bienvenue */}
                            <motion.div className="mb-[40px] text-left" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                                <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                                    Bienvenue chez TestPro, votre partenaire stratégique en transformation digitale.
                                </h2>
                            </motion.div>

                            {/* Description de l'entreprise */}
                            <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                Dans un monde où la transformation digitale redéfinit les standards de performance, l'approximation n'a plus sa place.
                                Fiabilité, sécurité et robustesse sont désormais des exigences stratégiques pour toute organisation. C'est dans cette
                                dynamique que TestPro s'impose comme un acteur de référence internationale. Spécialisé dans le test logiciel, la
                                formation certifiante et l'accompagnement sur mesure, nous aidons les entreprises à atteindre l'excellence
                                opérationnelle à chaque étape de leur évolution numérique.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}
