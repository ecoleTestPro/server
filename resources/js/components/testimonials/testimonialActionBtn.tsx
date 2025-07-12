import { ITestimonial } from '@/types/testimonial';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';

interface ITestimonialActionBtnProps {
    row: {
        original: ITestimonial;
    };
    onEdit?: (row: ITestimonial) => void;
    onDelete?: (row: ITestimonial) => void;
}

export default function TestimonialActionBtn({ row, onEdit, onDelete }: ITestimonialActionBtnProps) {
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
