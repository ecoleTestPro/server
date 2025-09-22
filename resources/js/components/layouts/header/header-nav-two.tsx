'use client';

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';

import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { IMainMenuItem } from '@/types/header.type';
import HeaderNavigationMenuItem from './HeaderNavigationMenuItem';

interface NavigationMenuProps {
    menu: IMainMenuItem[];
    menuRight?: IMainMenuItem[];
    className?: string;
    isMobile?: boolean;
    mobile?: boolean;
}

export function HeaderNavTwo({ menu, menuRight, className, isMobile, mobile = false }: NavigationMenuProps) {
    const iconMap: { [key: string]: React.ReactNode } = {
        Backlog: <CircleHelpIcon />,
        'To Do': <CircleIcon />,
        Done: <CircleCheckIcon />,
    };

    if (!menu) {
        return null; // Si le menu est vide ou non défini, on ne rend rien
    }

    if (mobile) {
        return <div>......</div>;
    }

    const mergeMenu = (): { left: IMainMenuItem[]; right: IMainMenuItem[] } => {
        const leftInitial: IMainMenuItem[] = [...menu];
        let rightInitial: IMainMenuItem[] = [];

        if (menuRight && menuRight.length > 0) {
            rightInitial = [...menuRight];
        }
        return { left: leftInitial, right: rightInitial };
    };

    return (
        <section>
            <div className="flex items-center justify-between">
                <div>
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {mergeMenu().left.map((item, index) => (
                                <HeaderNavigationMenuItem key={index} menuItem={item} />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center space-x-4">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {mergeMenu().right.map((item, index) => (
                                <HeaderNavigationMenuItem key={index} menuItem={item} />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </section>
    );
}
