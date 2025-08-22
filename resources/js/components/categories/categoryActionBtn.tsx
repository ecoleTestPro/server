import { ICourseCategory } from '@/types/course';
import { SquarePen, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/button/button';

interface ICategoryActionBtnProps {
    row: {
        original: ICourseCategory;
    };
    onEdit?: (row: ICourseCategory) => void;
    onDelete?: (row: ICourseCategory) => void;
    onAddSubcategory?: (row: ICourseCategory) => void;
}

export default function CategoryActionBtn({ row, onEdit, onDelete, onAddSubcategory }: ICategoryActionBtnProps) {
    return (
        <div className="flex space-x-2">
            <Button variant={'ghost'} size="icon" onClick={() => onEdit?.(row.original)}>
                <SquarePen className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
            </Button>

            <Button variant={'ghost'} size="icon" onClick={() => onAddSubcategory?.(row.original)} title="Ajouter une sous-catégorie">
                <Plus className="h-4 w-4 text-blue-600" />
                <span className="sr-only">Ajouter une sous-catégorie</span>
            </Button>

            <Button variant={'ghost'} size="icon" onClick={() => onDelete?.(row.original)}>
                <Trash2 className="text-red h-4 w-4" style={{ color: 'red' }} />
                <span className="sr-only">Supprimer</span>
            </Button>
        </div>
    );
}
