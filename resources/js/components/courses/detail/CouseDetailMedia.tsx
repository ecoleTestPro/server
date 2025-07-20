import { ICourse } from '@/types/course';
import { getMediaUrl } from '@/utils/utils';

interface CouseDetailMediaProps {
    course: ICourse;
}

export default function CouseDetailMedia({ course }: CouseDetailMediaProps) {
    if (!course || !course.media) {
        return (
            <div className="p-4">
                <img src="https://placehold.co/1920x2880" alt={course.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />{' '}
            </div>
        );
    }

    console.log('Course Media:', course.media);

    return (
        <div>
            {[course.media]
                ?.filter((media) => media.type === 'image')
                .map((media, index) => (
                    <img key={index} src={getMediaUrl(media.src)} alt={course.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />
                ))}
        </div>
    );
}
