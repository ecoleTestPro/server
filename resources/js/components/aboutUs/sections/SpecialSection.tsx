import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Props du composant SpecialSection
 */
interface SpecialSectionProps {
    /** Variants d'animation pour les images */
    imageVariants?: any;
}

/**
 * Composant de la section "Ce qui nous rend spécial"
 * 
 * @component
 * @description Section présentant les spécificités et avantages de TestPro.
 * Layout en deux colonnes avec image rotée et texte explicatif.
 */
export default function SpecialSection({ imageVariants }: SpecialSectionProps) {
    return (
        <MotionSection>
            <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                    {/* Layout deux colonnes */}
                    <motion.div
                        className="grid grid-cols-1 items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Section Image avec rotation */}
                        <div className="relative">
                            <motion.div
                                className="rounded-xl border border-gray/[0.1] bg-white/[0.54] p-4 md:p-6 backdrop-blur-[5.4px] shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-black/[0.1] dark:bg-black/[0.54] rotate-2"
                                variants={imageVariants}
                            >
                                <img
                                    src="assets/images/pexels-rdne-8124210.jpg"
                                    className="inline-block h-auto w-full rounded-lg object-cover"
                                    alt="Équipe travaillant ensemble"
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
                            {/* Titre de la section */}
                            <motion.div
                                className="mb-[40px] text-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center lg:text-left">
                                    Qu'est-ce qui nous rend spécial ?
                                </h2>
                            </motion.div>
                            
                            {/* Description des spécificités */}
                            <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                TestPro allie excellence pédagogique, reconnaissance officielle et impact concret. Centre d'examen certifié GASQ
                                et organisme habilité par le FDFP, nous proposons des formations rigoureuses, pratiques et orientées projet,
                                portées par des formateurs internationaux certifiés. Nos programmes sur mesure, basés sur des méthodologies
                                éprouvées et des outils modernes, assurent une montée en compétences rapide et un taux d'employabilité de 100%.
                                Grâce à notre accompagnement personnalisé et à notre travail en synergie avec vos équipes, chaque formation
                                devient un levier stratégique pour vos projets. Avec TestPro, la formation devient un levier stratégique.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}