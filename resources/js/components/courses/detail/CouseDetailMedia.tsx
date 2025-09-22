import { useState } from 'react';

import { ICourse } from '@/types/course';
import { getMediaUrl } from '@/utils/utils';
import { Logger } from '@/utils/console.util';

interface CouseDetailMediaProps {
    course: ICourse;
}

export default function CouseDetailMedia({ course }: CouseDetailMediaProps) {
    const [failed, setFailed] = useState<Record<number, boolean>>({});
    if (!course || !course.media) {
        return (
            <div className="p-4">
                {/* <img src="https://placehold.co/1920x2880" alt={course.title} className="w-full h-auto rounded-lg shadow-lg object-cover" />{' '} */}
            </div>
        );
    }

    Logger.log('Course Media:', course.media);

    return (
        <div>
            {[course.media]
                ?.filter((media) => media.type === 'image')
                .map((media, index) => (
                    failed[index] ? null : (
                        <img
                            key={index}
                            src={getMediaUrl(media.src)}
                            alt={course.title}
                            className="w-full h-auto rounded-lg object-cover"
                            loading="lazy"
                            onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
                        />
                    )
                ))}
        </div>
    );
}
