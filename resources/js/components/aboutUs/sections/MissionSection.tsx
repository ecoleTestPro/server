import { CLASS_NAME } from '@/data/styles/style.constant';
import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Composant de la section Mission de l'entreprise
 * 
 * @component
 * @description Section centrée présentant la mission principale de TestPro.
 * Mise en page simple avec titre et description sur fond gris.
 */
export default function MissionSection() {
    return (
        <MotionSection
            className={`body-font ${CLASS_NAME.bgGray}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                    {/* Contenu de la mission centré */}
                    <motion.div
                        className="text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Titre de la section */}
                        <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                            Notre Mission
                        </h2>
                        
                        {/* Description de la mission */}
                        <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
                            Accompagner les professionnels et les entreprises dans leur montée en compétences, en proposant des formations
                            certifiantes, sur-mesure et alignées sur les standards internationaux. Garantir que chaque projet digital repose sur
                            des fondations solides, validées et mesurables. Grâce à une approche rigoureuse, des outils éprouvés et une pédagogie
                            adaptée aux réalités du terrain, TestPro transforme les enjeux de qualité en leviers de performance durable.
                        </p>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}