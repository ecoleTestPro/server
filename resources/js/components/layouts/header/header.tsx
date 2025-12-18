import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { DEFULAT_MAIN_MENU, DEFULAT_MAIN_MENU_RIGHT } from '@/data/data.constant';
import { SharedData } from '@/types';
import { ICourseCategory } from '@/types/course';
import { IMainMenuItem, MenuChildItem } from '@/types/header.type';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarMenu from './CalendarMenu';
import { HeaderNavTwo } from './header-nav-two';
import HeaderSearch from './header-search';
import HeaderMobile from './HeaderMobile';
import HeaderUserAction from './headerUserAction';
import SearchMobile from './SearchMobile';

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
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const logo = { href: '/' };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling vers le bas et au-delà de 200px
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY || currentScrollY <= 200) {
                // Scrolling vers le haut ou retour en haut de page
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
            Logger.log('[Header] categories_with_courses', data.categories_with_courses);
            updateCourseMenuPart(mainMenuInit, setMainMenu, data);
        }
    }, [data, page]);

    const buildCourseItems = (category: ICourseCategory): MenuChildItem[] => {
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
            const defaultDescription = '';

            let childItems: MenuChildItem[] = [];

            // Appeler récursivement uniquement sur les enfants directs
            if (category.children && category.children.length > 0) {
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

        return output;
    };

    const PROGRAMMES_DE_RECONVERSION: MenuChildItem = {
        id: 'programmes-de-reconversion',
        label: 'Programmes de reconversion',
        href: ROUTE_MAP.public.reconversionMetier.link,
        description: 'Découvrez nos programmes de reconversion professionnelle.',
        image: '/assets/images/Formation-en-ligne-.jpeg',
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

            return {
                ...item,
                children: {
                    id: 'formations-children',
                    title: 'Formations',
                    description: 'Liste des formations',
                    items: [...buildCategoryItems(data.categories_with_courses), PROGRAMMES_DE_RECONVERSION],
                },
            };
        });

        setMainMenu(updatedMenu);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setIsSearchOpen(false); // Fermer la recherche si le menu s'ouvre
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsSidebarOpen(false); // Fermer le menu si la recherche s'ouvre
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
                                <AppLogo width={150} height={60} className="hidden sm:block" />
                                <AppLogo width={120} height={48} className="block sm:hidden" />
                            </Link>

                            <div className="flex-1">
                                <div className=" h-[60px] flex justify-center items-center">
                                    <HeaderSearch className="hidden sm:block" />
                                </div>
                            </div>

                            <div className="ml-auto flex items-center gap-3">
                                <div className="hidden md:flex items-center gap-3">
                                    <HeaderUserAction />
                                    <AppearanceToggleDropdown />
                                </div>

                                {/* Mobile actions */}
                                <div className="flex items-center gap-2 md:hidden">
                                    {/* Timeline button - prominant sur mobile */}
                                    <CalendarMenu />

                                    {/* Search icon - ouvre le sidebar de recherche */}
                                    <button
                                        onClick={toggleSearch}
                                        aria-label={t('HEADER.SEARCH', 'Rechercher')}
                                        className="rounded-lg bg-primary-500 p-2 text-black darktext-white transition-all duration-200 hover:bg-primary-600"
                                    >
                                        <Search className="h-5 w-5" />
                                    </button>

                                    {/* Mode selector */}
                                    <AppearanceToggleDropdown />

                                    {/* Menu hamburger */}
                                    <button
                                        onClick={toggleSidebar}
                                        aria-label={t('HEADER.TOGGLE_MENU', 'Ouvrir/fermer le menu')}
                                        className="relative rounded-lg bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <div className="relative h-5 w-5">
                                            <span
                                                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                                                    isSidebarOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                                                }`}
                                            />
                                            <span
                                                className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all duration-300 ${
                                                    isSidebarOpen ? 'opacity-0' : 'opacity-100'
                                                }`}
                                            />
                                            <span
                                                className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-all duration-300 ${
                                                    isSidebarOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
                                                }`}
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden px-4 py-2 md:block md:py-1 lg:px-8">
                        <HeaderNavTwo menu={mainMenu} menuRight={mainMenuRight} />
                    </div>
                </section>
            </header>

            <HeaderMobile
                menu={mainMenu}
                menuRight={mainMenuRight}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                className="md:hidden"
            />

            <SearchMobile isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} className="md:hidden" />
        </>
    );
}
