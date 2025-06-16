export interface IMainMenuItem {
    id: string;
    label: string;
    title?: string;
    href?: string;
    description?: string;
    image?: string;
    isCta?: boolean;
    children?: MenuChildren;
}

export interface MenuChildren {
    id: string;
    title?: string;
    description?: string;
    href?: string;
    image?: string;
    items: MenuChildItem[];
    featured?: MenuChildItem[];
}


export interface MenuChildItem {
    id: string;
    label: string;
    href: string;
    description?: string;
    image?: string;
    subItems?: MenuChildItem[];
}