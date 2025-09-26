import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { usePage } from '@inertiajs/react';
import ChooseSection from './ChooseSection';
import CoursePartners from './CoursePartners';
import DescriptionCourse from './DescriptionCourse';
import QuestionCourse from './QuestionCourse';
import RelatedCourses from './RelatedCourses';

interface CourseDetailProps {
    course: ICourse;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
    const { props } = usePage<SharedData>();
    const relatedCourses = props.data?.related_courses || [];

    return (
        <>
            <DescriptionCourse course={course} />
            <QuestionCourse course={course} />
            <ChooseSection course={course} />
            <CoursePartners partners={course.partners} />
            <RelatedCourses courses={relatedCourses} currentCourseId={course.id} />
        </>
    );
};

export default CourseDetail;
