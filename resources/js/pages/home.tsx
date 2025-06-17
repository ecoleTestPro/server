import AboutUsCard from '@/components/aboutUs/aboutUsCard';
import AboutUsCardTwo from '@/components/aboutUs/aboutUsCardTwo';
import OurCurrentCourses from '@/components/courses/list/our-current-courses';
import Faq from '@/components/faq/Faq';
import FeaturesSection from '@/components/hero/featuresSection';
import HeroHomePage from '@/components/hero/HeroHomePage';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <HeroHomePage />
                <AboutUsCard />
                {/* <Bestseller /> */}
                <FeaturesSection />
                <OurCurrentCourses />
                <AboutUsCardTwo />
                <Testimonials />
                <Faq />
                {/* <ContactCard /> */}
            </div>
        </DefaultLayout>
    );
}
