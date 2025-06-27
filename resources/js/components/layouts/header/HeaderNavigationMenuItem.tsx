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
                            <NavigationMenuTrigger
                                className="cursor-pointer"
                                onClick={(e) => e.preventDefault()} // Trigger on click
                            >
                                <Link href={menuItem.href ?? '#'} className="cursor-pointer hover:underline hover:text-primary">
                                    {menuItem.label}
                                </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="z-50 bg-gray-50">
                                {/* Increased z-index to 50 */}
                                <ul
                                    className={`z-20 grid gap-2 ${menuItem.gridClass ? menuItem.gridClass : 'grid-cols-1'}  ${menuItem.maxWidth ? menuItem.maxWidth : 'min-w-[300px]'} p-4`}
                                >
                                    {menuItem.featureImage && (
                                        <li className="h-full col-span-1 mb-">
                                            <div
                                                className="min-h-full rounded-2xl bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${menuItem.featureImage})`,
                                                }}
                                            ></div>
                                        </li>
                                    )}

                                    {/* Gestion des éléments en vedette (featured) */}
                                    {menuItem.children.items.length &&
                                        menuItem.children.items.map((item) => (
                                            <li key={item.id} className="col-span-1">
                                                <NavigationMenuLink asChild>
                                                    <div className="">
                                                        {/* Gestion des éléments */}
                                                        <div className="grid grid-cols-12 gap-x-5">
                                                            <div className="col-span-12">
                                                                {item.image && (
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.label || 'Featured'}
                                                                        className="mb-4 h-24 w-full rounded-2xl object-cover"
                                                                    />
                                                                )}
                                                                <div className="my-2 text-lg font-medium">
                                                                    <Link
                                                                        href={item.href ?? '#'}
                                                                        className="cursor-pointer hover:underline hover:text-primary"
                                                                    >
                                                                        {item.label}
                                                                    </Link>
                                                                </div>
                                                                <p className="text-muted-foreground mb-2 text-sm leading-tight">
                                                                    {item.description || ''}
                                                                </p>
                                                            </div>

                                                            {/* Gestion des sous éléments */}
                                                            <div className="col-span-12">
                                                                <div>
                                                                    {item.subItems && item.subItems.length && (
                                                                        <ul className="space-y-2">
                                                                            {item.subItems.map((subItem) => (
                                                                                <ListItem
                                                                                    className="font-normal"
                                                                                    key={subItem.id}
                                                                                    href={subItem.href || '#'}
                                                                                >
                                                                                    <ul className="space-y-2 text-pretty">
                                                                                        {subItem.subItems &&
                                                                                            subItem.subItems.slice(0, 2).map((subItemCourse) => (
                                                                                                <ListItem
                                                                                                    className="font-normal"
                                                                                                    key={subItemCourse.id}
                                                                                                    href={subItemCourse.href || '#'}
                                                                                                >
                                                                                                    <span className="flex items-center text-gray-500 hover:text-black hover:underline dark:text-white">
                                                                                                        <svg
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            fill="none"
                                                                                                            viewBox="0 0 24 24"
                                                                                                            strokeWidth={1.5}
                                                                                                            stroke="currentColor"
                                                                                                            className="size-4"
                                                                                                        >
                                                                                                            <path
                                                                                                                strokeLinecap="round"
                                                                                                                strokeLinejoin="round"
                                                                                                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                                                                                            />
                                                                                                        </svg>
                                                                                                        {subItemCourse.label || ''}
                                                                                                    </span>
                                                                                                </ListItem>
                                                                                            ))}
                                                                                    </ul>
                                                                                </ListItem>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Voir plus */}
                                                            <div className="col-span-12">
                                                                <hr className="mt-2 mb-1 border-gray-200 dark:border-gray-700 w-1/4" />
                                                                {item.href && item.href !== '#' && (
                                                                    <Link
                                                                        className="mt-2 text-sm text-green-500 hover:underline"
                                                                        href={item.href || '#'}
                                                                    >
                                                                        Voir plus
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
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
