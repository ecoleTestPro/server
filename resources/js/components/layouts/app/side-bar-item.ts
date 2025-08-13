import { NavItem } from "@/types";
import { BookOpen, FileStack, Folder, HomeIcon, LayoutGrid, List, ClipboardPlus, Settings2, ListTodo, BookAIcon, ListChecks, Mail, Calendar } from 'lucide-react';


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
            {
                title: 'Catégories',
                href: route('dashboard.category.index'),
                icon: ListTodo,
            },
        ],
    },
    {
        title: 'Inscriptions',
        href: route('dashboard.enrollment.index'),
        icon: ListChecks,
    },
    {
        title: 'Rendez-vous',
        href: '/appointments',
        icon: Calendar,
        children: [
            {
                title: 'Mes RDV',
                href: '/appointments',
                icon: List,
            },
            {
                title: 'Prendre RDV',
                href: '/appointments/create',
                icon: ClipboardPlus,
            },
        ],
    },
    // {
    //     title: 'Partenaires',
    //     href: route('dashboard.partners.index'),
    //     icon: FileStack,
    // },
    {
        title: 'Références',
        href: route('dashboard.references.index'),
        icon: FileStack,
    },
    {
        title: 'Offres d\'emploi',
        href: route('dashboard.job-offers.index'),
        icon: ClipboardPlus,
    },
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
        title: 'Newsletters',
        href: route('dashboard.newsletters.index'),
        icon: Mail,
        children: [
            {
                title: 'Newsletters',
                href: route('dashboard.newsletters.index'),
                icon: List,
            },
            {
                title: 'Envoie de mail',
                href: route('dashboard.newsletters.compose'),
                icon: ClipboardPlus,
            },
        ],
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