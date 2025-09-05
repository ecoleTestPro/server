import AboutUsCardThree from '@/components/aboutUs/aboutUsCardThree';
import ContactCard from '@/components/contactUs/ContactCard';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AboutUsPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const title: string = 'A propos de TestPro';
    const description: string =
        'TestPro vous ouvre les portes de l’excellence : acteur pionnier et référence internationale en ingénierie des exigences et formation certifiantes';

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', title), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.ABOUT_US', title), href: '#' },
    ];

    return (
        <DefaultLayout title={t('PAGES.ABOUT_US', title)} description={t('PAGES.ABOUT_US_DESCRIPTION', description)}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.ABOUT_US', title)}
                    description={t('PAGES.ABOUT_US_DESCRIPTION', description)}
                    breadcrumbItems={breadcrumbItems}
                />
                <AboutUsCardThree />
                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
