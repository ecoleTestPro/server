import ContactUs from '@/components/contactUs/ContactUs';
import Faq from '@/components/faq/Faq';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function FaqsPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.home.link },
        { label: t('PAGES.FAQ', 'FAQ'), href: ROUTE_MAP.faqs.link },
    ];

    return (
        <DefaultLayout title={t('PAGES.FAQ', "FAQ's")}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.FAQ', "FAQ's")}
                    description={t('PAGES.FAQ_DESCRIPTION', "Trouvez des réponses à vos questions fréquentes.")}
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-2"
                />
                <Faq />
            </div>
        </DefaultLayout>
    );
}
