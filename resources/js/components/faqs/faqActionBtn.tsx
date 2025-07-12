import { IFaq } from '@/types/faq';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';

interface IFaqActionBtnProps {
    row: {
        original: IFaq;
    };
    onEdit?: (row: IFaq) => void;
    onDelete?: (row: IFaq) => void;
}

export default function FaqActionBtn({ row, onEdit, onDelete }: IFaqActionBtnProps) {
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
