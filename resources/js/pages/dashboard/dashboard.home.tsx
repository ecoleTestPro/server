import EnrollmentRate from '@/components/charts/EnrollmentRate';
import DashboardWidget from '@/components/widgets/DashboardWidget';
import AppLayout from '@/layouts/dashboard/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 ">
                    <DashboardWidget />
                    <EnrollmentRate />
                </div>
            </div>
        </AppLayout>
    );
}
