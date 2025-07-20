import { IPartner } from '@/types/partner';

interface ReferenceLogosProps {
    references: IPartner[];
    tag: string; // Optional tag to filter references, if needed
}

export default function ReferenceLogos({ references, tag }: ReferenceLogosProps) {
    if (tag == '' || tag == null || tag == undefined) {
        return;
    }
    
    if (!references || references.length === 0) {
        return null;
    }

    // Filter references by tag if provided
    const filteredReferences = tag ? references.filter((ref) => ref.tag?.split(';')?.includes(tag)) : references;

    return (
        <div className="py-8">
            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                {filteredReferences.map((ref) => (
                    <img key={ref.id} src={'https://placehold.jp/250x150.png'} alt={ref?.name ?? ''} className="h-16 w-auto object-contain" />
                ))}
            </div>
        </div>
    );
}
