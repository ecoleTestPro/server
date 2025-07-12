import { IPartner } from '@/types/partner';

interface ReferenceLogosProps {
    references: IPartner[];
}

export default function ReferenceLogos({ references }: ReferenceLogosProps) {
    if (!references || references.length === 0) {
        return null;
    }

    return (
        <div className="py-8">
            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                {references.map((ref) => (
                    <img
                        key={ref.id}
                        src={ref.media?.src}
                        alt={ref.name ?? ''}
                        className="h-16 w-auto object-contain"
                    />
                ))}
            </div>
        </div>
    );
}
