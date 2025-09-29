import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { sanitizeHTML } from '@/utils/quill-html-parser';
import { getMediaUrl } from '@/utils/utils';
import { JSX, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import CourseDetailAccordion from './CourseDetailAccordion';
import CouseDetailMedia from './CouseDetailMedia';

interface DescriptionCourseProps {
    course: ICourse;
}

const DescriptionCourse: React.FC<DescriptionCourseProps> = ({ course }) => {
    // Styles pour le rendu du contenu HTML riche
    const proseClasses =
        'prose prose-sm max-w-none prose-headings:text-gray-900 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-li:marker:text-blue-500 prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-blockquote:text-gray-600 prose-blockquote:border-l-blue-500';

    // Composant helper pour rendre le HTML avec les styles appropriés
    const RichContent = ({ html }: { html: string }) => {
        const cleanedHTML = sanitizeHTML(html);
        // Logger.log('[CourseDetail] Cleaned HTML:', cleanedHTML);

        return <div className={proseClasses} dangerouslySetInnerHTML={{ __html: cleanedHTML }} />;
    };

    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
        objectives: true,
        why_choose: false,
        overviewDetails: false,
        content: false,
        targetAudience: false,
        prerequisites: false,
        evaluation: false,
        pedagogical_objectives: false,
        course_strengths: false,
        exam: false,
        download: false,
        questions: false,
    });

    const toggleSection = (section: string) => {
        setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const Media = (): JSX.Element => {
        return (
            <div className="col-span-1 md:col-span-1">
                <div className="grid grid-cols-1 gap-y-2">
                    <div>
                        <CouseDetailMedia course={course} />
                    </div>
                    {(course.logo || course.organization_logo) && (
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <div>
                                {course.logo && (
                                    <img src={getMediaUrl(course.logo)} alt={`${course.title} logo`} className="h-48 w-auto object-contain" />
                                )}
                            </div>
                            <div>
                                {course.organization_logo && (
                                    <img src={getMediaUrl(course.organization_logo)} alt="Organization logo" className="h-48 w-auto object-contain" />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPaddingAltNoBottom} bg-white dark:bg-[#0a0e19]`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Description de la formation</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="toc-accordion col-span-1 md:col-span-2" id="tablesOfContentAccordion">
                        <div className="">
                            {/* Objectifs */}
                            {course.description?.pedagogical_objectives && course.description?.pedagogical_objectives != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'objectives'}
                                    sectionTitle="Objectifs"
                                    content={<RichContent html={course.description?.pedagogical_objectives ?? ''} />}
                                />
                            )}

                            {/* Contenu */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                sectionTitle="Contenu"
                                section={'content'}
                                content={<RichContent html={course.description?.content ?? ''} />}
                            />

                            {/* Pourquoi choisir cette formation ? */}
                            {course.description?.why_choose && course.description?.why_choose != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'whyChoose'}
                                    sectionTitle="Pourquoi choisir cette formation ?"
                                    content={<RichContent html={course.description.why_choose} />}
                                />
                            )}

                            {/* Public cible */}
                            {course.description?.target_audience && course.description?.target_audience != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'targetAudience'}
                                    sectionTitle="Public cible"
                                    content={<RichContent html={course.description.target_audience} />}
                                />
                            )}

                            {/* Prérequis */}
                            {course.description?.prerequisites && course.description?.prerequisites != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'prerequisites'}
                                    sectionTitle="Prérequis"
                                    content={<RichContent html={course.description?.prerequisites ?? ''} />}
                                />
                            )}

                            {/* Évaluation */}
                            {course.description?.evaluation && course.description?.evaluation != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'evaluation'}
                                    sectionTitle="Évaluation"
                                    content={<RichContent html={course.description?.evaluation ?? ''} />}
                                />
                            )}

                            {/* Points forts du cours */}
                            {course.description?.course_strengths && course.description?.course_strengths != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'course_strengths'}
                                    sectionTitle="Points forts du cours"
                                    content={<RichContent html={course.description?.course_strengths ?? ''} />}
                                />
                            )}
                            {course.description?.exam && course.description?.exam != '<p><br></p>' && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'exam'}
                                    sectionTitle="Détails de l'examen"
                                    content={<RichContent html={course.description?.exam ?? ''} />}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-1">
                        <Media />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionCourse;
