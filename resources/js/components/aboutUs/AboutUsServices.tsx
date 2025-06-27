import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import MotionSection from '../motion/MotionSection';
import BtnSecondary from '../ui/button/btn-secondary';

interface IServiceItem {
    title: string;
    link: string;
    description?: string;
}

interface IService {
    title: string;
    link: string;
    services: IServiceItem[];
}

export default function AboutUsServices() {
    const services: IService[] = [
        {
            title: 'Consulting',
            link: ROUTE_MAP.public.services.consulting.index.link,
            services: [
                {
                    title: 'Audit de maturité des tests',
                    link: ROUTE_MAP.public.services.consulting.auditOfMaturityOfTests.link,
                    description:
                        'Évaluez et optimisez vos processus de test grâce à nos audits approfondis, identifiant les lacunes et les opportunités d’amélioration.',
                },
                {
                    title: 'Conseil en stratégie de test',
                    link: ROUTE_MAP.public.services.consulting.consultingTesting.link,
                    description:
                        'Développez des stratégies de test robustes, adaptées à vos objectifs commerciaux, pour garantir qualité et performance à chaque étape.',
                },
            ],
        },
        {
            title: 'Services de test',
            link: ROUTE_MAP.public.services.testSerivces.index.link,
            services: [
                {
                    title: 'Externalisation des tests',
                    link: ROUTE_MAP.public.services.testSerivces.integrationSpecialists.link,
                    description:
                        'Confiez vos besoins de test à nos équipes expertes pour des résultats de haute qualité, tout en vous concentrant sur vos activités principales.',
                },
                {
                    title: 'Intégration de spécialistes sur site',
                    link: ROUTE_MAP.public.services.testSerivces.testOutsourcingServices.link,
                    description:
                        'Intégrez nos professionnels qualifiés au sein de vos équipes pour une collaboration fluide et une exécution optimale des projets.',
                },
            ],
        },
    ];
    return (
        <MotionSection>
            <section className="relative z-10 pb-24 md:pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-full flex items-center ">
                            <div className="space-y-6" data-aos="fade-right" data-aos-duration="1500" data-aos-offset="50">
                                <div className="space-y-3">
                                    <span className="inline-block text-sm font-semibold text-gray-600 dark:text-white mb-2">Nos Services</span>
                                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                        Collaborez avec des entreprises leaders du secteur
                                    </h2>
                                </div>
                                <p className="text-gray-600 dark:text-white">
                                    Nous accompagnons nos clients dans la professionnalisation de leurs activités liées au Test et à l'Ingénierie des
                                    Exigences.
                                </p>
                                <p className="text-gray-600 dark:text-white">
                                    Faites-nous confiance pour être votre partenaire dans votre transformation numérique. Nos solutions de test
                                    garantissent qualité, efficacité et innovation pour mener vos projets au succès.
                                </p>
                                <BtnSecondary href={ROUTE_MAP.public.services.testSerivces.index.link} label="En savoir plus sur nous" />
                                <div
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                    data-aos="fade-right"
                                    data-aos-duration="1500"
                                    data-aos-offset="50"
                                >
                                    {services.map((service, index) => (
                                        <div key={index} className="space-y-3">
                                            <div className="text-2xl text-secondary">
                                                <i className="flaticon-experts" />
                                            </div>
                                            <h5 className="font-semibold text-lg">
                                                <Link
                                                    className="hover:text-primary hover:underline transition-all duration-100 ease-in "
                                                    href={service.link}
                                                >
                                                    {service.title}
                                                </Link>
                                            </h5>
                                            {service.services.map((item, idx) => (
                                                <div className="mb-4">
                                                    <p className="text-gray-600 dark:text-white mb-1">
                                                        <strong>
                                                            <Link
                                                                className="hover:text-primary hover:underline transition-all duration-100 ease-in "
                                                                href={item.link}
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </strong>
                                                    </p>
                                                    {item.description && <p className="text-gray-600 dark:text-white">{item.description}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex items-center py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="50">
                                    <img src="/assets/images/about/why-choose1.jpg" alt="Expertise en test" className="w-full rounded-lg shadow-md" />
                                    <img
                                        src="/assets/images/about/why-choose3.jpg"
                                        alt="Collaboration d’équipe"
                                        className="w-full rounded-lg shadow-md hidden md:block"
                                    />
                                </div>
                                <div
                                    className="space-y-4 hidden md:block"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                    data-aos-duration="1500"
                                    data-aos-offset="50"
                                >
                                    <img
                                        src="/assets/images/about/why-choose4.jpg"
                                        alt="Solutions innovantes"
                                        className="w-full rounded-lg shadow-md"
                                    />
                                    <img src="/assets/images/about/why-choose2.jpg" alt="Assurance qualité" className="w-full rounded-lg shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MotionSection>
    );
}
