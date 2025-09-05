import { ROUTE_MAP } from '@/utils/route.util';
import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Structure d'une offre de service
 */
interface OfferItem {
    /** Titre de l'offre */
    title: string;
    /** Description de l'offre */
    description: string;
    /** Couleur de fond CSS (optionnel) */
    bgColor?: string;
    /** Lien vers la page de l'offre (optionnel) */
    ctaLink?: string;
}

/**
 * Props du composant OfferCard
 */
interface OfferCardProps {
    /** Données de l'offre à afficher */
    offer: OfferItem;
}

/**
 * Composant pour afficher une carte d'offre individuelle
 *
 * @component
 * @description Carte présentant une offre de service avec titre cliquable et description.
 * Design moderne avec animations, effets de survol et gradient subtil.
 */
function OfferCard({ offer }: OfferCardProps) {
    return (
        <motion.div
            className={`group relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 dark:text-white ${offer.bgColor || 'bg-white/80 dark:bg-gray-800/80'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.3, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Effet de gradient animé au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 via-transparent to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Contenu de la carte */}
            <div className="relative p-6 md:p-8">
                {/* Titre cliquable avec animation */}
                <motion.a
                    href={offer.ctaLink || '#'}
                    className="block text-primary-600 dark:text-primary-400 font-bold text-xl md:text-2xl leading-tight group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                >
                    {offer.title}
                    <motion.span
                        className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                    >
                        →
                    </motion.span>
                </motion.a>

                {/* Description avec animation d'apparition décalée */}
                <motion.p
                    className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {offer.description}
                </motion.p>
            </div>

            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 -left-4 w-2 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
            </div>
        </motion.div>
    );
}

/**
 * Composant de la section des offres de services
 *
 * @component
 * @description Section présentant les différentes offres de TestPro avec animations modernes,
 * design glassmorphism et interactions fluides. Layout responsive optimisé.
 */
export default function OffersSection() {
    /** Liste des offres de services avec couleurs gradient améliorées et liens spécifiques */
    const offers: OfferItem[] = [
        {
            title: 'Formations certifiantes sur-Mesure',
            description: 'Validez vos compétences et gagnez en avantage compétitif grâce à nos formations personnalisées ISTQB.',
            bgColor: 'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/30',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
        {
            title: 'Reconversion professionnelle',
            description:
                'Programme complet dédié aux particuliers souhaitant se reconvertir dans le domaine du test logiciel, avec accompagnement vers les métiers de testeur manuel ou automatisation.',
            bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30',
            ctaLink: ROUTE_MAP.public.services.testSerivces.index.link,
        },
        {
            title: 'Audit de maturité de test',
            description:
                "Évaluation approfondie des processus de test au sein de votre entreprise pour identifier les axes d'amélioration et optimiser les performances qualité.",
            bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/30',
            ctaLink: ROUTE_MAP.public.services.testSerivces.index.link,
        },
        {
            title: 'Conseils stratégiques',
            description:
                "Accompagnement expert pour la mise en place et l'optimisation des processus de test au sein de votre organisation avec une approche sur-mesure.",
            bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30',
            ctaLink: ROUTE_MAP.public.services.testSerivces.index.link,
        },
        {
            title: 'Tierce recette applicative',
            description:
                "Services d'externalisation des tests permettant aux entreprises de confier leurs activités de validation à nos experts dédiés avec garantie de qualité.",
            bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30',
            ctaLink: ROUTE_MAP.public.services.testSerivces.index.link,
        },
    ];

    /** Variants d'animation pour le conteneur */
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    return (
        <MotionSection className="relative overflow-hidden">
            {/* Arrière-plan décoratif avec gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-primary-50/20 dark:from-gray-900/20 dark:to-primary-900/10" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                    <motion.div className="py-16 lg:py-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {/* Titre de la section avec animation */}
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-primary-600 dark:from-white dark:via-primary-200 dark:to-primary-400 bg-clip-text text-transparent leading-tight">
                                Nos Offres
                            </h2>
                            <motion.div
                                className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto mt-6 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: 96 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            />
                        </motion.div>

                        {/* Layout amélioré avec espacement optimisé */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
                            {/* Colonne de gauche - Description générale */}
                            <motion.div
                                className="lg:col-span-5 space-y-8"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                {/* Conteneur avec fond glassmorphism */}
                                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/20 shadow-xl">
                                    {/* Paragraphe d'introduction */}
                                    <motion.p
                                        className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        TestPro propose une{' '}
                                        <span className="font-semibold text-primary-600 dark:text-primary-400">offre intégrée</span> de formations
                                        certifiantes et de services stratégiques, pensée pour accompagner les professionnels du digital à chaque étape
                                        de leur évolution.
                                    </motion.p>

                                    {/* Paragraphe des bénéfices */}
                                    <motion.p
                                        className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                    >
                                        Le bénéfice pour votre entreprise : un{' '}
                                        <span className="font-semibold text-primary-600 dark:text-primary-400">accompagnement sur mesure</span>, des
                                        résultats concrets et une expertise immédiatement applicable.
                                    </motion.p>

                                    {/* Citation inspirante améliorée */}
                                    <motion.blockquote
                                        className="relative text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 italic"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                    >
                                        <div className="absolute -left-4 top-0 text-6xl text-primary-200 dark:text-primary-800 leading-none">"</div>
                                        <div className="relative z-10 pl-8">
                                            Nous ne formons pas seulement des professionnels : nous bâtissons la confiance numérique, un test à la
                                            fois.
                                        </div>
                                        <div className="absolute -right-4 bottom-0 text-6xl text-primary-200 dark:text-primary-800 leading-none">
                                            "
                                        </div>
                                    </motion.blockquote>
                                </div>
                            </motion.div>

                            {/* Colonne de droite - Cartes d'offres */}
                            <motion.div
                                className="lg:col-span-7"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <div className="space-y-6">
                                    {offers.map((offer, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.15 + 0.3,
                                                ease: 'easeOut',
                                            }}
                                        >
                                            <OfferCard offer={offer} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}
