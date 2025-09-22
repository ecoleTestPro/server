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
        image: '/assets/images/svgs/code.svg',
        bgColor: 'bg-primary-100',
    },
    {
        title: 'Certification',
        description: 'Un certificat reconnu qui ouvre instantanément les portes du marché de l’emploi.',
        image: '/assets/images/svgs/stacks.svg',
        bgColor: 'bg-primary-200',
    },
    {
        title: 'Pratique',
        description: 'Apprenez par l’action : des projets concrets pour booster votre carrière et votre impact.',
        image: '/assets/images/svgs/support_agent.svg',
        bgColor: 'bg-primary-300',
    },
];
function AboutUsCardTwo() {
    return (
        <section className="body-font text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            <div className="py-8 md:py-12 lg:py-16 xl:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1320px]">
                    <div className="mx-auto mb-8 text-center md:mb-12 md:max-w-[650px] lg:mb-16 lg:max-w-[810px] xl:mb-20 xl:max-w-[785px]">
                        <TitleBadgeOne title="Notre Engagement" />
                        <h2 className="!mb-0 !text-2xl !leading-tight -tracking-[.5px] font-bold md:!text-3xl md:-tracking-[.6px] lg:!text-4xl lg:-tracking-[.8px] xl:!text-5xl xl:-tracking-[1px]">
                            Nous associons notre Expertise, nos programmes de Certification et notre approche Pratique pour garantir une qualité
                            irréprochable de nos services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {widgetsData.map((feature, index) => (
                            <div
                                key={index}
                                className="hover:bg-primary-100 rounded-2xl bg-white/[.54] p-6 text-center backdrop-blur-[5.4px] shadow-lg hover:shadow-xl transition-all duration-300 md:p-8 ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c]"
                            >
                                <div
                                    className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl md:h-20 md:w-20 lg:mx-0 lg:mb-6 ${feature.bgColor}`}
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

                                <h3 className="!mb-3 !text-xl !leading-tight !font-semibold md:!text-2xl lg:!text-2xl xl:!text-2xl">
                                    {feature.title}
                                </h3>

                                <p className="leading-relaxed text-gray-600 dark:text-gray-300 xl:max-w-[375px]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsCardTwo;
