import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface CourseDurationBlockProps {
    duration?: string;
    location?: string;
}

export default function CourseDurationBlock({ duration, location }: CourseDurationBlockProps) {
    return (
        <div className="mb-2 grid grid-cols-1 text-pretty">
            {duration && (
                <div className="mr-4 flex items-center">
                    <FaClock className="mr-1 text-green-500" />
                    <span>{duration} </span>
                </div>
            )}

            {location && (
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    <span>{location}</span>
                </div>
            )}
        </div>
    );
}
