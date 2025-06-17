import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface StaticFeatureItem {
    title: string;
    description: string;
    image: string;
    bgColor: string;
}

const staticFeatures: StaticFeatureItem[] = [
    {
        title: 'Processus de Test',
        description:
            'TMMi, TPI Next Évaluer la maturité de test de l’organisation Homogénéiser les pratiques de test Optimiser les coûts et améliorer le TTM Professionnaliser le métier de test',
        image: 'assets/images/svgs/code.svg',
        bgColor: 'bg-primary-100',
    },
    {
        title: 'Certification',
        description: 'Un certificat reconnu qui ouvre instantanément les portes du marché de l’emploi.',
        image: 'assets/images/svgs/stacks.svg',
        bgColor: 'bg-primary-200',
    },
    {
        title: 'Pratique',
        description: 'Apprenez par l’action : des projets concrets pour booster votre carrière et votre impact.',
        image: 'assets/images/svgs/support_agent.svg',
        bgColor: 'bg-primary-300',
    },
];

export default function PrivacyPolicyPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: t('PAGES.CONSULTING.CONSULTING-AUDIT', 'Audit de maturité de test'), href: '#' },
    ];

    const tests = [
        {
            title: 'Processus de Test',
            description:
                'TMMi, TPI Next Évaluer la maturité de test de l’organisation Homogénéiser les pratiques de test Optimiser les coûts et améliorer le TTM Professionnaliser le métier de test',
        },
    ];

    const BlockOne = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgWhite}`}
                style={{
                    backgroundImage: 'url(assets/images/pattern-15.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
                <div className="py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px]">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        {/* Section TestPro et Image */}
                        <motion.div
                            className="grid grid-cols-1 items-center gap-[25px] lg:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <div className="relative">
                                <motion.div
                                    className="rounded-[7px] border border-white/[0.1] bg-white/[0.54] p-[15px] backdrop-blur-[5.4px] md:max-w-[600px] md:p-[25px] lg:max-w-[400px] xl:max-w-[510px] xl:px-[34px] xl:py-[27px] dark:border-black/[0.1] dark:bg-black/[0.54]"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="assets/images/Formation-en-ligne-.jpeg"
                                        className="inline-block h-auto w-full"
                                        alt="order-summary-image"
                                    />
                                </motion.div>
                                <motion.div
                                    className="absolute top-1/2 -mt-[15px] max-w-[120px] -translate-y-1/2 rounded-[4.294px] drop-shadow-xl md:-mt-[17px] md:max-w-[200px] lg:max-w-[219px] ltr:right-0 ltr:lg:right-[30px] rtl:left-0 rtl:lg:left-[30px]"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="assets/images/card-icon-1.png"
                                        className="animate-image-flotting inline-block h-auto w-full rounded-[4.294px]"
                                        alt="courses-sales-image"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                className="flex flex-col justify-center"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                // variants={sectionVariants}
                            >
                                {/* Section Bienvenue */}
                                <motion.div
                                    className="mb-[40px] text-left"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    // variants={sectionVariants}
                                >
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Processus de Test TMMi, TPI Next</h2>
                                </motion.div>

                                <p className="!mb-[15px] leading-[1.5]">
                                    Notre vision est de devenir un leader reconnu dans le secteur des tests logiciels et de l'ingénierie des
                                    exigences, en garantissant la qualité et la fiabilité des solutions technologiques. Notre mission consiste à
                                    fournir des formations certifiantes de haute qualité, à proposer des testeurs professionnels pour accompagner les
                                    entreprises dans leurs projets, et à contribuer à l'externalisation efficace des services de test dans nos locaux,
                                    tout en favorisant l'innovation et l'excellence au sein de l'industrie technologique.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockTwo = () => {
        return (
            <div className="py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px]">
                <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="mx-auto mb-[35px] text-center md:mb-[50px] md:max-w-[650px] lg:mb-[65px] lg:max-w-[810px] xl:mb-[90px] xl:max-w-[785px]">
                        <div className="relative mt-[10px] mb-[20px] inline-block">
                            <span className="bg-primary-600 absolute top-[4.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-left-[3.6px] rtl:-right-[3.6px]"></span>
                            <span className="bg-primary-600 absolute -top-[9.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:right-0 rtl:left-0"></span>
                            <span className="border-primary-600 text-primary-600 relative inline-block -rotate-[6.536deg] border px-[17.2px] py-[5.5px]">
                                Key Features
                                <span className="bg-primary-600 absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-left-[3.5px] rtl:-right-[3.5px]"></span>
                                <span className="bg-primary-600 absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] ltr:-right-[3.5px] rtl:-left-[3.5px]"></span>
                            </span>
                        </div>
                        <h2 className="!mb-0 !text-[24px] !leading-[1.2] -tracking-[.5px] md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                            Nous associons notre Expertise, nos programmes de Certification et notre approche Pratique pour garantir une qualité
                            irréprochable de nos services
                            {false &&
                                ' assurant ainsi la satisfaction de nos clients et partenaires, tout en adoptant et en développant des méthodologies innovantes.'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
                        {tests.map((feature, index) => (
                            <div
                                key={index}
                                className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-[15px] text-center backdrop-blur-[5.400000095367432px] md:p-[25px] lg:p-[30px] ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]"
                            >
                                <div
                                    className={`mx-auto mb-[20px] flex h-[80px] w-[80px] items-center justify-center rounded-[10px] md:h-[85px] md:w-[85px] md:rounded-[17px] lg:mx-0 lg:mb-[22px] bg-primary-100`}
                                >
                                    <img
                                        alt="Real-Time Updates"
                                        loading="lazy"
                                        width="50"
                                        height="50"
                                        decoding="async"
                                        data-nimg="1"
                                        className="inline-block"
                                        src={"assets/images/svgs/code.svg"}
                                    />
                                </div>

                                <h3 className="!mb-[10px] !text-lg !leading-[1.2] !font-semibold md:!mb-[12px] md:!text-[20px] lg:!text-[22px] xl:!mb-[13px] xl:!text-[24px]">
                                    {feature.title}
                                </h3>

                                <p className="leading-[1.6] xl:max-w-[375px]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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
            </div>
        </DefaultLayout>
    );
}
