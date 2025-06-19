import { CLASS_NAME } from '@/data/styles/style.constant';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface CourseDetailAccordionProps {
    section: string;
    toggleSection: (section: string) => void;
    isOpen: { [key: string]: boolean };
    content: JSX.Element;
}

export default function CourseDetailAccordion({ section, toggleSection, isOpen, content }: CourseDetailAccordionProps) {
    const { t } = useTranslation();

    return (
        <div className={`${CLASS_NAME.bgWhite} mb-6  rounded-lg shadow-md p-4`}>
            <button
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
            >
                <span className='text-2xl capitalize font-bold text-black dark:text-white'> {t(`COURSE.DETAIL.${section.toUpperCase()}`, section)}</span>
                <span className={`transform transition-transform ${isOpen[section] ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen[section] && <div>{content}</div>}
        </div>
    );
}
