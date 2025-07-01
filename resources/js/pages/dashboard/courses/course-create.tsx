import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourse } from '@/types/course';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseForm from '../../../components/courses/form/edit-course.form';

export default function CourseCreate() {
    const { data: sharedData } = usePage<SharedData>().props;

    const [course, setCourse] = useState<ICourse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
        {
            title: 'Formations',
            href: route('dashboard.course.index'),
        },
    ]);

    useEffect(() => {
        setLoading(true);
        if (sharedData && sharedData.course) {
            setCourse(sharedData.course);
            setBreadcrumbs([
                {
                    title: 'Formations',
                    href: route('dashboard.course.index'),
                },
                {
                    title: 'Modifier la formation',
                    href: route('dashboard.course.edit', sharedData.course.id),
                },
            ]);
        } else {
            setBreadcrumbs([
                {
                    title: 'Formations',
                    href: route('dashboard.course.index'),
                },
                {
                    title: 'Créer une formation',
                    href: route('dashboard.course.create'),
                },
            ]);
        }
        return setLoading(false);
    }, [sharedData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un cours" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CourseForm course={course} />
            </div>
        </AppLayout>
    );
}
