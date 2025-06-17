import { NavItem } from "@/types";
import { BookOpen, FileStack, Folder, LayoutGrid, List, ClipboardPlus, Settings2, ListTodo } from 'lucide-react';


export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Formations',
        href: '/courses',
        icon: FileStack,
        children: [
            {
                title: 'Liste',
                href: '/courses',
                icon: List,
            },
            {
                title: 'Créer une formation',
                href: '/courses/create',
                icon: ClipboardPlus,
            },
            {
                title: 'Catégories',
                href: '/categories',
                icon: ListTodo,
            },
            {
                title: 'Configuration',
                href: '/courses/settings',
                icon: Settings2,
            },
        ],
    },
    {
        title: 'Paramètres',
        href: '/settings',
        icon: Settings2,
    }
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];