import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseDetailAccordion from './CourseDetailAccordion';
import CouseDetailMedia from './CouseDetailMedia';
import CourseDetailChooseSection from './partial/CourseDetailChooseSection';
import CourseDetailOverview from './partial/CourseDetailOverview';

const email: string = 'info@ecoletestpro.com';

interface CourseDetailProps {
    course: ICourse;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
    const { t } = useTranslation();
    const registrationRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
        objectives: true,
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

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPadding}`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">{course.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="toc-accordion col-span-1 md:col-span-2" id="tablesOfContentAccordion">
                        <div className="">
                            {/* Objectifs */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                section={'objectives'}
                                sectionTitle="Objectifs"
                                content={<div dangerouslySetInnerHTML={{ __html: course.excerpt }} />}
                            />
                            {/* Public cible */}
                            {course.description?.target_audience && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'targetAudience'}
                                    sectionTitle="A qui s'adresse cette formation ?"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description.target_audience }} />}
                                />
                            )}
                            {/* Détails de la formation */}
                            {false && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'overviewDetails'}
                                    sectionTitle="Détails de la formation"
                                    content={<CourseDetailOverview course={course} />}
                                />
                            )}
                            {/* Prérequis */}
                            {course.description?.prerequisites && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'prerequisites'}
                                    sectionTitle="Prérequis"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description?.prerequisites ?? '' }} />}
                                />
                            )}
                            {/* Contenu */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                sectionTitle="Contenu"
                                section={'content'}
                                content={<div dangerouslySetInnerHTML={{ __html: course.description?.content ?? '' }} />}
                            />
                            {/* Évaluation */}
                            {course.description?.evaluation && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'evaluation'}
                                    sectionTitle="Évaluation"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description?.evaluation ?? '' }} />}
                                />
                            )}
                            {/* Objectifs pédagogiques */}
                            {course.description?.pedagogical_objectives && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'pedagogicalObjectives'}
                                    sectionTitle="Objectifs pédagogiques"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description?.pedagogical_objectives ?? '' }} />}
                                />
                            )}
                            {/* Points forts du cours */}
                            {course.description?.course_strengths && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'course_strengths'}
                                    sectionTitle="Points forts du cours"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description?.course_strengths ?? '' }} />}
                                />
                            )}
                            {course.description?.exam && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'exam'}
                                    sectionTitle="Détails de l'examen"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description?.exam ?? '' }} />}
                                />
                            )}
                            {/* Téléchargement */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                section={'download'}
                                sectionTitle={t('COURSE.DETAIL.DOWNLOAD', 'Téléchargement')}
                                content={
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <a href="#" className="text-secondary underline">
                                            {t('COURSE.DETAIL.DOWNLOAD_PDF', 'Téléchargez les détails du cours au format PDF')}
                                        </a>
                                    </p>
                                }
                            />
                            {/* Questions sur le cours */}
                            <CourseDetailAccordion
                                isOpen={isOpen}
                                toggleSection={toggleSection}
                                section={'questions'}
                                sectionTitle={t('COURSE.DETAIL.QUESTIONS', 'Questions sur le cours')}
                                content={
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Pour toute question, n'hésitez pas à contacter : {email}. Si vous souhaitez réserver ce cours en tant
                                        qu'individu ou entreprise, merci de vous adresser à :{' '}
                                        <a className="text-secondary underline" href={`mailto:${email}`}>
                                            {email}
                                        </a>
                                        .
                                    </p>
                                }
                            />
                            {/* Informations supplémentaires et bouton d'inscription */}
                            {/* Registration Section with ref */}
                            <div ref={registrationRef}>
                                <CourseDetailChooseSection course={course} registrationRef={registrationRef} />
                            </div>
                        </div>{' '}
                    </div>

                    <div className="col-span-1 md:col-span-1">
                        <CouseDetailMedia course={course} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetail;
