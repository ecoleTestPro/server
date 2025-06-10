import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { DEFULAT_MAIN_MENU, DEFULAT_MAIN_MENU_RIGHT } from '@/data/data.constant';
import { SharedData } from '@/types';
import { IMainMenuItem } from '@/types/header.type';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { HeaderNavTwo } from './header-nav-two';
import HeaderSearch from './header-search';
import HeaderUserAction from './headerUserAction';

export default function HeaderTwo() {
    const { auth, data } = usePage<SharedData>().props;
    const page = usePage<SharedData>();

    const [mainMenu, setMainMenu] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU);
    const [mainMenuRight, setMainMenuRight] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU_RIGHT);

    // Logo
    const logo = {
        href: '/',
    };

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
        <div>
            <section>
                {/* Top Header */}
                <div className="flex items-center justify-between bg-white px-4 py-2 text-sm text-white">
                    <div>
                        <span>Bienvenue sur EcoleTestProp !</span>
                    </div>

                    <div className="flex space-x-4">
                        <Link href="/a-propos" className="text-primary hover:underline">
                            À propos
                        </Link>
                        <Link href="/contact" className="text-primary hover:underline">
                            Contact
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative z-50 flex min-h-[65px] border-b border-gray-300 bg-white px-4 py-3 tracking-wide sm:px-10">
                <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center gap-4">
                    <Link href={logo.href} className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <AppLogo width={100} height={85} />
                        </div>
                    </Link>

                    <div className="ml-auto flex gap-4">
                        <HeaderSearch />
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8">
                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <HeaderNavTwo menu={mainMenu} />
                        {/* <NavMenu menu={mainMenu} /> */}

                        <div className="flex items-center gap-4">
                            <HeaderUserAction />

                            {/* <AppearanceToggleTab /> */}
                            <AppearanceToggleDropdown />

                            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                                <span className="sr-only">Toggle menu</span>
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
            </section>
        </div>
    );
}
