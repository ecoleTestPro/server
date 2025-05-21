import { Link } from '@inertiajs/react';
import { CirclePlus, Settings2 } from 'lucide-react';

export default function CourseToolBar() {
    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <h1 className="text-xl font-bold">Web Development Courses</h1>
                <p className="text-gray-500">Choose from +10,000 courses with new additions published every month</p>
                <div className="mt-2 flex justify-end space-x-2">
                    <button className="cursor-pointer rounded bg-gray-200 p-2">
                        <Settings2 className="h-5 w-5" />
                    </button>
                    <Link href="/courses/create" className="cursor-pointer rounded bg-gray-200 p-2">
                        <CirclePlus className="h-5 w-5" />
                    </Link>
                </div>
            </header>
        </div>
    );
}
