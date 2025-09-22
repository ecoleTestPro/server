import CourseCardWrapper from '@/components/courses/card/courseCardWrapper';
import CourseToolBarTwo from '@/components/courses/dashboard/courseToolBarTwo';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
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

    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<DashbordCourseView>('card');

    /**
     * Fetches all courses and updates the state accordingly.
     * If the fetch is successful, logs a success message and updates
     * the `coursesInitial` and `courses` states with the fetched courses.
     * If the fetch fails, logs an error message and displays a toast
     * error with a generic error message.
     * Finally, sets the `loading` state to `false`.
     */
    const handleGetAllCourses = () => {
        setLoading(true);

        axios
            .get(route('dashboard.course.all'))
            .then((response) => {
                Logger.log('Courses fetched successfully', response.data);
                setCoursesInitial(response.data.courses);
                setCourses(response.data.courses);
            })
            .catch((error) => {
                Logger.error('Error fetching courses', error);
                toast.error(t('courses.error_fetching_courses', 'Erreur lors de la récupération des cours'));
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Handles the change of the current view mode for the courses.
     * Updates the `viewMode` state with the new view mode.
     * @param mode - The new view mode to apply.
     */
    const handleChangeViewMode = (mode: DashbordCourseView) => {
        setViewMode(mode);
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
                        setLoading={setLoading}
                        loading={loading}
                        handleGetAllCourses={handleGetAllCourses}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
