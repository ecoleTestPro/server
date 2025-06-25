import TitleBadgeOne from '../ui/badge-one';

interface Widget {
    title: string;
    description: string;
    image: string;
    bgColor: string;
}

const widgetsData: Widget[] = [
    {
        title: 'Expertise',
        description: 'Maîtrisez des compétences recherchées et décrochez un emploi dès l’obtention de votre certificat !',
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

/*******  d9415daf-750b-42a1-bea1-8ab0355c9d1d  *******/ function AboutUsCardTwo() {
    return (
        <section className="body-font text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            <div className="py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px]">
                <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="mx-auto mb-[35px] text-center md:mb-[50px] md:max-w-[650px] lg:mb-[65px] lg:max-w-[810px] xl:mb-[90px] xl:max-w-[785px]">
                        <TitleBadgeOne title="Notre Engagement" />
                        <h2 className="!mb-0 !text-[24px] !leading-[1.2] -tracking-[.5px] md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                            Nous associons notre Expertise, nos programmes de Certification et notre approche Pratique pour garantir une qualité
                            irréprochable de nos services
                            {false &&
                                ' assurant ainsi la satisfaction de nos clients et partenaires, tout en adoptant et en développant des méthodologies innovantes.'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
                        {widgetsData.map((feature, index) => (
                            <div
                                key={index}
                                className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-[15px] text-center backdrop-blur-[5.400000095367432px] md:p-[25px] lg:p-[30px] ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]"
                            >
                                <div
                                    className={`mx-auto mb-[20px] flex h-[80px] w-[80px] items-center justify-center rounded-[10px] md:h-[85px] md:w-[85px] md:rounded-[17px] lg:mx-0 lg:mb-[22px] ${feature.bgColor}`}
                                >
                                    <img
                                        alt="Real-Time Updates"
                                        loading="lazy"
                                        width="50"
                                        height="50"
                                        decoding="async"
                                        data-nimg="1"
                                        className="inline-block"
                                        src={feature.image}
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
        </section>
    );
}

export default AboutUsCardTwo;
