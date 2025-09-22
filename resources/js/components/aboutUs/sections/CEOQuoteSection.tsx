import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Props du composant CEOQuoteSection
 */
interface CEOQuoteSectionProps {
    /** URL de la photo du CEO (optionnel) */
    ceoImage?: string;
    /** Nom du CEO (optionnel) */
    ceoName?: string;
    /** Titre/Poste du CEO (optionnel) */
    ceoTitle?: string;
    /** Citation du CEO (optionnel) */
    quote?: string;
    /** Nom de l'entreprise (optionnel) */
    companyName?: string;
}

/**
 * Composant de la section citation du directeur général
 *
 * @component
 * @description Section présentant une citation inspirante du CEO avec sa photo.
 * Layout responsive en deux colonnes avec citation mise en valeur et profil du dirigeant.
 */
export default function CEOQuoteSection({
    ceoImage = 'assets/images/teams/02.png',
    ceoName = 'CEO',
    ceoTitle = 'Alexis NANA',
    quote = "Dans l'économie numérique, la confiance se construit par la qualité. Et la qualité commence par les tests.",
    companyName = 'CEO TestPro',
    // CONSULTANT SÉNIOR TESTING EXPERT TOSCA
}: CEOQuoteSectionProps) {
    return (
        <MotionSection>
            <div className="">
                <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    {/* Contenu de la citation */}
                    <motion.div
                        className="mt-[40px] text-center text-gray-500 italic dark:text-gray-400"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Layout responsive */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
                            {/* Section Citation - 3/5 de l'espace */}
                            <div className="col-span-1 md:col-span-3">
                                <div className="flex items-center h-full">
                                    <div>
                                        {/* Citation mise en évidence */}
                                        <blockquote className="leading-relaxed text-xl md:text-2xl lg:text-3xl font-medium">« {quote} »</blockquote>
                                    </div>
                                </div>
                            </div>

                            {/* Section Profil CEO - 2/5 de l'espace */}
                            <div className="col-span-1 md:col-span-2 text-center">
                                {/* Photo du CEO */}
                                <img src={ceoImage} alt={`Photo de ${ceoName}`} className="mx-auto h-52 w-52  rounded-full object-cover shadow-lg" />

                                {/* Informations du CEO */}
                                <p className="mt-4 font-semibold text-lg">{ceoTitle}</p>
                                <p className="text-gray-600 dark:text-gray-400">{companyName}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Éléments décoratifs désactivés mais conservés pour référence */}
                    {false && (
                        <>
                            {/* Forme décorative 1 */}
                            <motion.div
                                className="absolute -top-[60px] -z-[1] blur-[150px] ltr:left-[65px] rtl:right-[65px]"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1 }}
                            >
                                <img src="assets/images/front-pages/shape1.png" alt="shape1" width={530} height={530} />
                            </motion.div>

                            {/* Forme décorative 2 */}
                            <motion.div
                                className="absolute -bottom-[30px] -z-[1] blur-[125px] ltr:right-[20px] rtl:left-[20px]"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 1 }}
                            >
                                <img src="assets/images/front-pages/shape2.png" alt="shape2" width={447} height={453} />
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </MotionSection>
    );
}
