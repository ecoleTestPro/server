import { CLASS_NAME } from '@/data/styles/style.constant';
import { ROUTE_MAP } from '@/utils/route.util';
import { motion } from 'framer-motion';

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
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">
                                        Bienvenue chez TestPro, votre partenaire dans le développement professionnel et la réussite éducative.
                                    </h2>
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

    const BlockOurMission = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
                <div className="">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        {/* Section Notre Mission */}
                        <motion.div
                            className="mt-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <h2 className="!mb-[15px] text-2xl font-bold md:text-3xl">Notre Mission</h2>
                            <p className="!mb-[15px] leading-[1.5]">
                                Nous nous engageons à offrir des formations certifiantes et sur-mesure, adaptées aux besoins individuels et
                                professionnels de nos apprenants. Que vous soyez un professionnel en quête de reconversion ou une entreprise désireuse
                                de former vos équipes, nous proposons des solutions pédagogiques innovantes et alignées sur les dernières tendances du
                                secteur.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockWhatMakesUsSpecial = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgGray}`}
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
                                    className="mb-[40px] text-center"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    // variants={sectionVariants}
                                >
                                    <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Qu'est-ce qui nous rend spécial ?</h2>
                                </motion.div>
                                <p className="!mb-[15px] leading-[1.5]">
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
            </motion.section>
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
                svg: 'assets/images/svgs/digicomp_icon_bewertung.svg',
                description: 'Nous privilégions une approche basée sur les meilleures pratiques et les standards  internationaux.',
            },
            {
                title: 'Flexibilité',
                svg: 'assets/images/svgs/digicomp_icon_trainer.svg',
                description: 'Nos programmes sont conçus pour s’adapter à vos contraintes et objectifs spécifiques.',
            },
            {
                title: 'Engagement',
                svg: 'assets/images/svgs/digicomp_icon_kurse.svg',
                description: 'Nous croyons au pouvoir de l’éducation pour transformer les carrières et les vies.',
            },
        ];

        return (
            <motion.section
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
                            <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Nos Valeurs</h2>

                            <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
                                {values.map((v, index) => (
                                    <div
                                        key={index}
                                        className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-[15px] text-center backdrop-blur-[5.400000095367432px] md:p-[25px] lg:p-[30px] ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]"
                                    >
                                        <div className={`flex items-center justify-start`}>
                                            <div className="w-[80px]">
                                                <img
                                                    alt="Real-Time Updates"
                                                    loading="lazy"
                                                    width="250"
                                                    decoding="async"
                                                    data-nimg="1"
                                                    className="inline-block"
                                                    src={v.svg}
                                                />
                                            </div>

                                            <h3 className="!mb-[10px] !text-lg !leading-[1.2] !font-semibold md:!mb-[12px] md:!text-[20px] lg:!text-[22px] xl:!mb-[13px] xl:!text-[24px]">
                                                {v.title}
                                            </h3>
                                        </div>

                                        <p className="leading-[1.6] xl:max-w-[375px]">{v.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockWhatWeOffer = () => {
        const offer: { title: string; description: string; bgColor?: string; ctaLink?: string }[] = [
            {
                title: 'Formations Certifiantes',
                description: 'Validez vos compétences et gagnez un avantage compétitif.',
                bgColor: 'bg-primary-100',
                ctaLink: ROUTE_MAP.courses.link,
            },
            {
                title: 'Formations Sur-Mesure',
                description: 'Parcours adaptés aux besoins spécifiques des entreprises et individus.',
                bgColor: 'bg-primary-200',
                ctaLink: ROUTE_MAP.courses.link,
            },
            {
                title: 'Accompagnement des Institutions',
                description: ' Aide aux entreprises, centres et écoles pour concevoir des formations en reconversion et développement personnel.',
                bgColor: 'bg-primary-400',
                ctaLink: ROUTE_MAP.courses.link,
            },
        ];
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgAlt1} ${CLASS_NAME.sectionContentPadding}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
                <div className="">
                    <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <motion.div
                            className="mt-[40px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            // variants={sectionVariants}
                        >
                            <h2 className="!mb-[15px]text-2xl font-bold md:text-3xl">Ce Que Nous Offrons</h2>

                            <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2">
                                <div className="col-span-2 my-auto lg:col-span-1">
                                    <p className="mt-[15px] leading-[1.5]">
                                        Nous pensons que l'apprentissage doit être accessible, engageant et transformateur. Notre mission est de vous
                                        permettre d'atteindre votre plein potentiel, quel que soit votre point de départ. Ensemble, ouvrons de
                                        nouvelles perspectives et encourageons l'apprentissage tout au long de la vie.
                                    </p>
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <ul className="list-disc pl-0 text-[15px] leading-[1.5] md:pl-5 md:text-[17px]">
                                        {offer.map((o, index) => (
                                            <li
                                                key={index}
                                                className={`mb-3 list-none rounded-[4px] bg-white/[.54] p-[10px] md:p-[15px] lg:p-[20px] dark:text-white ${o.bgColor || 'bg-white dark:bg-[#15203c]'}`}
                                            >
                                                <a href={o.ctaLink || '#'} className="text-primary-600 font-semibold hover:underline">
                                                    {o.title}
                                                </a>
                                                : {o.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        );
    };

    const BlockDGWord = () => {
        return (
            <motion.section
                className={`body-font ${CLASS_NAME.bgGray}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                // variants={sectionVariants}
            >
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
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-[25px]">
                                <div className="col-span-5 md:col-span-3">
                                    <p className="leading-[1.5] text-2xl">
                                        "Nous pensons que l'apprentissage doit être accessible, engageant et transformateur. Notre mission est de vous
                                        permettre d'atteindre votre plein potentiel."
                                    </p>
                                </div>

                                <div className="col-span-5 md:col-span-2">
                                    <img
                                        src="assets/images/front-pages/team2.jpg"
                                        alt="Directeur général"
                                        className="mx-auto h-[150px] w-[150px] rounded-full object-cover"
                                    />
                                    <p className="mt-2 font-semibold">Directeur général</p>
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
            </motion.section>
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
        </section>
    );
}

export default AboutUsCardThree;
