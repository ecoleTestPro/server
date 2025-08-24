import { IFaq } from '@/types/faq';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface IFaqActionBtnProps {
    row: {
        original: IFaq;
    };
    onEdit?: (row: IFaq) => void;
    onDelete?: (row: IFaq) => void;
}

export default function FaqActionBtn({ row, onEdit, onDelete }: IFaqActionBtnProps) {
    return (
        <div className="flex space-x-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onEdit?.(row.original)} className="h-8 w-8">
                        <SquarePen className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Modifier cette FAQ</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onDelete?.(row.original)} className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Supprimer définitivement cette FAQ</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
