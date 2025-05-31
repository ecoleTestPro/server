import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CourseList from './courseList';
import Pagination from './coursePagination';

const courseData: ICourse = {
    id: 1,
    title: 'Angular Fundamentals',
    description: 'Learn Angular Fundamentals From beginning to advance level',
    duration: '32 hours',
    lectures: '42 lectures',
    price: '$29.99',
    author: 'Jesse Stevens',
    image: 'https://demo.foxthemes.net/courseplus/assets/images/courses/img-2.jpg',
};

const coursesTile: string[] = [
    'Angular Fundamentals',
    'React Basics',
    'Vue.js Essentials',
    'Node.js for Beginners',
    'Django Web Development',
    'Flask API Development',
];

const coursesDescription: string[] = [
    'Learn Angular Fundamentals From beginning to advance level',
    'Master React with hands-on projects',
    'Build dynamic web apps with Vue.js',
    'Get started with Node.js and Express',
    'Create web applications with Django',
    'Develop RESTful APIs with Flask',
];

const coursesData: ICourse[] = Array.from({ length: 60 }, (_, index) => ({
    ...courseData,
    id: index + 1,
    title: coursesTile[Math.floor(Math.random() * coursesTile.length)],
    description: coursesDescription[Math.floor(Math.random() * coursesDescription.length)],
}));

function CourseCardWrapper() {
    const { data } = usePage<SharedData>().props;

    const [courses, setCourses] = useState(coursesData);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;

    // Fonction pour filtrer les cours par page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    // const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Gestion de la pagination
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                <main>
                    <CourseList courses={data.courses?.data || []} />
                </main>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
            </div>
        </div>
    );
}

export default CourseCardWrapper;
 