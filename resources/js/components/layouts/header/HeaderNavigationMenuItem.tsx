import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { IMainMenuItem } from '@/types/header.type';
import { Link } from '@inertiajs/react';
import ListItem from './ListItem';

interface HeaderNavigationMenuItemProps {
    menuItem: IMainMenuItem;
}

export default function HeaderNavigationMenuItem({ menuItem }: HeaderNavigationMenuItemProps) {
    // const mergeMenu = (): { left: IMainMenuItem[]; right: IMainMenuItem[] } => {
    //     let leftInitial: IMainMenuItem[] = [...menu];
    //     let rightInitial: IMainMenuItem[] = [];

    //     if (menuRight && menuRight.length > 0) {
    //         rightInitial = [...menuRight];
    //     }
    //     return { left: leftInitial, right: rightInitial };
    // };

    if (!menuItem || !menuItem.id || !menuItem.label) {
        return null; // Si l'élément n'est pas valide, on ne rend rien
    }

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem key={menuItem.id}>
                    {/* Si l'élément a des enfants, on utilise un Trigger et du contenu */}
                    {menuItem.children ? (
                        <>
                            <NavigationMenuTrigger className="cursor-pointer"> {menuItem.label}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul
                                    className={`grid gap-2 ${
                                        menuItem.children.featured
                                            ? 'md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'
                                            : 'w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]'
                                    }`}
                                >
                                    {/* Gestion des éléments en vedette (featured) */}
                                    {menuItem.children.featured && menuItem.children.featured.length > 0 && (
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                    href={menuItem.children.featured[0].href || '#'}
                                                >
                                                    {menuItem.children.featured[0].image && (
                                                        <img
                                                            src={menuItem.children.featured[0].image}
                                                            alt={menuItem.children.featured[0].label || 'Featured'}
                                                            className="mb-4 h-24 w-full object-cover"
                                                        />
                                                    )}
                                                    <div className="mt-4 mb-2 text-lg font-medium">
                                                        {menuItem.children.featured[0].label || menuItem.children.title}
                                                    </div>
                                                    <p className="text-muted-foreground text-sm leading-tight">
                                                        {menuItem.children.featured[0].description ||
                                                            menuItem.children.description ||
                                                            'No description available.'}
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                    )}
                                    {/* Gestion des items normaux */}
                                    {menuItem.children.items.map((child) => (
                                        <ListItem key={child.id} title={child.label} href={child.href || '#'}>
                                            {child.description || 'No description available.'}
                                        </ListItem>
                                    ))}
                                    {/* Gestion des sous-items s'ils existent */}
                                    {menuItem.children.items.some((item) => item.subItems) &&
                                        menuItem.children.items.map(
                                            (child) =>
                                                child.subItems &&
                                                child.subItems.map((subItem) => (
                                                    <ListItem key={subItem.id} title={subItem.label} href={subItem.href || '#'}>
                                                        {subItem.description || 'No description available.'}
                                                    </ListItem>
                                                )),
                                        )}
                                </ul>
                            </NavigationMenuContent>
                        </>
                    ) : (
                        /* Si pas d'enfants, on rend un simple lien */
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href={menuItem.href || '#'}>{menuItem.label}</Link>
                        </NavigationMenuLink>
                    )}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
