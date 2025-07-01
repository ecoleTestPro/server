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
        title: 'TEST MANAGEMENT',
        description:
            'Définition des politiques et stratégies de testSupervision des programmes d’améliorationManagement des projets de testIngénierie des exigencesAccompagnement aux méthodes & outils de test',
        image: '/assets/images/svgs/code.svg',
        bgColor: 'bg-primary-100',
    },
    {
        title: 'AUTOMATISATION DE TEST',
        description:
            'Élaboration des stratégies d’automatisation des tests Automatisation des tests : fonctionnel, mobile, webservices, performance Mise en œuvre des environnements de test CI/CD Test des systèmes basés sur l’IA',
        bgColor: 'bg-primary-200',
        image: '/assets/images/svgs/stacks.svg',
    },
];

export default function ConsultingTest() {
    const { auth, data } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const pageTitle = t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Conseil Testing');

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: pageTitle, href: '#' },
    ];

    const prevNextPage: IPrevNextPage = {
        prev: {
            title: t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Consulting Audit'),
            href: ROUTE_MAP.public.services.consulting.auditOfMaturityOfTests.link,
            description: 'Découvrez les formations disponibles dès maintenant',
        },
        next: {
            title: t('PAGES.CONSULTING.CONSULTING-TESTING', 'Conseil Testing'),
            href: '#',
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
                                        src="/assets/images/pexels-rdne-10375968.jpg"
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
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Un Pilier Essentiel de la Qualité Logicielle</h2>
                                    {/* <h4 className="!mb-[15px]">Un Pilier Essentiel de la Qualité Logicielle</h4> */}
                                </motion.div>

                                <p className="!mb-[15px] leading-[1.5]">
                                    Dans un monde toujours plus connecté et dépendant des technologies numériques, la qualité des logiciels n’est plus
                                    une option — c’est une exigence impérative. C’est ici que le Test Management entre en jeu : il constitue une
                                    discipline stratégique visant à garantir la fiabilité, la performance et la conformité des solutions informatiques
                                    tout au long de leur cycle de vie
                                </p>

                                <Link
                                    href={ROUTE_MAP.public.contact.link}
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

                        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2">
                            {tests.map((feature, index) => (
                                <div className="col-span1" key={index}>
                                    <CardOne gridClass="col-span-1" key={index} feature={feature} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        );
    };

    return (
        <DefaultLayout title={pageTitle}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={pageTitle}
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
