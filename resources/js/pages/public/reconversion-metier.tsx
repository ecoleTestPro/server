import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import StatsBlock from '@/components/reconversion/stats-block';
import BtnSecondary from '@/components/ui/button/btn-secondary';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ReconversionMetierPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: 'Reconversion Métier', href: '#' },
    ];

    return (
        <DefaultLayout title="Reconversion Métier">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title="Reconversion Métier"
                    description="Offres sur-mesure de reconversion « Testeur Logiciel »"
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-2"
                />
                <div className="container mx-auto py-[50px] px-[10px]">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="col-span-1 lg:col-span-3">
                            <p>
                                TestPro accompagne les centres de formation, écoles et ESN souhaitant délivrer des formations de reconversion au
                                métier « Testeur Logiciel » (POEI, POEC, Programme Région, Rescaling des ressources …).
                            </p>
                            <p>
                                Nos programmes sont animés par des formateurs experts certifiés et reconnus dans leur domaine, s’appuyant sur notre
                                kit méthodologique de conduite de projet « QUP » développé à partir de retours d’expériences et des standards
                                internationaux - ISTQB, IREB, IQBBA, TMAP, TMMi, CMMi, ISO 25000.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Testeur Manuel</li>
                                <li>Testeur Automatisation</li>
                                <li>Testeur Full Stack</li>
                            </ul>
                            <BtnSecondary label="Contactez-nous" href={ROUTE_MAP.public.contact.link} />
                        </div>
                        <div className='col-span-1 lg:col-span-2' >
                            <img src="/assets/images/pexels-shvetsa-3727464.jpg" alt="illustration" className="mx-auto w-full h-auto object-fill" />
                        </div>
                    </div>
                </div>

                <StatsBlock />
                <div className="container mx-auto px-4 py-8 space-y-4"></div>
            </div>
        </DefaultLayout>
    );
}
