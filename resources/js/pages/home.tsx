import AboutUsCard from '@/components/aboutUs/aboutUsCard';
import AboutUsCardTwo from '@/components/aboutUs/aboutUsCardTwo';
import AboutUsServices from '@/components/aboutUs/AboutUsServices';
import OurCurrentCourses from '@/components/courses/list/our-current-courses';
import Faq from '@/components/faq/Faq';
// import FeaturesSection from '@/components/hero/featuresSection';
import HeroHomePage from '@/components/hero/HeroHomePage';
import Testimonials from '@/components/testimonial/Testimonials';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth, data } = usePage<SharedData>().props;
    // const [loading, setLoading] = useState<boolean>(false);
    // const [category, setCategory] = useState<ICourseCategory | null>(null);
    // const [courses, setCourses] = useState<ICourse[]>([]);
    // const [breadcrumb, setBreadcrumb] = useState<IHeroBreadcrumbItems[]>([]);

    return (
        <DefaultLayout title="Accueil" description="Bienvenue sur notre site d'apprentissage en ligne. Découvrez nos cours et services.">
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <HeroHomePage />
                <AboutUsCard />
                <AboutUsServices />
                <OurCurrentCourses coursesData={data.categories_with_courses} coursesDataSlice={5} />
                <AboutUsCardTwo />
                <Testimonials />
                <Faq />
            </div>
        </DefaultLayout>
    );
}
