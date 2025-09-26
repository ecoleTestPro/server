import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill-new/dist/quill.snow.css';
import CourseQuestionForm from '../questions/CourseQuestionForm';
import CourseDetailAccordion from './CourseDetailAccordion';

const email: string = 'info@testpro-group.com';

interface QuestionCourseProps {
    course: ICourse;
}

const QuestionCourse: React.FC<QuestionCourseProps> = ({ course }) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
        questions: false,
    });

    const toggleSection = (section: string) => {
        setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPaddingAlt} bg-white dark:bg-[#0a0e19]`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Questions sur le cours</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="toc-accordion col-span-1 md:col-span-2" id="tablesOfContentAccordion">
                        <div className="">
                            {/* Questions sur le cours */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                section={'questions'}
                                sectionTitle={t('COURSE.DETAIL.QUESTIONS', 'Avez-vous des questions?')}
                                content={
                                    <>
                                        <div>
                                            {false && (
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Pour toute question, n'hésitez pas à contacter : {email}. Si vous souhaitez réserver ce
                                                    cours en tant qu'individu ou entreprise, merci de vous adresser à :{' '}
                                                    <a className="text-secondary underline" href={`mailto:${email}`}>
                                                        {email}
                                                    </a>
                                                    .
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <CourseQuestionForm course={course} />
                                        </div>
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestionCourse;