import { IPartner } from '@/types/partner';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface IReferenceActionBtnProps {
    row: {
        original: IPartner;
    };
    onEdit?: (row: IPartner) => void;
    onDelete?: (row: IPartner) => void;
}

export default function ReferenceActionBtn({ row, onEdit, onDelete }: IReferenceActionBtnProps) {
    const reference = row.original;

    return (
        <div className="flex space-x-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={'ghost'}
                        size="icon"
                        onClick={() => onEdit?.(row.original)}
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <SquarePen className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        Modifier les informations de <strong>{reference.name}</strong> (nom, logo, tags, lien web)
                    </p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={'ghost'}
                        size="icon"
                        onClick={() => onDelete?.(row.original)}
                        className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Supprimer</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        Supprimer définitivement <strong>{reference.name}</strong> de vos références
                    </p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
