function FeaturesSection() {
    const features = [
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

    const gridStyles = [
        'col-span-2 row-span-2', // 1er élément : 2/3 largeur, 2 lignes
        'col-span-1 row-span-2', // 2e élément : 1/3 largeur, 2 lignes
        'col-span-1 row-span-1', // 3e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 4e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 5e élément : 1/3 largeur, 1 ligne
    ];

    return (
        <div className="relative overflow-hidden">
            <section className="relative z-10 py-10 text-white md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col justify-between ${gridStyles[idx] || 'col-span-1 row-span-1'} ${'relative z-10 cursor-pointer bg-white p-4 text-black transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl md:p-6 dark:text-neutral-100'}`}
                                style={{
                                    minHeight: idx < 2 ? '300px' : '180px',
                                    maxHeight: idx < 2 ? '400px' : '260px',
                                }}
                            >
                                {feature.img && (
                                    <img src={feature.img} alt={feature.alt} className="mb-2 h-12 w-12 object-cover md:mb-4 md:h-16 md:w-16" />
                                )}
                                <h3 className="mb-2 text-lg font-bold md:text-xl">{feature.title}</h3>
                                <p className="text-black-600 text-sm md:text-base dark:text-neutral-100">{feature.description}</p>
                                <a href={feature.link} className="text-primary text-sm hover:underline md:text-base">
                                    {feature.linkLabel}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
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
