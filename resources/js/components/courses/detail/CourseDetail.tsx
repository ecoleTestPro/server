import BtnSecondary from '@/components/ui/button/btn-secondary';
import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseDetailAccordion from './CourseDetailAccordion';

interface CourseDetailProps {
    course: ICourse;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
        objectives: true,
        content: false,
        targetAudience: false,
        prerequisites: false,
        questions: false,
    });

    const toggleSection = (section: string) => {
        setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <section className={`${CLASS_NAME.section} ${CLASS_NAME.sectionContentPadding}`}>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">{course.title}</h1>

                {/* Objectifs */}
                <CourseDetailAccordion isOpen={isOpen} toggleSection={toggleSection} section={'objectives'} content={<div> {course.excerpt} </div>} />

                {/* Contenu */}

                <CourseDetailAccordion
                    isOpen={isOpen}
                    toggleSection={toggleSection}
                    section={'content'}
                    content={<div> {course.description.content} </div>}
                />

                {/* Public cible */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('targetAudience')}
                        className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
                    >
                        {t('COURSE.DETAIL.TARGET_AUDIENCE', 'Public cible')}
                        <span className={`transform transition-transform ${isOpen.targetAudience ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen.targetAudience && (
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('COURSE.DETAIL.TARGET_AUDIENCE_DESC', 'Professionnels souhaitant utiliser SharePoint.')}
                        </p>
                    )}
                </div>

                {/* Prérequis */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('prerequisites')}
                        className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
                    >
                        {t('COURSE.DETAIL.PREREQUISITES', 'Prérequis')}
                        <span className={`transform transition-transform ${isOpen.prerequisites ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen.prerequisites && (
                        <p className="text-gray-600 dark:text-gray-300">
                            {t('COURSE.DETAIL.PREREQUISITES_DESC', 'Connaissances de base en informatique.')}
                        </p>
                    )}
                </div>

                {/* Téléchargement */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('download')}
                        className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
                    >
                        {t('COURSE.DETAIL.DOWNLOAD', 'Téléchargement')}
                        <span className={`transform transition-transform ${isOpen.download ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen.download && (
                        <p className="text-gray-600 dark:text-gray-300">
                            <a href="#" className="text-blue-500 underline">
                                {t('COURSE.DETAIL.DOWNLOAD_PDF', 'Téléchargez les détails du cours au format PDF')}
                            </a>
                        </p>
                    )}
                </div>

                {/* Questions sur le cours */}
                <div className="mb-6">
                    <button
                        onClick={() => toggleSection('questions')}
                        className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
                    >
                        {t('COURSE.DETAIL.QUESTIONS', 'Questions sur le cours')}
                        <span className={`transform transition-transform ${isOpen.questions ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen.questions && (
                        <div className="text-gray-600 dark:text-gray-300">
                            <p>{t('COURSE.DETAIL.HAVE_QUESTIONS', 'Avez-vous des questions ?')}</p>
                            <p>{t('COURSE.DETAIL.RESERVE', "Je souhaite réserver ce cours en tant que cours d'entreprise")}</p>
                        </div>
                    )}
                </div>

                {/* Informations supplémentaires et bouton d'inscription */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-[#0c1427] p-4 rounded-md mt-6">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {t('COURSE.DETAIL.NEXT_DATE', 'Prochaine date')} <span className="font-medium">23</span> |{' '}
                            {t('COURSE.DETAIL.LOCATION', 'Lausanne, Français')} | {t('COURSE.DETAIL.PRICE', '900 FCFA')}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {t('COURSE.DETAIL.DURATION', "Formation garantie. Plus de 5 jours avant le début de l'inscription avec 100%")}
                        </p>
                    </div>
                    <BtnSecondary
                        label={t('COURSE.DETAIL.REGISTER', 'Inscription')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default CourseDetail;
