import { NavItem } from "@/types";
import { BookOpen, FileStack, Folder, HomeIcon, LayoutGrid, List, ClipboardPlus, Settings2, ListTodo, BookAIcon, ListChecks, Mail, Calendar, CalendarDays, CalendarCheck } from 'lucide-react';


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
                title: 'Inscriptions',
                href: route('dashboard.enrollment.index'),
                icon: ListChecks,
            },
            {
                title: 'Catégories',
                href: route('dashboard.category.index'),
                icon: ListTodo,
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
        title: 'Rendez-vous',
        href: route('dashboard.appointments.index'),
        icon: Calendar,
        children: [
            {
                title: 'Liste des RDV',
                href: route('dashboard.appointments.index'),
                icon: List,
            },
            {
                title: 'Types de RDV',
                href: route('dashboard.appointments.settings.types'),
                icon: Settings2,
            },
            {
                title: 'Horaires',
                href: route('dashboard.appointments.settings.hours'),
                icon: CalendarCheck,
            },
        ],
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
    // {
    //     title: 'Paramètres',
    //     href: route('settings.app.index'),
    //     icon: Settings2,
    // }
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    {
        title: 'Accueil',
        href: route('home'),
        icon: HomeIcon,
    },
];