import OurCurrentCourses from '@/components/courses/list/our-current-courses';
import FeaturesSection from '@/components/hero/featuresSection';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourse, ICourseCategory } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CourseCategoryPage() {
    const { auth, data } = usePage<SharedData>().props;
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<ICourseCategory | null>(null);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<IHeroBreadcrumbItems[]>([]);
    const [error, setError] = useState<string | false>(false);

    useEffect(() => {
        setLoading(true);

        Logger.log('[CourseCategoryPage] useEffect - data', data);

        if (data && data.category && data.category.id && data.category.slug) {
            // Assuming data.category is the category object
            setCategory(data.category);

            // Set breadcrumb items based on the category data
            if (data.category) {
                setBreadcrumb([
                    { label: 'Home', href: ROUTE_MAP.home.link },
                    { label: 'Formations', href: ROUTE_MAP.courses.link },
                    { label: data.category?.title, href: ROUTE_MAP.courseCategory(data.category.slug).link },
                ]);
            }
        }
    }, [data]);

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
