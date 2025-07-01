import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { NotificationsDropdown } from '@/components/notification/NotificationsDropdown';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="bg-white dark:dark:bg-gray-900 border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="flex items-center h-full">
                    <NotificationsDropdown />
                    <NavUser />
                </div>
            </div>
        </header>
    );
}
