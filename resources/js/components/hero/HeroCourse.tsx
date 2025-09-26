import { ICourse } from '@/types/course';
import { useTranslation } from 'react-i18next';
import CourseDetailOverview from '../courses/detail/partial/CourseDetailOverview';

export interface IHeroBreadcrumbItems {
    label: string;
    href: string;
}

interface HeroProps {
    course: ICourse;
}
const HeroCourse = ({ course }: HeroProps) => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="container mx-auto">
                <div className="w-4/5">
                    {course.excerpt && <p className="text-lg text-gray-700 md:text-xl mb-4 text-justify">{course.excerpt}</p>}
                </div>
            </div>
            <CourseDetailOverview course={course} />
        </section>
    );
};

export default HeroCourse;
