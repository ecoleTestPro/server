import AboutUsCard from '@/components/aboutUs/aboutUsCard';
import Bestseller from '@/components/courses/bestseller';
import FeaturesSection from '@/components/hero/featuresSection';
import HeroHomePage from '@/components/hero/HeroHomePage';
import Testimonial from '@/components/testimonial/testimonial';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <HeroHomePage />
            <FeaturesSection />
            <AboutUsCard />
            <Bestseller />
        </DefaultLayout>
    );
}
