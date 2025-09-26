import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import 'react-quill-new/dist/quill.snow.css';
import CourseDetailChooseSection from './partial/CourseDetailChooseSection';

interface ChooseSectionProps {
    course: ICourse;
}

const ChooseSection: React.FC<ChooseSectionProps> = ({ course }) => {
    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPaddingAltNoBottom} bg-white/15 dark:bg-[#0a0e19]`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Choisir une session</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="toc-accordion col-span-1 md:col-span-2" id="tablesOfContentAccordion">
                        <div className="col-span-1 md:col-span-3">
                            {/* Registration Section with ref */}
                            <div id="course-dates" className="">
                                {/* ref={registrationRef} */}
                                <div>
                                    {/* registrationRef={registrationRef} */}
                                    <CourseDetailChooseSection course={course} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChooseSection;