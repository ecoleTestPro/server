import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

interface CourseDetailAccordionProps {
    section: string;
    sectionTitle?: string;
    toggleSection: (section: string) => void;
    isOpen: { [key: string]: boolean };
    content: JSX.Element;
}

export default function CourseDetailAccordion({ section, sectionTitle, toggleSection, isOpen, content }: CourseDetailAccordionProps) {
    const { t } = useTranslation();

    return (
        <div className="toc-accordion-item mb-[15px] rounded-md bg-white text-black last:mb-0 dark:bg-[#0c1427] dark:text-white">
            <button
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center w-full text-lg font-medium text-black dark:text-white mb-2"
            >
                <div className="cursor-pointer flex w-full justify-between items-center px-[20px] py-[13px] text-base font-medium md:px-[25px] md:text-[15px] ltr:text-left ">
                    <span className="text-2xl capitalize font-bold text-black dark:text-white">
                        {sectionTitle ?? t(`COURSE.DETAIL.${section.toUpperCase()}`, section)}
                    </span>
                    <span className={`transform transition-transform ${isOpen[section] ? 'rotate-180' : ''}`}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 "
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>
            </button>
            {isOpen[section] && <div className="toc-accordion-collapse px-[20px] pb-[20px] md:px-[25px] ">{content}</div>}
        </div>
    );
}
