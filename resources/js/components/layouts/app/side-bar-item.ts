import { NavItem } from "@/types";
import { BookOpen, FileStack, Folder, HomeIcon, LayoutGrid, List, ClipboardPlus, Settings2, ListTodo, BookAIcon, ListChecks } from 'lucide-react';


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
    {
        title: 'Inscriptions',
        href: route('dashboard.enrollment.index'),
        icon: ListChecks,
    },
    {
        title: 'Partenaires',
        href: route('dashboard.partners.index'),
        icon: FileStack,
    },
    // {
    //     title: 'Pages',
    //     href: route('dashboard.page.index'),
    //     icon: BookOpen,
    // },
    {
        title: 'Blogs',
        href: route('dashboard.blogs.index'),
        icon: Folder,
    },
    {
        title: 'Témoignages',
        href: route('dashboard.testimonial.index'),
        icon: BookAIcon,
    },
    {
        title: 'Faqs',
        href: route('dashboard.faqs.index'),
        icon: BookOpen,
    },
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