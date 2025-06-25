import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { motionVariants } from '@/utils/motion.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Feature {
    img: string;
    alt: string;
    title: string;
    description: string;
    link: string;
    linkLabel: string;
}

const features: Feature[] = [
    {
        img: 'https://a.storyblok.com/f/92421/2500x2500/21ec0f6878/leaderboard_intelligence-artificielle_encart.jpg',
        alt: 'AI',
        title: 'Intelligence Artificielle (IA)',
        description:
            "Déterminez les enjeux spécifiques auxquels votre entreprise fait face et explorez comment l'IA et son fort potentiel peut vous apporter des solutions concrètes. Nous vous accompagnons dans l'acquisition des compétences IA indispensables pour prospérer votre avenir numérique.",
        link: '#',
        linkLabel: 'Découvrir notre offre',
    },
    {
        img: 'https://a.storyblok.com/f/92421/600x313/ea4d4b1d84/homepage_dasr_microsoft.jpg',
        alt: 'Microsoft',
        title: 'Nous vous formons aux technologies Microsoft',
        description: 'Que ce soit pour un cours Microsoft officiel ou un logiciel spécifique, découvrez notre offre complète.',
        link: '#',
        linkLabel: 'Découvrir',
    },
    {
        img: '',
        alt: '',
        title: 'Formations Adobe',
        description:
            'Création graphique, montage vidéo, photographie, ... Nous vous formons aux logiciels de création de la suite Adobe Creative Cloud.',
        link: '#',
        linkLabel: 'Découvrir nos formations',
    },
    {
        img: '',
        alt: '',
        title: 'ITIL® : le framework par excellence pour les services IT',
        description:
            "Apprenez les bonnes pratiques afin d'atteindre une synergie optimale entre vos projets IT et une valeur ajoutée conséquente pour votre business.",
        link: '#',
        linkLabel: 'Découvrir',
    },
    {
        img: '',
        alt: '',
        title: 'Cybersécurité et protection des données',
        description:
            'Découvrez les cadres légaux, les normes et les certifications qui vous permettront de devenir expert(e) de la cybersécurité et de la protection des données.',
        link: '#',
        linkLabel: 'Découvrir',
    },
];

function FeaturesSection() {
    const { auth, data } = usePage<SharedData>().props;

    const [featureCourses, setFeatureCourses] = useState<Feature[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setFeatureCourses([]);
        setError(null);

        console.log('[FeaturesSection] data', data);

        if (data && data.featured_courses && data.featured_courses.length > 0) {
            let features: Feature[] = data.featured_courses.map((course: ICourse) => buildFeatureItem(course));
            setFeatureCourses(features);
        }

        setLoading(false);
    }, [data]);

    const buildFeatureItem = (course: ICourse): Feature => {
        return {
            img: course.image || 'https://placehold.co/512x512',
            alt: course.title || 'Featured Course',
            title: course.title || 'Titre du cours',
            description: course.excerpt,
            link: ROUTE_MAP.courseDetail(course.category?.slug || '', course.slug).link, // Assuming the link is to the course detail page
            linkLabel: 'Voir le cours',
        };
    };

    /**
     *  Styles for the grid layout of the feature courses.
     *  The first element takes 2/3 of the width and spans 2 rows,
     *  the second element takes 1/3 of the width and spans 2 rows,
     *  and the remaining elements take 1/3 of the width and span 1 row each.
     */
    const gridStyles = [
        'col-span-2 row-span-2', // 1er élément : 2/3 largeur, 2 lignes
        'col-span-1 row-span-2', // 2e élément : 1/3 largeur, 2 lignes
        'col-span-1 row-span-1', // 3e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 4e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 5e élément : 1/3 largeur, 1 ligne
    ];

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-float-slow">
                    <img
                        src="https://a.storyblok.com/f/92421/2500x2500/21ec0f6878/leaderboard_intelligence-artificielle_encart.jpg"
                        alt="Loading"
                        className="h-16 w-16 animate-spin"
                    />
                </div>
            </div>
        );
    }

    if (featureCourses.length === 0) {
        return null;
    }

    return (
        <div className="relative overflow-hidden">
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
                className="relative z-10 py-10 text-white md:py-20"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-end">
                        <div>
                            {/* <TitleBadgeOne title="Nos formations phares" /> */}
                            <h2 className="text-black text-2xl font-bold md:text-4xl mb-4   ">Formations Mises en avant</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {featureCourses.map((feature, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    router.visit(feature.link, { preserveState: true, preserveScroll: true });
                                }}
                                className={`flex flex-col justify-between ${gridStyles[idx] || 'col-span-1 row-span-1'} ${'relative z-10 cursor-pointer bg-white p-4 text-black transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl md:p-6 dark:text-neutral-100'}`}
                            >
                                {feature.img && (
                                    <img src={feature.img} alt={feature.alt} className="mb-2 h-12 w-12 object-cover md:mb-4 md:h-52 md:w-full" />
                                )}
                                <h3 className="mb-2 text-lg font-bold md:text-xl">{feature.title}</h3>
                                <p className="text-black-600 text-sm md:text-base dark:text-neutral-100">{feature.description}</p>
                                <Link href={feature.link} className="text-primary text-sm hover:underline md:text-base">
                                    {feature.linkLabel}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-500 opacity-50"></div>
                <div className="animate-float-slow absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-200 opacity-50"></div>
            </motion.section>
            <style>
                {`
                @keyframes floatSlow {
                    0% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(40px) scale(1.05); }
                    100% { transform: translateX(-50%) translateY(0); }
                }
                .animate-float-slow {
                    animation: floatSlow 8s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
}

export default FeaturesSection;
