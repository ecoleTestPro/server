import { ICourse, ICourseCategory } from '@/types/course';
import { useTranslation } from 'react-i18next';

export const staticCategoriesWithCourses: ICourseCategory[] = [
    {
        id: 2,
        title: 'Digital Marketing',
        is_featured: true,
        courses: [
            {
                title: 'Social Media Marketing Starter Kit (sSOMEkL)',
                nextSession: '23.06.25 - 25.06.25',
                price: 180000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Rédaction pour Réseaux Sociaux (sFSM)',
                nextSession: '25.06.25',
                price: 85000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Facebook Advertising (fABOOK)',
                nextSession: '30.06.25',
                price: 85000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 3,
        title: 'IT Architecture & Software Engineering Modelling',
        is_featured: false,
        courses: [
            {
                title: 'Ansible - Fondamenteaux (aANSFo)',
                nextSession: '23.06.25 - 24.06.25',
                price: 160000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 4,
        title: 'Java, Python & Web',
        is_featured: false,
        courses: [
            {
                title: 'Introduction à CSS3 (iC3)',
                nextSession: '27.06.25',
                price: 65000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
            {
                title: 'Python - Data Scientist (pYDATa)',
                nextSession: '03.07.25 - 04.07.25',
                price: 160000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 5,
        title: 'Programmer',
        is_featured: false,
        courses: [
            {
                title: 'Introduction à C# (CSe)',
                nextSession: '03.07.25 - 04.07.25',
                price: 160000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
    {
        id: 6,
        title: 'SAP',
        is_featured: false,
        courses: [
            {
                title: 'SAP / Hana CP - Fondamenteaux (sSAPg)',
                nextSession: '23.06.25',
                price: 90000,
                id: '',
                image: '',
                excerpt: '',
                description: '',
                duration: '',
                lectures: '',
                regular_price: 0,
                author: '',
                is_featured: false,
                is_published: false,
                price_includes_tax: false,
                location_mode: '',
            },
        ],
    },
];

const OurCurrentCourses = () => {
    const { t } = useTranslation();
    const courses: ICourseCategory[] = staticCategoriesWithCourses;

    const renderCourseTable = (courses: ICourse[]) => {
        return (
            <div className="bg-white dark:bg-[#1a1f33] rounded-md shadow-md overflow-hidden mb-6">
                <div className="table-responsive overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead className="text-black dark:text-white">
                            <tr>
                                <th className="w-2/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap first:rounded-tl-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.TITLE', 'Titre')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.NEXT_SESSION', 'Prochaine session')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.LANG', 'Langue')}
                                </th>
                                <th className="w-1/5 bg-gray-50 px-5 py-3 font-medium whitespace-nowrap last:rounded-tr-md ltr:text-left rtl:text-right dark:bg-[#15203c]">
                                    {t('COURSE.TABLE.PRICE', 'Prix')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-black dark:text-white">
                            {courses.map((item, index) => (
                                <tr key={index}>
                                    <td className="w-2/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {item.title}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                       {item.nextSession}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        {'FR'}
                                    </td>
                                    <td className="w-1/5 border-b border-gray-100 px-5 py-4 whitespace-nowrap ltr:text-left rtl:text-right dark:border-[#172036]">
                                        <span className="block font-medium">FCFA {item.price / 100}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderCourseSection = (title: string, coursesList: ICourseCategory[]) => (
        <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            {coursesList.map((category) => renderCourseTable(category.courses || []))}
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-3xl font-bold">Nos cours du moment</h1>
            {courses.map((category) => renderCourseSection(category.title, [category]))}
        </div>
    );
};

export default OurCurrentCourses;