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

    // Pour la disposition personnalisée
    const gridStyles = [
        'col-span-2 row-span-2', // 1er élément : 2/3 largeur, 2 lignes
        'col-span-1 row-span-2', // 2e élément : 1/3 largeur, 2 lignes
        'col-span-1 row-span-1', // 3e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 4e élément : 1/3 largeur, 1 ligne
        'col-span-1 row-span-1', // 5e élément : 1/3 largeur, 1 ligne
    ];

    // Image flottante animée en arrière-plan
    const floatingImageUrl = 'https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_1280.png';

    return (
        <div className="relative overflow-hidden">
            {/* Image flottante animée */}
            <img
                src={floatingImageUrl}
                alt="Floating Bubble"
                className="animate-float-slow pointer-events-none absolute top-10 left-1/2 z-0 w-96 opacity-20"
                style={{ transform: 'translateX(-50%)' }}
            />
            <section className="bg-primary relative z-10 py-20 text-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-3 grid-rows-2 gap-6 md:grid-cols-3 md:grid-rows-2" style={{ minHeight: '600px' }}>
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className={` ${gridStyles[idx] || 'col-span-1 row-span-1'} ${
                                    'flex flex-col justify-between ' +
                                    'cursor-pointer bg-white p-6 text-black dark:text-neutral-100' +
                                    'relative z-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl'
                                } `}
                                style={{
                                    minHeight: idx < 2 ? 340 : 180,
                                    maxHeight: idx < 2 ? 420 : 260,
                                }}
                            >
                                {feature.img && <img src={feature.img} alt={feature.alt} className="mb-4 h-16 w-16" />}
                                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                <p className="text-black-600 dark:text-neutral-100">{feature.description}</p>
                                <a href={feature.link} className="text-primary hover:underline">
                                    {feature.linkLabel}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Animation CSS pour l'image flottante */}
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
