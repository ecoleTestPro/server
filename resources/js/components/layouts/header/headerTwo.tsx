import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { DEFULAT_MAIN_MENU, DEFULAT_MAIN_MENU_RIGHT } from '@/data/data.constant';
import { SharedData } from '@/types';
import { IMainMenuItem } from '@/types/header.type';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderNavTwoSidebar } from './HeaderNavTwoMobile';
import { HeaderNavTwo } from './header-nav-two';
import HeaderSearch from './header-search';
import HeaderUserAction from './headerUserAction';

export default function HeaderTwo() {
    const { auth, data } = usePage<SharedData>().props;
    const page = usePage<SharedData>();
    const { t } = useTranslation();

    const [mainMenu, setMainMenu] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU);
    const [mainMenuRight, setMainMenuRight] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU_RIGHT);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logo = { href: '/' };

    useEffect(() => {
        const mainMenuInit: IMainMenuItem[] = DEFULAT_MAIN_MENU;
        const mainMenuRightInit: IMainMenuItem[] = DEFULAT_MAIN_MENU_RIGHT;
        setMainMenu(mainMenuInit);
        setMainMenuRight(mainMenuRightInit);

        if (data && data.categoriesWithCourses && data.categoriesWithCourses.length > 0) {
            updateCourseMenuPart();
        }

        console.log('[Header] data', data);
    }, [data, page]);

    const updateCourseMenuPart = () => {
        const updatedMenu = mainMenu.map((item) => {
            if (data && data.categoriesWithCourses && item.id === 'formations') {
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Top Header & Infos flash section */}
            <header className="shadow-sm">
                {false && (
                    <section className="px-4 py-1 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm text-gray-700 sm:px-6 dark:bg-gray-800 dark:text-white">
                            <span>{t('HEADER.WELCOME', '')}</span>
                            <div className="flex space-x-4">
                                <Link href={ROUTE_MAP.aboutUs.link} className="text-primary-600 dark:text-primary-400 hover:underline">
                                    {t('HEADER.CAREERS', 'Carrières')}
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* sticky top-0 z-50 */}
                <section className="">
                    <div className="flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
                        <div className="flex flex-1">
                            <Link href={logo.href} className="flex items-center space-x-2">
                                <AppLogo width={80} height={60} className="" />
                            </Link>

                            <div className="flex-1">
                                <HeaderSearch className="hidden sm:block" />
                            </div>

                            <div className="ml-auto flex items-center gap-3">
                                <HeaderUserAction />
                                <AppearanceToggleDropdown />
                                <button
                                    onClick={toggleSidebar}
                                    aria-label={t('HEADER.TOGGLE_MENU', 'Ouvrir/fermer le menu')}
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 hover:text-gray-800 md:hidden dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden px-4 py-2 md:block md:py-1 lg:px-8">
                        <HeaderNavTwo menu={mainMenu} menuRight={mainMenuRight} />
                    </div>
                </section>
            </header>

            <HeaderNavTwoSidebar menu={mainMenu}  menuRight={mainMenuRight} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} className="md:hidden" />
        </>
    );
}
