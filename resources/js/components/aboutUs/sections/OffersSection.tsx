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
 * Design avec fond coloré personnalisable et effet glassmorphism.
 */
function OfferCard({ offer }: OfferCardProps) {
    return (
        <div
            className={`rounded-xl bg-white/[.54] p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:text-white ${offer.bgColor || 'bg-white dark:bg-[#15203c]'}`}
        >
            {/* Titre cliquable */}
            <a href={offer.ctaLink || '#'} className="text-primary-600 font-bold hover:underline text-lg md:text-xl">
                {offer.title}
            </a>
            {/* Description de l'offre */}
            <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{offer.description}</p>
        </div>
    );
}

/**
 * Composant de la section des offres de services
 *
 * @component
 * @description Section présentant les différentes offres de TestPro avec description générale
 * et citation inspirante. Layout en deux colonnes avec texte d'introduction et cartes d'offres.
 */
export default function OffersSection() {
    /** Liste des offres de services */
    const offers: OfferItem[] = [
        {
            title: 'Formations certifiantes sur-Mesure',
            description: 'Validez vos compétences et gagnez en avantage compétitif.',
            bgColor: 'bg-primary-100',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
        {
            title: 'Reconversion professionnelle',
            description:
                'Programme dédié aux particuliers souhaitant se reconvertir dans le domaine du test logiciel, avec un accompagnement complet vers les métiers de testeur manuel ou testeur en automatisation.',
            bgColor: 'bg-primary-200',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
        {
            title: 'Audit de maturité de test',
            description:
                "Évaluation approfondie des processus de test au sein de l'entreprise pour identifier les axes d'amélioration et optimiser les performances",
            bgColor: 'bg-primary-200',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
        {
            title: 'Conseils stratégiques',
            description: "Accompagnement stratégique pour la mise en place et l'optimisation des processus de test au sein des organisations.",
            bgColor: 'bg-primary-400',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
        {
            title: 'Tierce recette applicative',
            description:
                "Services d'externalisation des tests permettant aux entreprises de confier tout ou partie de leurs activités de test à des experts dédiés.",
            bgColor: 'bg-primary-400',
            ctaLink: ROUTE_MAP.public.courses.list.link,
        },
    ];

    return (
        <MotionSection>
            <div className="">
                <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <motion.div className="mt-[40px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {/* Titre de la section */}
                        <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">Nos Offres</h2>

                        {/* Layout deux colonnes */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                            {/* Colonne de gauche - Description générale */}
                            <div className="col-span-2 my-auto lg:col-span-1 h-fit">
                                {/* Paragraphe d'introduction */}
                                <p className="mt-4 text-justify leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    TestPro propose une offre intégrée de formations certifiantes et de services stratégiques, pensée pour accompagner
                                    les professionnels du digital à chaque étape de leur évolution. En combinant certifications internationales,
                                    audit, conseil opérationnel, parcours de reconversion et optimisation des processus qualité, TestPro crée une
                                    synergie unique entre montée en compétences, structuration des équipes et performance durable.
                                </p>

                                {/* Paragraphe des bénéfices */}
                                <p className="mt-4 text-justify leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    Le bénéfice pour votre entreprise est un accompagnement sur mesure, des résultats concrets et une expertise
                                    immédiatement applicable pour relever les défis du marché avec confiance et agilité.
                                </p>

                                {/* Citation inspirante */}
                                <blockquote className="leading-relaxed font-medium py-[8vh] italic">
                                    Nous ne formons pas seulement des professionnels : nous bâtissons la confiance numérique, un test à la fois.
                                </blockquote>
                            </div>

                            {/* Colonne de droite - Cartes d'offres */}
                            <div className="col-span-2 lg:col-span-1">
                                <div className="space-y-4">
                                    {offers.map((offer, index) => (
                                        <OfferCard key={index} offer={offer} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}
