import AboutUsServices from '@/components/aboutUs/AboutUsServices';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ServicesPage() {
    // const { auth } = usePage<SharedData>().props; // Non utilisé
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.SERVICES', 'Nos services'), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('PAGES.SERVICES', 'Nos services')}
            description={t('PAGES.SERVICES_DESCRIPTION', 'Découvrez comment notre expertise peut accompagner votre entreprise.')}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.SERVICES', 'Nos services')}
                    description={t('PAGES.SERVICES_DESCRIPTION', 'Découvrez comment notre expertise peut accompagner votre entreprise.')}
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-3"
                />
                <AboutUsServices />
            </div>
        </DefaultLayout>
    );
}
