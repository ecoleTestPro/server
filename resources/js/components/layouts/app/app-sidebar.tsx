import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import AppLogo from '../../app-logo';
import { FOOTER_NAV_ITEMS, MAIN_NAV_ITEMS } from './side-bar-item';

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={MAIN_NAV_ITEMS} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={FOOTER_NAV_ITEMS} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
