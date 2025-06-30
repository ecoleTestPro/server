import CourseDetail from '@/components/courses/detail/CourseDetail';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CourseCategoryPage() {
    const { auth, data } = usePage<SharedData>().props;
    const [loading, setLoading] = useState<boolean>(false);
    // const [category, setCategory] = useState<ICourseCategory | null>(null);
    const [course, setCourse] = useState<ICourse | null>(null);
    const [breadcrumb, setBreadcrumb] = useState<IHeroBreadcrumbItems[]>([]);
    const [error, setError] = useState<string | false>(false);

    useEffect(() => {
        setLoading(true);

        Logger.log('[CourseCategoryPage] useEffect - data', data);

        if (data && data.course && data.course.id && data.course.slug) {
            // Assuming data.category is the category object
            // setCategory(data.category);
            setCourse(data.course);

            // Set breadcrumb items based on the category data
            if (data.category) {
                setBreadcrumb([
                    { label: 'Home', href: ROUTE_MAP.public.home.link },
                    { label: data.category?.title, href: ROUTE_MAP.public.courses.byCategory(data.category.slug).link },
                    { label: data.course?.title, href: ROUTE_MAP.public.courses.detail(data.category?.slug, data.course?.slug).link },
                ]);
            }
        }
    }, [data]);

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                {course && (
                    <>
                        <Hero title={course.title} description={''} course={course} breadcrumbItems={breadcrumb} gradient="style-2" />
                        {/* <OurCurrentCourses coursesData={category.children} showSidebar={true} /> */}
                        <CourseDetail course={course} />
                    </>
                )}
                <Testimonials />
            </div>
        </DefaultLayout>
    );
}
