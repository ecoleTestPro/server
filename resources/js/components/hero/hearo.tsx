import { ICourse, ICourseCategory } from '@/types/course';
import { Link } from '@inertiajs/react';
import HeroCourse from './HeroCourse';

export interface IHeroBreadcrumbItems {
    label: string;
    href: string;
}

interface HeroProps {
    title: string;
    description?: string;
    breadcrumbItems: IHeroBreadcrumbItems[];
    gradient?: 'style-1' | 'style-2' | 'style-3';
    category?: ICourseCategory;
    course?: ICourse;
}

const Hero = ({ title, description, breadcrumbItems, gradient = 'style-1', category: _category, course }: HeroProps) => {
    const getGradient = (style: string) => {
        switch (style) {
            case 'style-1':
                return 'bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 animate-gradient-shift-disable-1';
            case 'style-2':
                return 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 animate-gradient-shift-disable-2';
            case 'style-3':
                return 'bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 animate-gradient-shift-disable-3';
            default:
                return 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 animate-gradient-shift-disable-default';
        }
    };

    return (
        <section className={`${getGradient(gradient)} py-12 text-gray-900 dark:text-white md:py-16`}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <nav className="mb-4 text-sm text-gray-700 dark:text-black">
                    <ol className="flex flex-wrap items-center gap-2">
                        {breadcrumbItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className="transition-colors hover:underline">
                                    {item.label}
                                </Link>
                                {index < breadcrumbItems.length - 1 && <span className="mx-2">›</span>}
                            </li>
                        ))}
                    </ol>
                </nav>
                <hr className="mb-4 w-1/6 border-gray-400 dark:border-gray-600 md:w-1/12" />
                <div className="w-4/5">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl text-[#111]">{title}</h1>
                    {description && <p className="w-4/5 text-lg text-gray-800 dark:text-gray-200 md:text-xl">{description}</p>}
                </div>

                {/* {category && <HeroCategory category={category} />} */}
                {course && <HeroCourse course={course} />}
            </div>
        </section>
    );
};

export default Hero;
