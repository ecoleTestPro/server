import CourseCardWrapper from '@/components/courses/card/courseCardWrapper';
import CourseForm, { ICourseForm } from '@/components/courses/courseForm';
import CourseToolBar from '@/components/courses/dashboard/courseToolBar';
import CourseToolBarTwo from '@/components/courses/dashboard/courseToolBarTwo';
import { ConfirmDialog } from '@/components/ui/confirmDialog';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Formations',
        href: route('dashboard.course.index'),
    },
];

export type DashbordCourseView = 'card' | 'list';

export default function Dashboard() {
    const { t } = useTranslation();

    const { data } = usePage<SharedData>().props;

    const [loading, setLoading] = useState<boolean>(false);
    const [coursesInitial, setCoursesInitial] = useState<ICourse[]>([]);
    const [courses, setCourses] = useState<ICourse[]>([]);

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [open, setOpen] = useState(false);
    const [selected, setCategory] = useState<ICourseForm | undefined>(undefined);

    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<DashbordCourseView>('card');

    const handleChangeViewMode = (mode: DashbordCourseView) => {
        setViewMode(mode);
    };

    const handleClose = () => {
        setCategory(undefined);
        setOpen(false);
    };

    const handleDelete = () => {
        // Call the delete function here
        console.log('Deleting course with ID:', selected?.id);
        router.delete(route('course.delete', selected?.id), {
            onSuccess: () => {
                setShowConfirm(false);
                setIsDeleting(false);
                toast.success(t('courses.course.deleteSuccess', 'Formation supprimée avec succès !'));
            },
        });
    };

    useEffect(() => {
        Logger.log('CourseCardWrapper useEffect', data);
        if (data && data.courses && data.courses.list) {
            setCoursesInitial(data.courses.list);
            setCourses(data.courses.list);
        } else {
            setCoursesInitial([]);
            setCourses([]);
        }
    }, [data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    {/* <CourseTable /> */}
                    {false && (
                        <>
                            <CourseToolBar
                                FormComponent={<CourseForm closeDrawer={handleClose} initialData={selected} />}
                                open={open}
                                setOpen={(open: boolean) => {
                                    setOpen(open);
                                    if (!open) {
                                        handleClose();
                                    }
                                }}
                            />

                            <ConfirmDialog
                                open={showConfirm}
                                title="Supprimer la formation"
                                description="Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible."
                                confirmLabel="Supprimer"
                                cancelLabel="Annuler"
                                onConfirm={handleDelete}
                                onCancel={() => setShowConfirm(false)}
                                loading={isDeleting}
                            />
                        </>
                    )}

                    <CourseToolBarTwo
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        viewMode={viewMode}
                        handleChangeViewMode={handleChangeViewMode}
                        setCourses={setCourses}
                        courses={coursesInitial}
                    />

                    <CourseCardWrapper
                        searchTerm={searchTerm}
                        viewMode={viewMode}
                        courses={courses}
                        setCourses={setCourses}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
