import BtnSecondary from '@/components/ui/button/btn-secondary';
import { ICourse, ICoursePeriodicity, ICourseSession } from '@/types/course';
import { ArrowRight } from 'lucide-react';
import { RefObject, useEffect, useState } from 'react'; // Add necessary imports
import { useTranslation } from 'react-i18next';
import { FaMapMarker } from 'react-icons/fa';
import CourseInscriptionDialog from './CourseInscriptionDialog';
import CourseSessionScheduleDialog from './CourseSessionScheduleDialog';

interface CourseDetailChooseSectionProps {
    course: ICourse;
    registrationRef?: RefObject<HTMLDivElement | null>; // Add ref prop
}

export default function CourseDetailChooseSection({ course, registrationRef }: CourseDetailChooseSectionProps) {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(true); // State to control visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog

    useEffect(() => {
        // Create Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the registration section is in view, hide the fixed section
                setIsVisible(!entry.isIntersecting);
            },
            {
                root: null, // Use viewport as root
                threshold: 0.1, // Trigger when 10% of the target is visible
            },
        );

        // Observe the registration section
        if (registrationRef?.current) {
            observer.observe(registrationRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (registrationRef?.current) {
                observer.unobserve(registrationRef.current);
            }
        };
    }, [registrationRef]);

    // Conditionally render the fixed section
    // if (!isVisible) return null;

    // Handle form submission (placeholder)
    const handleSubmit = (formData: { name: string; email: string; phone?: string; company?: string }) => {
        console.log('Form submitted:', { courseId: course.id, ...formData }); // Replace with API call
    };

    return (
        <>
            <style>
                {`
                    strong {
                        color: #1f2937; 
                    }
                `}
            </style>
            {/* fixed bottom-0 left-0 w-full z-50  */}
            {/*  ${isVisible ? 'translate-y-0' : 'relative -translate-y-full'} */}
            <div className={`transition-transform duration-300 ease-in-out`}>
                <h2 className="text-lg font-bold">{t('COURSE.DETAIL.CHOOSE_SESSION', 'Choisissez une session')}</h2>
                <div className="container mx-auto">
                    {course.course_sessions &&
                        course.course_sessions.length > 0 &&
                        course.course_sessions.map((session, index) => (
                            <CourseSessionCard
                                key={index}
                                session={session}
                                courseTitle={course.title}
                                handleClickRegister={() => setIsDialogOpen(true)}
                                periodicity_unit={course.periodicity_unit}
                                periodicity_value={course.periodicity_value}
                                price={course.price}
                                regular_price={course.regular_price}
                            />
                        ))}
                </div>
            </div>

            <CourseInscriptionDialog course={course} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
}

interface CourseSessionCardProps {
    session: ICourseSession;
    price: number;
    courseTitle?: string;
    regular_price: number;
    periodicity_unit: ICoursePeriodicity;
    periodicity_value: number;
    handleClickRegister: () => void;
}

export const CourseSessionCard = ({
    session,
    courseTitle,
    price,
    regular_price,
    periodicity_unit,
    periodicity_value,
    handleClickRegister,
}: CourseSessionCardProps) => {
    const { t } = useTranslation();

    const [openSessionSchedule, setOpenSessionSchedule] = useState(false);

    if (!session) {
        return null; // Return null if session is not provided
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-[#0c1427] p-4 rounded-md mt-2">
                <div className="mb-4 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 w-full md:w-3/6">
                    {/* <h2 className="text-lg font-bold"> {courseTitle}</h2> */}
                    <p className="flex">
                        <FaMapMarker className="inline-block mr-2 text-gray-500 dark:text-gray-400" />
                        <h2>{session.location}</h2>
                    </p>
                    <p>
                        <a className="underline" onClick={() => setOpenSessionSchedule(true)}>
                            Horraires
                        </a>
                    </p>
                </div>

                <div className="mb-4 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 w-full md:w-2/6">
                    <div className="flex items-center">
                        <div className="flex items-center justify-between space-x-4">
                            <div className="border border-secondary bg-teal-100 dark:bg-teal-300 rounded-full flex items-center justify-center p-2 ">
                                {session.start_date}
                            </div>
                            <ArrowRight className="text-gray-500 dark:text-gray-400" />
                            <div className="border border-secondary bg-teal-100 dark:bg-teal-300 rounded-full flex items-center justify-center p-2 ">
                                {session.end_date}
                            </div>
                        </div>
                    </div>
                </div>

                <BtnSecondary
                    label={t('COURSE.DETAIL.REGISTER', 'Inscription')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full border-transparent hover:border-transparent transition-colors duration-300 ease-in-out"
                    onClick={handleClickRegister}
                />
            </div>
            <CourseSessionScheduleDialog session={session} isOpen={openSessionSchedule} onOpenChange={setOpenSessionSchedule} />
        </div>
    );
};
