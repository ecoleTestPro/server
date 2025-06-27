import { ICourse } from '@/types/course';

interface CouseDetailMediaProps {
    course: ICourse;
}

export default function CouseDetailMedia({ course }: CouseDetailMediaProps) {
    if (!course || !course.media || course.media.length === 0) {
        return (
            <div className="p-4">
                <img src="https://placehold.co/1920x2880" alt={course.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />{' '}
            </div>
        );
    }

    return (
        <div>
            {course.media
                ?.filter((media) => media.type === 'image')
                .map((media, index) => (
                    <img key={index} src={media.src} alt={course.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />
                ))}
        </div>
    );
}
