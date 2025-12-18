import OurCurrentCourses from '@/components/courses/list/courses.index';
import Faq from '@/components/faq/Faq';
import FeaturesSection from '@/components/hero/featuresSection';
import Hero from '@/components/hero/hearo';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';

export default function CourseCategoryPage() {
    const { data } = usePage<SharedData>().props;

    const breadcrumbItems = [
        { label: 'Accueil', href: ROUTE_MAP.public.home.link },
        { label: 'Formations', href: ROUTE_MAP.public.courses.list.link },
    ];

    return (
        <DefaultLayout title="Toutes nos formations" description="Découvrez l'ensemble de notre catalogue de formations">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title="Toutes nos formations"
                    description="Découvrez l'ensemble de notre catalogue de formations professionnelles"
                    breadcrumbItems={breadcrumbItems}
                />
                <FeaturesSection />
                <OurCurrentCourses coursesData={data?.categories_with_courses} showSidebar={true} showViewAllButton={false} />
                <Testimonials />
                <Faq />
            </div>
        </DefaultLayout>
    );
}
