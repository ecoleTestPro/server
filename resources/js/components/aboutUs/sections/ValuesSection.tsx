import { CLASS_NAME } from '@/data/styles/style.constant';
import { motion } from 'framer-motion';
import MotionSection from '../../motion/MotionSection';

/**
 * Structure d'une valeur de l'entreprise
 */
interface ValueItem {
    /** Titre de la valeur */
    title: string;
    /** Chemin vers l'icône SVG */
    svg: string;
    /** Description détaillée de la valeur */
    description: string;
}

/**
 * Props du composant ValueCard
 */
interface ValueCardProps {
    /** Données de la valeur à afficher */
    value: ValueItem;
}

/**
 * Composant pour afficher une carte de valeur individuelle
 *
 * @component
 * @description Carte présentant une valeur de l'entreprise avec icône et description.
 * Design avec fond glassmorphism et animations au survol.
 */
function ValueCard({ value }: ValueCardProps) {
    return (
        <div className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-2 text-center backdrop-blur-[5.400000095367432px] shadow-lg hover:shadow-xl transition-all duration-300 md:p-8 ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]">
            {/* En-tête avec icône et titre */}
            <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:text-left lg:justify-start">
                <div className="flex">
                    <div className="w-16 h-16 mb-4 lg:mr-4 lg:mb-0">
                        <img
                            alt={value.title}
                            loading="lazy"
                            width="64"
                            height="64"
                            decoding="async"
                            data-nimg="1"
                            className="inline-block w-full h-full object-contain"
                            src={value.svg}
                        />
                    </div>
                    <h3 className="!mb-3 !text-xl !leading-tight !font-semibold md:!text-2xl">{value.title}</h3>
                </div>
            </div>

            {/* Description de la valeur */}
            <div className="flex-1">
                <p className="leading-relaxed text-gray-600 dark:text-gray-300 text-center">{value.description}</p>
            </div>
        </div>
    );
}

/**
 * Composant de la section des valeurs de l'entreprise
 *
 * @component
 * @description Section présentant les trois valeurs principales de TestPro :
 * Excellence Pédagogique, Flexibilité et Engagement.
 * Affichage en grille responsive avec cartes stylisées.
 */
export default function ValuesSection() {
    /** Liste des valeurs de l'entreprise */
    const values: ValueItem[] = [
        {
            title: 'Excellence Pédagogique',
            svg: '/assets/images/svgs/digicomp_icon_kurse.svg',
            description:
                'Nous nous engageons à offrir des formations de haut niveau, fondées sur les meilleures pratiques et alignées avec les standards internationaux. Chaque programme est conçu pour garantir rigueur, pertinence et impact durable.',
        },
        {
            title: 'Flexibilité',
            svg: '/assets/images/svgs/digicomp_icon_trainer.svg',
            description:
                'Conscients des réalités du terrain, nous développons des parcours modulables et personnalisés, adaptés aux contraintes opérationnelles et aux ambitions spécifiques de chaque organisation.',
        },
        {
            title: 'Engagement',
            svg: '/assets/images/svgs/digicomp_icon_bewertung.svg',
            description:
                "Nous croyons fermement au pouvoir transformateur de la formation. À travers un accompagnement de qualité, nous contribuons à l'évolution des carrières et à l'épanouissement professionnel des apprenants.",
        },
    ];

    return (
        <MotionSection
            className={`body-font ${CLASS_NAME.bgGray} ${CLASS_NAME.sectionContentPaddingAlt}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="">
                <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    {/* Contenu de la section valeurs */}
                    <motion.div className="mt-[40px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        {/* Titre de la section */}
                        <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center">Nos Valeurs</h2>

                        {/* Grille des valeurs */}
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {values.map((value, index) => (
                                <ValueCard key={index} value={value} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </MotionSection>
    );
}
