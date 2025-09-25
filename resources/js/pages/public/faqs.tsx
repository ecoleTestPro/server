import Faq from '@/components/faq/Faq';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { ROUTE_MAP } from '@/utils/route.util';
import { useTranslation } from 'react-i18next';

export default function FaqsPage() {
    // const { auth } = usePage<SharedData>().props; // Non utilisé
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.FAQ', 'FAQ'), href: ROUTE_MAP.public.faqs.link },
    ];

    return (
        <DefaultLayout title={t('PAGES.FAQ', "FAQ's")}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.FAQ', "FAQ's")}
                    description={t('PAGES.FAQ_DESCRIPTION', 'Trouvez des réponses à vos questions fréquentes.')}
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-2"
                />
                <Faq />
            </div>
        </DefaultLayout>
    );
}
