import { IPartner } from '@/types/partner';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';

interface IPartnerActionBtnProps {
    row: {
        original: IPartner;
    };
    onEdit?: (row: IPartner) => void;
    onDelete?: (row: IPartner) => void;
}

export default function PartnerActionBtn({ row, onEdit, onDelete }: IPartnerActionBtnProps) {
    return (
        <div className="flex space-x-2">
            <Button variant={'ghost'} size="icon" onClick={() => onEdit?.(row.original)}>
                <SquarePen className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
            </Button>

            <Button variant={'ghost'} size="icon" onClick={() => onDelete?.(row.original)}>
                <Trash2 className="text-red h-4 w-4" style={{ color: 'red' }} />
                <span className="sr-only">Supprimer</span>
            </Button>
        </div>
    );
}
