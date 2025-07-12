import { IPartner } from '@/types/partner';

interface CoursePartnersProps {
    partners?: IPartner[];
}

export default function CoursePartners({ partners }: CoursePartnersProps) {
    if (!partners || partners.length === 0) {
        return null;
    }

    return (
        <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Partenaires
            </h3>
            <div className="flex flex-wrap items-center gap-4">
                {partners.map((partner) => (
                    <a
                        key={partner.id}
                        href={partner.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {partner.media && (
                            <img
                                src={partner.media.src}
                                alt={partner.name}
                                className="h-12 w-auto object-contain"
                            />
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
