import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { IMainMenuItem } from '@/types/header.type';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import HeaderUserAction from './headerUserAction';
import NavMenu from './navigationMenu';

const DEFULAT_MAIN_MENU: IMainMenuItem[] = [
    {
        id: 'formations',
        label: 'Formations',
        href: '/formations',
        title: 'Formations',
        description:
            'Les formations vous préparent au passage de nombreuses certifications internationales. Validez vos compétences et accroissez votre employabilité ainsi que votre efficacité au sein de votre entreprise.',
    },
    {
        id: 'certifications',
        label: 'Certifications',
        href: '/certifications',
        title: 'Certifications',
        description: 'Découvrez nos certifications qui valident vos compétences professionnelles.',
    },
    { id: 'entreprises', label: 'Offre pour entreprises', href: '/entreprise' },
    { id: 'evenements', label: 'Événements', href: '/evenements' },
    { id: 'blog', label: 'Blog/News', href: '/blog' },
];

const DEFULAT_MAIN_MENU_RIGHT: IMainMenuItem[] = [
    { id: 'a-propos', label: 'À propos de EcoleTestProp', href: '/a-propos' },
    { id: 'contact', label: 'Contact', href: '/contact', isCta: true },
];

const formationMainMenuPartChildren = {
    id: 'formations',
    label: 'Formations',
    href: '/formations',
    title: 'Formations',
    description:
        'Les formations vous préparent au passage de nombreuses certifications internationales. Validez vos compétences et accroissez votre employabilité ainsi que votre efficacité au sein de votre entreprise.',
    children: {
        id: 'formations',
        title: 'Formations',
        description: 'Découvrez nos formations et certifications.',
        items: [
            {
                id: 'formation-1',
                label: 'Microsoft',
                href: '/formations/formation-1',
                subItems: [
                    { id: 'azure', label: 'Azure', href: '/formations/formation-1/azure' },
                    { id: 'microsoft-365', label: 'Microsoft 365', href: '/formations/formation-1/microsoft-365' },
                    { id: 'windows-server', label: 'Windows Server', href: '/formations/formation-1/windows-server' },
                    { id: 'sql-server', label: 'SQL Server', href: '/formations/formation-1/sql-server' },
                    { id: 'power-platform', label: 'Power Platform', href: '/formations/formation-1/power-platform' },
                    { id: 'sharepoint', label: 'SharePoint', href: '/formations/formation-1/sharepoint' },
                    { id: 'microsoft-teams', label: 'Microsoft Teams', href: '/formations/formation-1/microsoft-teams' },
                    { id: 'microsoft-dynamics', label: 'Microsoft Dynamics', href: '/formations/formation-1/microsoft-dynamics' },
                ],
            },
            {
                id: 'formation-2',
                label: 'Cybersecurity',
                href: '/formations/formation-2',
                subItems: [
                    { id: 'cybersecurity-1', label: 'Cybersecurity 1', href: '/formations/formation-2/cybersecurity-1' },
                    { id: 'cybersecurity-2', label: 'Cybersecurity 2', href: '/formations/formation-2/cybersecurity-2' },
                    { id: 'cybersecurity-3', label: 'Cybersecurity 3', href: '/formations/formation-2/cybersecurity-3' },
                    { id: 'cybersecurity-4', label: 'Cybersecurity 4', href: '/formations/formation-2/cybersecurity-4' },
                ],
            },
            { id: 'formation-3', label: 'Formation 3', href: '/formations/formation-3' },
        ],
        featured: [{ id: 'formation-vedette-1', label: 'Formation vedette 1', href: '/formations/formation-vedette-1' }],
    },
};

export default function Header() {
    const { auth, data } = usePage<SharedData>().props;
    const page = usePage<SharedData>();

    const [mainMenu, setMainMenu] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU);
    const [mainMenuRight, setMainMenuRight] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU_RIGHT);

    const getInitials = useInitials();

    // Logo
    const logo = {
        text: 'EcoleTestProp',
        href: '/',
    };

    // Langues disponibles
    const languages = [
        { code: 'FR', label: 'FR' },
        { code: 'EN', label: 'EN' },
    ];

    useEffect(() => {
        // Initialize main menu and right menu when component mounts or data changes
        const mainMenuInit: IMainMenuItem[] = DEFULAT_MAIN_MENU;
        const mainMenuRightInit: IMainMenuItem[] = DEFULAT_MAIN_MENU_RIGHT;
        setMainMenu(mainMenuInit);
        setMainMenuRight(mainMenuRightInit);

        if (data.categoriesWithCourses) {
            updateCourseMenuPart();
        }

        console.log('[Header] data', data.categoriesWithCourses);
    }, [data, page, data]);

    const updateCourseMenuPart = () => {
        const updatedMenu = mainMenu.map((item) => {
            if (item.id === 'formations') {
                return {
                    ...item,
                    children: {
                        id: 'formations-children',
                        title: 'Formations',
                        description: 'Liste des formations',
                        items: data.categoriesWithCourses.map((category) => ({
                            id: category.id?.toString() || '',
                            label: category.title,
                            href: `/formations/${category.id}`,
                            title: category.title,
                            subItems:
                                category.courses?.map((course) => ({
                                    id: course.id.toString(),
                                    label: course.title,
                                    href: `/formations/${category.id}/courses/${course.id}`,
                                })) || [],
                        })),
                    },
                };
            }
            return item;
        });

        setMainMenu(updatedMenu);
    };

    return (
        <header className="border-t-1 border-b bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            {/* Top Bar */}
            <div className="mx-auto flex items-center justify-between p-4">
                <Link href={logo.href} className="text-xl font-bold text-green-500">
                    {logo.text}
                </Link>

                {/* Search Form */}
                <div className="flex items-center space-x-4">
                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher par formation, événement, ..."
                            className="w-64 rounded-xl border border-green-500 px-3 py-2"
                        />
                        <button type="submit" className="absolute top-0 right-0 mt-3 mr-3 focus:outline-none" aria-label="Rechercher">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Language Selector */}
                    {false && (
                        <div className="dropdown relative">
                            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none">
                                {languages.find((lang) => lang.code === 'FR')?.label}
                            </button>
                        </div>
                    )}

                    <HeaderUserAction />

                    {/* Dark Mode Toggle */}
                    {/* <AppearanceToggleTab /> */}
                    <AppearanceToggleDropdown />
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mx-auto p-4">
                <div className="grid grid-cols-5 gap-4">
                    {/* Main Menu */}
                    <div className="col-span-3">
                        <NavMenu menu={mainMenu} />
                    </div>

                    {/* Menu Right */}
                    <div className="col-span-2 col-start-4">
                        <div className="flex items-center justify-end">
                            <ul className="flex space-x-4">
                                {mainMenu &&
                                    mainMenuRight.map(({ label, href, isCta }, index) => (
                                        <li key={index}>
                                            <Link
                                                href={href ?? '#'}
                                                className={`${
                                                    isCta
                                                        ? 'rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600'
                                                        : 'text-gray-700 transition hover:text-green-500'
                                                }`}
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>{' '}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
