import BtnSecondary from '@/components/ui/button/btn-secondary';
import { ICourse } from '@/types/course';
import { getPeriodicity, getPrice } from '@/utils/utils';
import { RefObject, useEffect, useState } from 'react'; // Add necessary imports
import { useTranslation } from 'react-i18next';
import CourseInscriptionDialog from './CourseInscriptionDialog';

interface CourseDetailChooseSectionProps {
    course: ICourse;
    registrationRef: RefObject<HTMLDivElement | null>; // Add ref prop
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
        if (registrationRef.current) {
            observer.observe(registrationRef.current);
        }

        // Cleanup observer on unmount
        return () => {
            if (registrationRef.current) {
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
            <div
                className={`fixed bottom-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'relative -translate-y-full'}`}
            >
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-[#0c1427] p-4 rounded-md mt-2">
                        <div className="mb-4 md:mb-0">
                            {isVisible && <h2 className="text-lg font-bold"> {course.title}</h2>}

                            <p className="text-lg ">
                                {t('COURSE.PRICE', 'Prix')}{' '}
                                <span className="" dangerouslySetInnerHTML={{ __html: getPrice(course.price, course.regular_price) }} />
                            </p>
                            <p className=" text-gray-600 dark:text-gray-300">
                                {t('COURSE.DURATION', 'Durée')}{' '}
                                <span className="">{getPeriodicity(course.periodicity_unit, course.periodicity_value)} </span>
                            </p>
                        </div>

                        <BtnSecondary
                            label={t('COURSE.DETAIL.REGISTER', 'Inscription')}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full border-transparent hover:border-transparent transition-colors duration-300 ease-in-out"
                            onClick={() => setIsDialogOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <CourseInscriptionDialog course={course} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
}
