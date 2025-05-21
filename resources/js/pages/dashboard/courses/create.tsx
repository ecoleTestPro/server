import AppLayout from '@/layouts/dashboard/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CourseForm from './courseForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Formations',
        href: '/courses',
    },
    {
        title: 'Créer une formation',
        href: '/courses/create',
    },
];

export default function CourseCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un cours" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CourseForm />
            </div>
        </AppLayout>
    );
}
