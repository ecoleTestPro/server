import { IJobOffer } from '@/types';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';

interface Props {
    row: { original: IJobOffer };
    onEdit?: (row: IJobOffer) => void;
    onDelete?: (row: IJobOffer) => void;
    onToggle?: (row: IJobOffer) => void;
}

export default function JobOfferActionBtn({ row, onEdit, onDelete, onToggle }: Props) {
    return (
        <div className="flex space-x-2">
            <Button variant={'ghost'} size="icon" onClick={() => onEdit?.(row.original)}>
                <SquarePen className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
            </Button>
            <Button variant={'ghost'} size="icon" onClick={() => onToggle?.(row.original)}>
                <span className="sr-only">Activer/desactiver</span>
            </Button>
            <Button variant={'ghost'} size="icon" onClick={() => onDelete?.(row.original)}>
                <Trash2 className="text-red h-4 w-4" style={{ color: 'red' }} />
                <span className="sr-only">Supprimer</span>
            </Button>
        </div>
    );
}
