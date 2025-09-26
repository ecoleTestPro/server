import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { useTranslation } from 'react-i18next';
import CourseTable from '../list/CourseTable';

interface RelatedCoursesProps {
    courses: ICourse[];
    currentCourseId: number;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ courses, currentCourseId }) => {
    const { t } = useTranslation();

    // Filter out the current course
    const relatedCourses = courses.filter((course) => course.id !== currentCourseId);

    if (!relatedCourses || !relatedCourses.length) {
        return '';
    }

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPaddingAlt} bg-gray-50 dark:bg-gray-900`}>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">{t('COURSE.DETAIL.RELATED_COURSES', 'Formations similaires')}</h2>

                <CourseTable courses={relatedCourses} />
            </div>
        </section>
    );
};

export default RelatedCourses;
