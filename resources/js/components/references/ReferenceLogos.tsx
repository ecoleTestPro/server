import { SharedData } from '@/types';
import { IPartner } from '@/types/partner';
import { getMediaUrl } from '@/utils/utils';
import { usePage } from '@inertiajs/react';
import TitleBadgeOne from '../ui/badge-one';

interface ReferenceLogosProps {
    tag: string; // Optional tag to filter references, if needed
}

export default function ReferenceLogos({ tag }: ReferenceLogosProps) {
    const { auth, data } = usePage<SharedData>().props;
    const references: IPartner[] = (data as any)?.references ?? [];

    if (tag == '' || tag == null || tag == undefined) {
        return;
    }

    if (!references || references.length === 0) {
        return null;
    }

    // Filter references by tag if provided
    const filteredReferences = tag ? references.filter((ref) => ref.tag?.split(';')?.includes(tag)) : references;

    const getImgLink = (ref: IPartner): string => {
        if (ref?.media?.src) {
            return getMediaUrl(ref.media);
        }
        return 'https://placehold.jp/250x150.png'; // Fallback image if no media is available
    };

    return (
        <div className="py-8">
            <div className="container mx-auto flex flex-wrap justify-center gap-6">
                <TitleBadgeOne title="Nos références" />
                <h2 className="w-full text-center text-2xl font-bold"></h2>
                {filteredReferences.map((ref) => (
                    <img key={ref.id} src={getImgLink(ref)} alt={ref?.name ?? ''} className="h-16 w-auto object-contain" />
                ))}
            </div>
        </div>
    );
}
