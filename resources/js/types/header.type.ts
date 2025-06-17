export interface IMainMenuItem {
    id: string;
    label: string;
    title?: string;
    href?: string;
    description?: string;
    image?: string;
    isCta?: boolean;
    children?: MenuChildren;
    gridClass?: string;
    maxWidth?: string;
}

export interface MenuChildren {
    id: string;
    title?: string;
    description?: string;
    href?: string;
    image?: string;
    items: MenuChildItem[];
}


export interface MenuChildItem {
    id: string;
    label: string;
    href: string;
    description?: string;
    image?: string;
    subItems?: MenuChildItem[];
    subItemsFeatured?: MenuChildItem[];
}