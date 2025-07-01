import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import TitleBadgeOne from '@/components/ui/badge-one';
import PrevNextPage, { IPrevNextPage } from '@/components/ui/prev-next-page';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { motionVariants } from '@/utils/motion.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const feature: { title: string; description: string; image: string }[] = [
    {
        title: 'Réduction des coûts',
        description: 'Réduisez les coûts opérationnels en externalisant vos tests à nos experts, sans compromettre la qualité.',
        image: '/assets/images/services/cost-efficiency.png',
    },
    {
        title: 'Accès à l’expertise',
        description: 'Bénéficiez de l’expertise de nos testeurs certifiés pour garantir des résultats fiables et précis.',
        image: '/assets/images/services/access-expertise.png',
    },
    {
        title: 'Évolutivité',
        description: 'Adaptez facilement vos besoins de test en fonction de la taille et de la complexité de vos projets.',
        image: '/assets/images/services/scalability.png',
    },
];

export default function ServiceIntegrationSpecialists() {
    const { auth, data } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const pageTitle = t('PAGES.SERVICES.INTEGRATION_SPECIALISTS', 'Intégration de Spécialistes dans Vos Locaux');

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: pageTitle, href: '#' },
    ];

    const prevNextPage: IPrevNextPage = {
        prev: {
            title: 'Services d’Externalisation des Tests',
            href: ROUTE_MAP.public.services.testSerivces.testOutsourcingServices.link,
            description: 'Découvrez les formations disponibles dès maintenant',
        },
        next: {
            title: pageTitle,
            href: '#',
        },
    };

    const BlockOne = () => {
        return (
            <motion.section
                className={`${CLASS_NAME.bgDefault} p-[20px] md:p-[30px] lg:p-[40px] xl:p-[60px]`}
                style={{
                    backgroundImage: 'url(/assets/images/pattern-15.png)',
                    backgroundSize: 'cover',
                }}
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
                                        src="/assets/images/pexels-shkrabaanthony-5466250.jpg"
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
                                    <TitleBadgeOne title={t('PAGES.SERVICES.TESTING', 'Assistance Technique Régie')} />
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Centre de Ressources ATR</h2>
                                </motion.div>

                                <p className="!mb-[15px] leading-[1.5]">
                                    Mettre à votre disposition une équipe dédiée avec une gestion des ressources groupée en mode régie, comprenant des
                                    engagements de moyens.
                                </p>

                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 mb-6">
                                        Centre de Ressources ATR : Une Solution Clé en Main pour la Gestion de vos Équipes Techniques
                                    </h1>

                                    <p className="text-lg text-gray-700 mb-8">
                                        Dans un environnement informatique de plus en plus complexe et exigeant, la gestion des ressources techniques
                                        peut devenir un véritable défi pour les organisations. C’est ici que le{' '}
                                        <strong>Centre de Ressources ATR (Affectation Temps Réel)</strong> s’affirme comme une réponse efficace et
                                        flexible pour répondre aux besoins variés en personnel technique spécialisé.
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <Link
                                        href={ROUTE_MAP.public.contact.link}
                                        className="mt-[20px] inline-block px-[15px] py-[10px] text-green-500 hover:underline"
                                    >
                                        {t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Contactez-nous pour en savoir plus')}
                                    </Link>

                                    {/* <BtnSecondary label={t('PAGES.SERVICES.SERVICE_INTEGRATION_SPECIALISTS', 'Plus de détails')} /> */}
                                </div>
                            </motion.div>

                            <div className="col-span-1 lg:col-span-2">
                                <section className="mb-10">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Qu’est-ce qu’un Centre de Ressources ATR ?</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Le Centre de Ressources ATR est une <strong>solution de mise à disposition de collaborateurs experts</strong>,
                                        intégrés directement dans vos équipes projet. Il permet de bénéficier d’une{' '}
                                        <strong>gestion centralisée des ressources humaines techniques</strong>, tout en conservant la souplesse
                                        nécessaire pour adapter les profils et les volumes selon l’évolution de vos besoins.
                                    </p>
                                </section>

                                <section className="mb-10">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Un Mode de Fonctionnement en Régie</h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        L’un des grands avantages du Centre de Ressources ATR est son fonctionnement en <strong>mode régie</strong>.
                                        Cela signifie que :
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                        <li>
                                            Les collaborateurs mis à disposition sont <strong>intégrés à vos équipes projet</strong>, comme s'ils
                                            faisaient partie de vos effectifs internes.
                                        </li>
                                        <li>
                                            Ils travaillent quotidiennement sous votre responsabilité opérationnelle, tout en bénéficiant du{' '}
                                            <strong>management fonctionnel assuré par le prestataire</strong>.
                                        </li>
                                        <li>
                                            Le prestataire gère les aspects RH, administratifs et logistiques, vous libérant ainsi des contraintes
                                            liées à l’employeur indirect.
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed mt-4">
                                        Ce modèle offre une grande <strong>agilité</strong> tout en garantissant une{' '}
                                        <strong>qualité constante des profils</strong>.
                                    </p>
                                </section>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockTwo = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgWhite}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
            >
                <div className="pt-[40px] pb-[40px]">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <motion.div
                            className="text-center mb-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl">
                                {t('PAGES.SERVICES.BENEFITS_OUTSOURCING', 'Avantages de l’Externalisation des Tests')}
                            </h2>
                            <p className="leading-[1.5] text-gray-600 dark:text-gray-300">
                                {t(
                                    'PAGES.SERVICES.BENEFITS_OUTSOURCING_DESC',
                                    'Découvrez pourquoi externaliser vos tests peut transformer votre processus de développement.',
                                )}
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-[25px] md:grid-cols-3"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            {feature.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-[20px] rounded-[7px] bg-gray-50 shadow-2xl dark:bg-black/[0.54] border border-white/[0.1] dark:border-black/[0.1]"
                                >
                                    <h4 className="text-lg font-semibold mb-[10px]">{t(item.title, item.title)}</h4>
                                    <p className="leading-[1.5]">{t(item.description, item.description)}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockThree = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgWhite}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
            >
                <div className="pt-[40px] pb-[40px]">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <motion.div
                            className="text-center mb-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl">
                                {t('PAGES.SERVICES.TESTING_METHODOLOGY', 'Notre Méthodologie de Test')}
                            </h2>
                            <p className="leading-[1.5] text-gray-600 dark:text-gray-300">
                                {t(
                                    'PAGES.SERVICES.TESTING_METHODOLOGY_DESC',
                                    'Une approche structurée pour garantir des tests efficaces et complets.',
                                )}
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-[25px] lg:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <div className="flex flex-col justify-center">
                                <h4 className="text-lg font-semibold mb-[10px]">{t('Planning', 'Planification')}</h4>
                                <p className="leading-[1.5] mb-[15px]">
                                    {t('PAGES.SERVICES.PLANNING_DESC', 'Nous définissons des stratégies de test adaptées à vos besoins spécifiques.')}
                                </p>
                                <h4 className="text-lg font-semibold mb-[10px]">{t('Execution', 'Exécution')}</h4>
                                <p className="leading-[1.5] mb-[15px]">
                                    {t(
                                        'PAGES.SERVICES.EXECUTION_DESC',
                                        'Nos équipes réalisent des tests rigoureux pour identifier tout problème potentiel.',
                                    )}
                                </p>
                                <h4 className="text-lg font-semibold mb-[10px]">{t('Reporting', 'Rapport')}</h4>
                                <p className="leading-[1.5]">
                                    {t(
                                        'PAGES.SERVICES.REPORTING_DESC',
                                        'Recevez des rapports détaillés pour une transparence totale sur les résultats des tests.',
                                    )}
                                </p>
                            </div>
                            <div className="relative">
                                <motion.div className="max-w-full rounded-[7px] border border-white/[0.1] bg-white/[0.54] p-[15px] backdrop-blur-[5.4px] md:p-[25px] xl:py-[27px] dark:border-black/[0.1] dark:bg-black/[0.54]">
                                    <img
                                        src="/assets/images/pexels-pixabay-270360.jpg"
                                        className="inline-block h-auto w-full"
                                        alt="methodology-image"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockFour = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgWhite}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
            >
                <div className="pt-[40px] pb-[40px]">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <motion.div
                            className="text-center mb-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl">{t('PAGES.SERVICES.CASE_STUDIES', 'Études de Cas')}</h2>
                            <p className="leading-[1.5] text-gray-600 dark:text-gray-300">
                                {t(
                                    'PAGES.SERVICES.CASE_STUDIES_DESC',
                                    'Découvrez comment nous avons aidé nos clients à réussir grâce à nos services de test.',
                                )}
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-[25px] md:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={motionVariants.sectionVariants}
                        >
                            <div className="p-[20px] rounded-[7px] bg-white/[0.54] dark:bg-black/[0.54] border border-white/[0.1] dark:border-black/[0.1]">
                                <h4 className="text-lg font-semibold mb-[10px]">{t('Client A', 'Client A')}</h4>
                                <p className="leading-[1.5] mb-[10px]">
                                    {t(
                                        'PAGES.SERVICES.CLIENT_A_DESC',
                                        'Nous avons réduit les temps de test de 30% pour une application financière critique.',
                                    )}
                                </p>
                                <Link href={ROUTE_MAP.public.contact.link} className="text-green-500 hover:underline">
                                    {t('Learn More', 'En savoir plus')}
                                </Link>
                            </div>
                            <div className="p-[20px] rounded-[7px] bg-white/[0.54] dark:bg-black/[0.54] border border-white/[0.1] dark:border-black/[0.1]">
                                <h4 className="text-lg font-semibold mb-[10px]">{t('Client B', 'Client B')}</h4>
                                <p className="leading-[1.5] mb-[10px]">
                                    {t(
                                        'PAGES.SERVICES.CLIENT_B_DESC',
                                        'Amélioration de la qualité logicielle pour une plateforme e-commerce grâce à des tests automatisés.',
                                    )}
                                </p>
                                <Link href={ROUTE_MAP.public.contact.link} className="text-green-500 hover:underline">
                                    {t('Learn More', 'En savoir plus')}
                                </Link>
                            </div>
                        </motion.div>
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
                {/* <BlockTwo /> */}
                <PrevNextPage pages={prevNextPage} />
            </div>
        </DefaultLayout>
    );
}
