import ContactUs from '@/components/contactUs/ContactUs';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function ContactUsPAge() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: t('PAGES.CONTACT_US', 'Nous contacter'), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('PAGES.CONTACT_US', 'Nous contacter')}
            description={t('PAGES.CONTACT_US_DESCRIPTION', "N'hésitez pas à nous contacter pour toute question ou demande d'information.")}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.CONTACT_US', 'Nous contacter')}
                    description={t('PAGES.CONTACT_US_DESCRIPTION', "N'hésitez pas à nous contacter pour toute question ou demande d'information.")}
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-2"
                />
                <ContactUs />
            </div>
        </DefaultLayout>
    );
}
