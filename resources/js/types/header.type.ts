export interface IMainMenuItem {
    label: string;
    href: string;
    isCta?: boolean;
    children?: MenuChildren;
}

export interface MenuChildren {
    title: string;
    description?: string;
    href?: string;
    image?: string;
    items: MenuChildrenItem[];
    featured?: MenuChildrenItem[];
}


interface MenuChildrenItem {
    label: string;
    href: string;
    description?: string;
    image?: string;
    featured?: {
        label: string;
        href: string;
    }[];
}