import { ConfirmDialog } from '@/components/ui/confirmDialog';
import PageLoading from '@/components/ui/page-loading';
import { DashbordCourseView } from '@/pages/dashboard/courses';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import CourseTable from '../list/CourseTable';
import CourseList from './courseList';
import Pagination from './coursePagination';

import axios from 'axios';

interface ICourseCardWrapperProps {
    viewMode: DashbordCourseView;
    searchTerm?: string;
    loading?: boolean;
    setLoading?: (loading: boolean) => void;
    courses?: ICourse[];
    // setCourses?: (courses: ICourse[]) => void;
    handleGetAllCourses?: () => void;
}

function CourseCardWrapper({ searchTerm, viewMode, loading, setLoading, courses, handleGetAllCourses }: ICourseCardWrapperProps) {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<ICourse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [enrollmentWarning, setEnrollmentWarning] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 9;

    // Fonction pour filtrer les cours par page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    // const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Gestion de la pagination
    const totalPages = () => {
        if (!courses || courses.length === 0) {
            return 1; // Si pas de cours, on retourne 1 page pour éviter les erreurs
        }
        return Math.ceil(courses.length / coursesPerPage);
    };

    /**
     * Handles the change of the current page in pagination.
     * Validates the page number to ensure it is within the range
     * of available pages. If valid, updates the current page state.
     *
     * @param page - The page number to navigate to.
     */
    const handleChangePage = (page: number) => {
        if (!setLoading) {
            Logger.error('setLoading function is not provided');
            return;
        }

        if (page < 1 || page > totalPages()) return; // Validation de la page

        setLoading(true);
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
        setTimeout(() => {
            setLoading(false);
        }, 300); // Simulate loading delay
    };

    /**
     * Returns a slice of courses based on the current page number.
     * Calculates the start and end indices based on the current page number
     * and the number of courses per page. If the courses list is empty,
     * returns an empty array.
     *
     * @returns A slice of courses.
     */
    const sliceCourses = () => {
        if (!courses || courses.length === 0) {
            return [];
        }

        const start = (currentPage - 1) * coursesPerPage;
        const end = start + coursesPerPage;

        if (searchTerm && searchTerm.trim() !== '') {
            const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
            return filteredCourses.slice(start, end);
        }

        return courses.slice(start, end);
    };

    const handleDelete = () => {
        if (!courseToDelete) {
            return;
        }
        // Call the delete function here
        Logger.log('Deleting course with ID:', courseToDelete?.id);
        setIsDeleting(true);
        axios
            .delete(route('dashboard.course.delete', courseToDelete?.id))
            .then((response) => {
                setShowConfirm(false);
                setIsDeleting(false);
                setCourseToDelete(null);
                toast.success(t('courses.delete', 'Formation supprimée avec succès !'));
                handleGetAllCourses?.();
            })
            .catch((error) => {
                setIsDeleting(false);
                Logger.error('Error deleting course:', error);

                // Check if the error is due to existing enrollments
                if (error.response?.data?.hasEnrollments) {
                    const enrollmentCount = error.response.data.enrollmentCount;
                    const message =
                        error.response.data.message ||
                        `Cette formation ne peut pas être supprimée car ${enrollmentCount} utilisateur(s) y sont inscrits. Veuillez d'abord gérer les inscriptions existantes.`;

                    // Show a custom alert for enrollment conflict
                    toast.error(message, {
                        duration: 6000, // Show for 6 seconds
                        style: {
                            maxWidth: '500px',
                        },
                    });
                    setShowConfirm(false);
                    setCourseToDelete(null);
                } else {
                    toast.error(t('courses.delete_error', 'Erreur lors de la suppression de la formation.'));
                }
            });
    };

    const handleOpenConfirmDialog = (course: ICourse) => {
        setCourseToDelete(course);
        setEnrollmentWarning(null);
        setShowConfirm(true);
        setIsDeleting(false);

        // Optional: Check for enrollments beforehand to show warning in dialog
        axios
            .get(route('dashboard.course.enrollments.count', course.id))
            .then((response) => {
                const count = response.data.count;
                if (count > 0) {
                    setEnrollmentWarning(`⚠️ Attention : ${count} utilisateur(s) sont inscrits à cette formation.`);
                }
            })
            .catch((error) => {
                // Silent fail - will check on actual delete
                Logger.log('Could not fetch enrollment count:', error);
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <PageLoading />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center px-4">
            <div className="">
                <div>
                    <div className="overflow-y-auto max-h-[65vh]">
                        {data.courses?.list && data.courses?.list.length > 0 && viewMode == 'card' ? (
                            <CourseList courses={sliceCourses()} onDelete={handleOpenConfirmDialog} />
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Liste des cours */}
                                <div className="flex-1 min-h-full">
                                    <CourseTable courses={sliceCourses()} />
                                </div>
                            </div>
                        )}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages()} onPageChange={handleChangePage} />
                </div>
            </div>

            <ConfirmDialog
                open={showConfirm}
                title="Supprimer la formation"
                description={
                    <>
                        Voulez-vous vraiment supprimer cette formation ? Cette action est irréversible.
                        {enrollmentWarning && (
                            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                                {enrollmentWarning}
                            </div>
                        )}
                    </>
                }
                confirmLabel="Supprimer"
                cancelLabel="Annuler"
                onConfirm={handleDelete}
                onCancel={() => {
                    setShowConfirm(false);
                    setEnrollmentWarning(null);
                }}
                loading={isDeleting}
            />
        </div>
    );
}

export default CourseCardWrapper;
