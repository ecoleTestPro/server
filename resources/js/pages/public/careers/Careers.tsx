import ContactCard from '@/components/contactUs/ContactCard';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function Careers() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const pageTitle = t('PAGES.CAREERS', 'Carrières');

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: t('PAGES.CAREERS', pageTitle), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('PAGES.CAREERS', 'Carrières')}
            description={t('PAGES.CAREERS_DESCRIPTION', 'Découvrez nos opportunités de carrière et rejoignez notre équipe.')}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.CAREERS', 'Carrières')}
                    description={t('PAGES.CAREERS_DESCRIPTION', 'Découvrez nos opportunités de carrière et rejoignez notre équipe.')}
                    breadcrumbItems={breadcrumbItems}
                />
                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
