import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import TitleBadgeOne from '@/components/ui/badge-one';
import CardOne, { StaticFeatureItem } from '@/components/ui/card/card-one';
import PrevNextPage, { IPrevNextPage } from '@/components/ui/prev-next-page';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { motionVariants } from '@/utils/motion.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const tests: StaticFeatureItem[] = [
    {
        title: 'Processus de Test TMMi, TPI Next ',
        description:
            'Évaluer la maturité de test de l’organisation Homogénéiser les pratiques de test Optimiser les coûts et améliorer le TTM Professionnaliser le métier de test',
        bgColor: 'bg-primary-100',
        image: '/assets/images/svgs/code.svg',
    },
    {
        title: 'Outils de Test Management, Automatisation',
        description:
            'Évaluer l’efficacité et l’efficience des outils existants Benchmark avec les outils du marché Optimiser les ressources d’exploitation Améliorer le ROI',
        bgColor: 'bg-primary-200',
        image: '/assets/images/svgs/stacks.svg',
    },
    {
        title: 'Automatisation de Test Architecture, Solutions',
        description:
            'Évaluer la maintenabilité des scripts de test Améliorer la compatibilité des TAF avec le S.I. Assurer la conformité aux standards et bonnes pratiques Optimiser les ressources',
        bgColor: 'bg-primary-200',
        image: '/assets/images/svgs/stacks.svg',
    },
];

export default function ConsultingAudit() {
    const { auth, data } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Audit de maturité de test'), href: '#' },
    ];

    const prevNextPage: IPrevNextPage = {
        prev: {
            title: t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Consulting Audit'),
            href: '#',
            description: 'Découvrez les formations disponibles dès maintenant',
        },
        next: {
            title: t('PAGES.CONSULTING.CONSULTING-TESTING', 'Conseil Testing'),
            href: ROUTE_MAP.consultingTesting.link,
        },
    };

    const BlockOne = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgWhite}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
            >
                <div className="pt-[40px] pb-[10px]">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        {/* Section TestPro et Image */}
                        <motion.div
                            className="grid grid-cols-1 items-center gap-[25px] lg:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <div className="relative">
                                <motion.div
                                    className="max-w-full rounded-[7px] border border-white/[0.1] bg-white/[0.54] p-[15px] backdrop-blur-[5.4px] md:p-[25px] xl:py-[27px] dark:border-black/[0.1] dark:bg-black/[0.54]"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="/assets/images/pexels-thirdman-5319357.jpg"
                                        className="inline-block h-auto w-full"
                                        alt="order-summary-image"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                className="flex flex-col justify-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={motionVariants.sectionVariants}
                            >
                                {/* Section Bienvenue */}
                                <motion.div
                                    className="mb-[40px] text-left"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={motionVariants.sectionVariants}
                                >
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Processus de Test TMMi, TPI Next</h2>
                                    <h4 className="!mb-[15px]">
                                        Nous associons notre Expertise, nos programmes de Certification et notre approche Pratique pour garantir une
                                        qualité irréprochable de nos services
                                    </h4>
                                </motion.div>

                                <p className="!mb-[15px] leading-[1.5]">
                                    Nous nous engageons à optimiser les processus de test logiciel pour assurer des performances fiables et une
                                    qualité supérieure des produits. Grâce à des méthodologies éprouvées comme TMMi et TPI Next, nous aidons les
                                    entreprises à structurer leurs pratiques de test.
                                </p>
                                <p className="!mb-[15px] leading-[1.5]">
                                    Nos programmes de formation certifiants sont conçus pour doter les professionnels des compétences nécessaires pour
                                    exceller dans l’industrie technologique. Nous mettons l’accent sur une approche pratique, avec des projets
                                    concrets pour renforcer l’expertise.
                                </p>
                                <p className="!mb-[15px] leading-[1.5]">
                                    En collaborant avec nos clients, nous proposons des solutions d’externalisation sur mesure, adaptées à leurs
                                    besoins spécifiques. Notre objectif est d’accélérer la mise sur le marché tout en maintenant des standards élevés
                                    d’innovation et de fiabilité.
                                </p>

                                <Link
                                    href={ROUTE_MAP.contact.link}
                                    className="mt-[20px] inline-block px-[15px] py-[10px] text-green-500 hover:underline"
                                >
                                    {t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Contactez-nous pour en savoir plus')}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockTwo = () => {
        return (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={motionVariants.sectionVariants}>
                <div className="pt-[40px] pb-[40px]">
                    <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <div className="mx-auto mb-[5vh] text-center md:max-w-[650px] lg:max-w-[810px] xl:max-w-[785px]">
                            <TitleBadgeOne title="Solutions" />
                            <h2 className="!mb-0 !text-[24px] !leading-[1.2] -tracking-[.5px] md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                                Nos Solutions de Test
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-3">
                            {tests.map((feature, index) => (
                                <div className="col-span1 md:col-span-1 lg:col-span-1 xl:col-span-1" key={index}>
                                    <CardOne key={index} feature={feature} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    };

    return (
        <DefaultLayout title={t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Audit de maturité de test')}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Audit de maturité de test')}
                    description={t('PAGES.CONSULTING.CONSULTING-AUDIT_DESCRIPTION', 'Nos Solutions de Test')}
                    breadcrumbItems={breadcrumbItems}
                />

                <BlockOne />

                <BlockTwo />

                <PrevNextPage pages={prevNextPage} />
            </div>
        </DefaultLayout>
    );
}
