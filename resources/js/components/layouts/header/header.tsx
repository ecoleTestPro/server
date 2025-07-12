import { DEFULAT_MAIN_MENU, DEFULAT_MAIN_MENU_RIGHT } from '@/data/data.constant';
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { IMainMenuItem, MenuChildItem } from '@/types/header.type';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderNavTwoSidebar } from './HeaderNavTwoMobile';
import { HeaderNavTwo } from './header-nav-two';
import HeaderSearch from './header-search';
import HeaderUserAction from './headerUserAction';
import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

export default function Header() {
    const { auth, data } = usePage<SharedData>().props;
    const page = usePage<SharedData>();
    const { t } = useTranslation();

    const headerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [mainMenu, setMainMenu] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU);
    const [mainMenuRight, setMainMenuRight] = useState<IMainMenuItem[]>(DEFULAT_MAIN_MENU_RIGHT);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const logo = { href: '/' };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling vers le bas et au-delà de 50px
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling vers le haut
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    useEffect(() => {
        const mainMenuInit: IMainMenuItem[] = DEFULAT_MAIN_MENU;
        const mainMenuRightInit: IMainMenuItem[] = DEFULAT_MAIN_MENU_RIGHT;
        setMainMenu(mainMenuInit);
        setMainMenuRight(mainMenuRightInit);

        if (data && data.categories_with_courses && data.categories_with_courses.length > 0) {
            // console.log('[Header] categories_with_courses', data.categories_with_courses);
            updateCourseMenuPart(mainMenuInit, setMainMenu, data);
        }
    }, [data, page]);

    const buildCourseItems = (category: ICourseCategory): MenuChildItem[] => {
        // console.log('[buildCourseItems] category courses', category?.courses);
        if (!category.courses || category.courses.length === 0) return [];

        return category.courses.slice(0, 4).map((course) => ({
            id: course.id?.toString() || '',
            label: course.title || 'Cours sans titre',
            href: ROUTE_MAP.public.courses.detail(category.slug || '', course.slug || '').link,
            description: course.excerpt || '',
            image: course.image || undefined,
        }));
    };

    const buildCategoryItems = (categories: ICourseCategory[], parentId: number | null = null): MenuChildItem[] => {
        // Filtrer les catégories dont le parent est `parentId`
        const filteredCategories = categories.filter((category) => category); // .parent_id === parentId

        const output: MenuChildItem[] = filteredCategories.map((category) => {
            // console.log('[buildCategoryItems] category title', category.title);

            const defaultDescription =
                'Les formations vous préparent au passage de nombreuses certifications internationales. Validez vos compétences et accroissez votre employabilité ainsi que votre efficacité au sein de votre entreprise.';

            let childItems: MenuChildItem[] = [];

            // Appeler récursivement uniquement sur les enfants directs
            if (category.children && category.children.length > 0) {
                // console.log('[buildCategoryItems] category children', category.children);
                childItems = buildCategoryItems(category.children, category.id || null);
            } else {
                childItems = buildCourseItems(category);
            }

            const menuChildItem: MenuChildItem = {
                id: category.id?.toString() || '',
                label: category.title || 'Catégorie sans titre',
                description: category.description || defaultDescription,
                href: ROUTE_MAP.public.courses.byCategory(category.slug).link,
                image: category.image?.src || '/assets/images/bg-03.jpg',
                subItems: childItems,
            };

            return menuChildItem;
        });

        // // TODO : ajouter dynamiquement
        // output.push({
        //     id: 'programmes-de-reconversion',
        //     label: PROGRAMMES_DE_RECONVERSION.label,
        //     href: PROGRAMMES_DE_RECONVERSION.href,
        //     description: PROGRAMMES_DE_RECONVERSION.description,
        //     image: PROGRAMMES_DE_RECONVERSION.image,
        // });

        return output;
    };

    const PROGRAMMES_DE_RECONVERSION: MenuChildItem = {
        id: 'programmes-de-reconversion',
        label: 'Programmes de reconversion',
        href: ROUTE_MAP.public.reconversionMetier.link,
        description: 'Découvrez nos programmes de reconversion professionnelle.',
        image: 'https://placehold.jp/150x150.png',
    };

    const updateCourseMenuPart = (
        mainMenu: IMainMenuItem[],
        setMainMenu: (menu: IMainMenuItem[]) => void,
        data: { categories_with_courses?: ICourseCategory[] },
    ) => {
        // Mettre à jour le menu principal
        const updatedMenu: IMainMenuItem[] = mainMenu.map((item): IMainMenuItem => {
            if (item.id !== 'formations' || !data?.categories_with_courses) {
                return item;
            }

            // console.log('[CATEGORIES_WITH_COURSES]', data.categories_with_courses);

            return {
                ...item,
                children: {
                    id: 'formations-children',
                    title: 'Formations',
                    description: 'Liste des formations',
                    items: [
                        PROGRAMMES_DE_RECONVERSION,
                        ...buildCategoryItems(data.categories_with_courses),
                    ],
                },
            };
        });

        console.log('[Header] Updated main menu with courses', updatedMenu);

        setMainMenu(updatedMenu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Top Header & Infos flash section */}
            <header
                className={` top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 transition-transform duration-300 ${lastScrollY > 200 ? 'fixed shadow-lg ' : 'relative'}  ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
                ref={headerRef}
            >
                {false && (
                    <section className="px-4 py-1 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-2 text-sm text-gray-700 sm:px-6 dark:bg-gray-800 dark:text-white">
                            <span>{t('HEADER.WELCOME', '')}</span>
                            <div className="flex space-x-4">
                                <Link href={ROUTE_MAP.public.aboutUs.link} className="text-primary-600 dark:text-primary-400 hover:underline">
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
                                <AppLogo width={150} height={60} className="" />
                            </Link>

                            <div className="flex-1">
                                <div className=" h-[60px] flex justify-center items-center">
                                    <HeaderSearch className="hidden sm:block" />
                                </div>
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

            <HeaderNavTwoSidebar
                menu={mainMenu}
                menuRight={mainMenuRight}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                className="md:hidden"
            />
        </>
    );
}
