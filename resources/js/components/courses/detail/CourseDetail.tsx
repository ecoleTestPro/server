import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { getMediaUrl } from '@/utils/utils';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import CourseDetailAccordion from './CourseDetailAccordion';
import CoursePartners from './CoursePartners';
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

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPadding}`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">{course.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        className="toc-accordion col-span-1 md:col-span-2"
                        id="tablesOfContentAccordion"
                    >
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
                            {course.description?.why_choose && (
                                <CourseDetailAccordion
                                    isOpen={isOpen}
                                    toggleSection={toggleSection}
                                    section={'whyChoose'}
                                    sectionTitle="Pourquoi choisir cette formation ?"
                                    content={<div dangerouslySetInnerHTML={{ __html: course.description.why_choose }} />}
                                />
                            )}
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
                            {false && (
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
                            )}
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
                        </div>{' '}
                    </div>

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
                                            <img
                                                src={getMediaUrl(course.organization_logo)}
                                                alt="Organization logo"
                                                className="h-48 w-auto object-contain"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        {/* Informations supplémentaires et bouton d'inscription */}
                        {/* Registration Section with ref */}
                        <div className="">
                            {/* ref={registrationRef} */}
                            <div>
                                {/* registrationRef={registrationRef} */}
                                <CourseDetailChooseSection course={course} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <CoursePartners partners={course.partners} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseDetail;
