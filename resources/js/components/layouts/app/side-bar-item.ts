import { NavItem } from "@/types";
import { BookOpen, FileStack, Folder, HomeIcon, LayoutGrid, List, ClipboardPlus, Settings2, ListTodo } from 'lucide-react';


export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Formations',
        href: route('dashboard.course.index'),
        icon: FileStack,
        children: [
            {
                title: 'Liste',
                href: route('dashboard.course.index'),
                icon: List,
            },
            // {
            //     title: 'Créer une formation',
            //     href: route('dashboard.course.create'),
            //     icon: ClipboardPlus,
            // },
            {
                title: 'Catégories',
                href: route('dashboard.category.index'),
                icon: ListTodo,
            },
            {
                title: 'Configuration',
                href: "#",
                icon: Settings2,
            },
        ],
    },
    // {
    //     title: 'temoignages',
    //     href: route('dashboard.testimonial.index'),
    //     icon: BookOpen,
    // },
    {
        title: 'Paramètres',
        href: route('settings.app.index'),
        icon: Settings2,
    }
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    {
        title: 'Accueil',
        href: route('home'),
        icon: HomeIcon,
    },
];