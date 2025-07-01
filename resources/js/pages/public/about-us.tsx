import AboutUsCard from '@/components/aboutUs/aboutUsCard';
import AboutUsCardThree from '@/components/aboutUs/aboutUsCardThree';
import AboutUsCardTwo from '@/components/aboutUs/aboutUsCardTwo';
import ContactCard from '@/components/contactUs/ContactCard';
import Faq from '@/components/faq/Faq';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'A propos de nous'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.ABOUT_US', 'A propos de nous'), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('PAGES.ABOUT_US', 'A propos de nous')}
            description={t(
                'PAGES.ABOUT_US_DESCRIPTION',
                "En savoir plus sur notre mission, notre vision et l'équipe à l'origine de notre plateforme.",
            )}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.ABOUT_US', 'A propos de nous')}
                    description={t(
                        'PAGES.ABOUT_US_DESCRIPTION',
                        "En savoir plus sur notre mission, notre vision et l'équipe à l'origine de notre plateforme.",
                    )}
                    breadcrumbItems={breadcrumbItems}
                />
                <AboutUsCardThree />
                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
