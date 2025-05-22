import CategoryDataTable from '@/components/categories/categoryDataTable';
import CategoryToolBar from '@/components/courses/categories/categoryToolBar';
import AppLayout from '@/layouts/dashboard/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardCategory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    {/* <CourseTable /> */}
                    <CategoryToolBar />

                    <div className="container mx-auto flex h-full items-center justify-center">
                        <CategoryDataTable />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
