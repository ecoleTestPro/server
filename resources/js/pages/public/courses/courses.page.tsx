import OurCurrentCourses from '@/components/courses/list/our-current-courses';
import Faq from '@/components/faq/Faq';
import FeaturesSection from '@/components/hero/featuresSection';
import Hero from '@/components/hero/hearo';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { ROUTE_MAP } from '@/utils/route.util';

export default function CourseCategoryPage() {
    const breadcrumbItems = [
        { label: 'Home', href: ROUTE_MAP.public.home.link },
        { label: 'Courses', href: ROUTE_MAP.public.courses.list.link },
        { label: 'Category', href: ROUTE_MAP.public.courses.byCategory(1).link },
    ];

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero title="Welcome" description="Welcome" breadcrumbItems={breadcrumbItems} />
                {/* <Bestseller /> */}
                <FeaturesSection />
                <OurCurrentCourses />
                <Testimonials />
                <Faq />
                {/* <ContactCard /> */}
            </div>
        </DefaultLayout>
    );
}
