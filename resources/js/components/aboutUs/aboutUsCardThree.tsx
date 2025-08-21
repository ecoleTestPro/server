import { CLASS_NAME } from '@/data/styles/style.constant';
import { ROUTE_MAP } from '@/utils/route.util';
import { motion } from 'framer-motion';
import MotionSection from '../motion/MotionSection';

function AboutUsCardThree() {
    // Variants pour les animations
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const BlockAbout = () => {
        return (
            <MotionSection
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
                <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                    <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                        {/* Section TestPro et Image */}
                        <motion.div
                            className="grid grid-cols-1 items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <div className="relative">
                                <motion.div
                                    className="rounded-xl border border-white/[0.1] bg-white/[0.54] p-4 md:p-6 backdrop-blur-[5.4px] shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-black/[0.1] dark:bg-black/[0.54]"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="assets/images/Formation-en-ligne-.jpeg"
                                        className="inline-block h-auto w-full rounded-lg object-cover"
                                        alt="Formation en ligne TestPro"
                                    />
                                </motion.div>
                                <motion.div
                                    className="absolute top-1/2 -mt-[15px] max-w-[100px] md:max-w-[150px] lg:max-w-[180px] -translate-y-1/2 rounded-lg drop-shadow-xl ltr:right-2 ltr:lg:right-[30px] rtl:left-2 rtl:lg:left-[30px]"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="assets/images/card-icon-1.png"
                                        className="animate-image-flotting inline-block h-auto w-full rounded-lg"
                                        alt="Icône certification"
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
                                    <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                                        Bienvenue chez TestPro, votre partenaire dans le développement professionnel et la réussite éducative.
                                    </h2>
                                </motion.div>

                                <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
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
            </MotionSection>
        );
    };

    const BlockOurMission = () => {
        return (
            <MotionSection
                className={`body-font ${CLASS_NAME.bgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
                <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                    <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                        {/* Section Notre Mission */}
                        <motion.div
                            className="text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">Notre Mission</h2>
                            <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg max-w-4xl mx-auto">
                                Nous nous engageons à offrir des formations certifiantes et sur-mesure, adaptées aux besoins individuels et
                                professionnels de nos apprenants. Que vous soyez un professionnel en quête de reconversion ou une entreprise désireuse
                                de former vos équipes, nous proposons des solutions pédagogiques innovantes et alignées sur les dernières tendances du
                                secteur.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </MotionSection>
        );
    };

    const BlockWhatMakesUsSpecial = () => {
        return (
            <MotionSection>
                <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                    <div className="relative z-[1] container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                        {/* Section TestPro et Image */}
                        <motion.div
                            className="grid grid-cols-1 items-center gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <div className="relative">
                                <motion.div
                                    className="rounded-xl border border-gray/[0.1] bg-white/[0.54] p-4 md:p-6 backdrop-blur-[5.4px] shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-black/[0.1] dark:bg-black/[0.54] rotate-2"
                                    // variants={imageVariants}
                                >
                                    <img
                                        src="assets/images/pexels-rdne-8124210.jpg"
                                        className="inline-block h-auto w-full rounded-lg object-cover"
                                        alt="Équipe travaillant ensemble"
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
                                    className="mb-[40px] text-center"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    // variants={sectionVariants}
                                >
                                    <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center lg:text-left">Qu'est-ce qui nous rend spécial ?</h2>
                                </motion.div>
                                <p className="!mb-6 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    Chez TestPro, nous plaçons vos besoins au cœur de nos formations pour offrir des programmes innovants, pratiques
                                    et directement applicables. Grâce à une équipe d'experts qualifiés, nous proposons des solutions flexibles et
                                    sur-mesure adaptées à vos ambitions professionnelles. Nos contenus actualisés et alignés sur les tendances du
                                    marché vous garantissent des compétences concrètes et un impact mesurable. Nous assurons un accompagnement
                                    personnalisé avant, pendant et après la formation pour maximiser vos résultats. Avec TestPro, transformez votre
                                    carrière et ouvrez-vous à de nouvelles opportunités.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </MotionSection>
        );
    };

    const BlockOurValues = () => {
        const values: {
            title: string;
            svg: string;
            description: string;
        }[] = [
            {
                title: 'Excellence Pédagogique',
                svg: '/assets/images/svgs/digicomp_icon_kurse.svg',
                description: 'Nous privilégions une approche basée sur les meilleures pratiques et les standards  internationaux.',
            },
            {
                title: 'Flexibilité',
                svg: '/assets/images/svgs/digicomp_icon_trainer.svg',
                description: 'Nos programmes sont conçus pour s’adapter à vos contraintes et objectifs spécifiques.',
            },
            {
                title: 'Engagement',
                svg: '/assets/images/svgs/digicomp_icon_bewertung.svg',
                description: 'Nous croyons au pouvoir de l’éducation pour transformer les carrières et les vies.',
            },
        ];

        return (
            <MotionSection
                className={`body-font ${CLASS_NAME.bgGray} ${CLASS_NAME.sectionContentPadding}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
                <div className="">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        {/* Section Nos Valeurs */}
                        <motion.div
                            className="mt-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">Nos Valeurs</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {values.map((v, index) => (
                                    <div
                                        key={index}
                                        className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-6 text-center backdrop-blur-[5.400000095367432px] shadow-lg hover:shadow-xl transition-all duration-300 md:p-8 ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]"
                                    >
                                        <div className={`flex flex-col items-center justify-center text-center lg:flex-row lg:text-left lg:justify-start`}>
                                            <div className="w-16 h-16 mb-4 lg:mr-4 lg:mb-0">
                                                <img
                                                    alt={v.title}
                                                    loading="lazy"
                                                    width="64"
                                                    height="64"
                                                    decoding="async"
                                                    data-nimg="1"
                                                    className="inline-block w-full h-full object-contain"
                                                    src={v.svg}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="!mb-3 !text-xl !leading-tight !font-semibold md:!text-2xl">
                                                    {v.title}
                                                </h3>
                                                <p className="leading-relaxed text-gray-600 dark:text-gray-300">{v.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MotionSection>
        );
    };

    const BlockWhatWeOffer = () => {
        const offer: { title: string; description: string; bgColor?: string; ctaLink?: string }[] = [
            {
                title: 'Formations Certifiantes',
                description: 'Validez vos compétences et gagnez un avantage compétitif.',
                bgColor: 'bg-primary-100',
                ctaLink: ROUTE_MAP.public.courses.list.link,
            },
            {
                title: 'Formations Sur-Mesure',
                description: 'Parcours adaptés aux besoins spécifiques des entreprises et individus.',
                bgColor: 'bg-primary-200',
                ctaLink: ROUTE_MAP.public.courses.list.link,
            },
            {
                title: 'Accompagnement des Institutions',
                description: ' Aide aux entreprises, centres et écoles pour concevoir des formations en reconversion et développement personnel.',
                bgColor: 'bg-primary-400',
                ctaLink: ROUTE_MAP.public.courses.list.link,
            },
        ];
        return (
            <MotionSection>
                <div className="">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <motion.div
                            className="mt-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight">Ce Que Nous Offrons</h2>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                                <div className="col-span-2 my-auto lg:col-span-1">
                                    <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                        Nous pensons que l'apprentissage doit être accessible, engageant et transformateur. Notre mission est de vous
                                        permettre d'atteindre votre plein potentiel, quel que soit votre point de départ. Ensemble, ouvrons de
                                        nouvelles perspectives et encourageons l'apprentissage tout au long de la vie.
                                    </p>
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <div className="space-y-4">
                                        {offer.map((o, index) => (
                                            <div
                                                key={index}
                                                className={`rounded-xl bg-white/[.54] p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 dark:text-white ${o.bgColor || 'bg-white dark:bg-[#15203c]'}`}
                                            >
                                                <a href={o.ctaLink || '#'} className="text-primary-600 font-semibold hover:underline text-lg md:text-xl">
                                                    {o.title}
                                                </a>
                                                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{o.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MotionSection>
        );
    };

    const BlockDGWord = () => {
        return (
            <MotionSection>
                <div className="">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        {/* Section Directeur général */}
                        <motion.div
                            className="mt-[40px] text-center text-gray-500 italic dark:text-gray-400"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
                                <div className="col-span-1 md:col-span-3">
                                    <div className="flex items-center h-full">
                                        <div>
                                            <blockquote className="leading-relaxed text-xl md:text-2xl lg:text-3xl font-medium">
                                                "Nous pensons que l'apprentissage doit être accessible, engageant et transformateur. Notre mission est
                                                de vous permettre d'atteindre votre plein potentiel."
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 text-center">
                                    <img
                                        src="assets/images/front-pages/team2.jpg"
                                        alt="Directeur général"
                                        className="mx-auto h-32 w-32 md:h-40 md:w-40 rounded-full object-cover shadow-lg"
                                    />
                                    <p className="mt-4 font-semibold text-lg">Directeur général</p>
                                    <p className="text-gray-600 dark:text-gray-400">TestPro</p>
                                </div>
                            </div>
                        </motion.div>

                        {false && (
                            <>
                                {/* Éléments décoratifs */}
                                <motion.div
                                    className="absolute -top-[60px] -z-[1] blur-[150px] ltr:left-[65px] rtl:right-[65px]"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1 }}
                                >
                                    <img src="assets/images/front-pages/shape1.png" alt="shape1" width={530} height={530} />
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-[30px] -z-[1] blur-[125px] ltr:right-[20px] rtl:left-[20px]"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 1 }}
                                >
                                    <img src="assets/images/front-pages/shape2.png" alt="shape1" width={447} height={453} />
                                </motion.div>{' '}
                            </>
                        )}
                    </div>
                </div>
            </MotionSection>
        );
    };

    const BlockAgrement = () => {
        return (
            <MotionSection>
                <div className={`body-font ${CLASS_NAME.bgWhite}`}>
                    <div className={`${CLASS_NAME.sectionContentPadding}`}>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                            <h2 className="!mb-8 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center">Nos Agréments</h2>
                            {/* Bloc GASQ */}
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 items-center bg-white/50 dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="col-span-1 md:col-span-1 text-center">
                                    <img src="/assets/images/agrements/gasq.jpeg" alt="Logo GASQ" className="h-16 md:h-20 lg:h-24 mx-auto object-contain" />
                                </div>
                                <div className="space-y-4 col-span-1 md:col-span-5">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">TestPro, organisme certifié GASQ Platinium</h3>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                        En tant que centre de formation accrédité GASQ Platinium, <strong>TestPro</strong> propose des parcours de
                                        formation certifiants tels que <strong>ISTQB</strong>, alignés sur les standards internationaux du test
                                        logiciel.
                                        <br /><br />
                                        Nos formations allient expertise technique et pédagogie de qualité, encadrées par des formateurs certifiés,
                                        avec des supports officiels à jour. Les examens peuvent être passés sur site dans nos locaux à Cocody ou en
                                        ligne.
                                        <br /><br />
                                        Cette reconnaissance renforce notre crédibilité en tant qu'acteur clé de la formation en assurance qualité
                                        logicielle.
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-full border-t border-gray-200 my-4" />

                            {/* Bloc FDFP */}
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 items-center bg-white/50 dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg">
                                <div className="col-span-1 md:col-span-1 text-center">
                                    <img src="/assets/images/agrements/logo-fdfp.jpg" alt="Logo FDFP" className="h-20 md:h-24 lg:h-28 mx-auto object-contain" />
                                </div>
                                <div className="space-y-4 col-span-1 md:col-span-5">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">TestPro agréé par le FDFP</h3>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                        <strong>TestPro</strong> est agréé par le{' '}
                                        <strong>Fonds de Développement de la Formation Professionnelle (FDFP)</strong>, ce qui permet aux entreprises
                                        ivoiriennes de mobiliser leur contribution pour financer les formations de leurs équipes.
                                        <br /><br />
                                        Grâce à notre catalogue riche et adapté aux besoins métiers, nous accompagnons efficacement les entreprises
                                        dans la mise en œuvre de leur plan de formation, avec une prise en charge facilitée par le FDFP.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MotionSection>
        );
    };

    return (
        <section className="text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            {/* #1 - Bienvenue et TestPro */}
            <BlockAbout />

            {/* #2 - Mission*/}
            <BlockOurMission />

            {/* #6 - Citation du Directeur général */}
            <BlockDGWord />

            {/* #3 - Qu'est-ce qui nous rend spécial ? */}
            <BlockWhatMakesUsSpecial />

            {/* #4 - Nos Valeurs*/}
            <BlockOurValues />

            {/* #5 - Ce Que Nous Offrons */}
            <BlockWhatWeOffer />

            {/* #7 - Agréments */}
            <BlockAgrement />
        </section>
    );
}

export default AboutUsCardThree;
