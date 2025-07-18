import OurCurrentCourses from '@/components/courses/list/our-current-courses';
import FeaturesSection from '@/components/hero/featuresSection';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function CourseCategoryPage() {
    const { data } = usePage<SharedData>().props;

    const category = useMemo(() => {
        if (data && data.category && data.category.id && data.category.slug) {
            return data.category as ICourseCategory;
        }
        return null;
    }, [data]);

    const breadcrumb: IHeroBreadcrumbItems[] = useMemo(() => {
        if (!category) return [];
        return [
            { label: 'Home', href: ROUTE_MAP.public.home.link },
            { label: 'Formations', href: ROUTE_MAP.public.courses.list.link },
            { label: category.title, href: ROUTE_MAP.public.courses.byCategory(category.slug).link },
        ];
    }, [category]);

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                {category && (
                    <>
                        <Hero title={category.title} description={category?.description ?? ''} category={category} breadcrumbItems={breadcrumb} />
                        <FeaturesSection />
                        <OurCurrentCourses coursesData={category.children} showSidebar={true} />
                    </>
                )}
                <Testimonials />
            </div>
        </DefaultLayout>
    );
}
