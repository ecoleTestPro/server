import { ITestimonial } from '@/types/testimonial';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Switch } from '../ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface ITestimonialActionBtnProps {
    row: {
        original: ITestimonial;
    };
    onEdit?: (row: ITestimonial) => void;
    onDelete?: (row: ITestimonial) => void;
    onToggle?: (row: ITestimonial) => void;
}

export default function TestimonialActionBtn({ row, onEdit, onDelete, onToggle }: ITestimonialActionBtnProps) {
    const testimonial = row.original;
    const isActive = testimonial.is_active;

    return (
        <div className="flex items-center space-x-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center">
                        <Switch checked={isActive} onCheckedChange={() => onToggle?.(testimonial)} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isActive ? 'Cliquez pour masquer ce témoignage du site web' : 'Cliquez pour afficher ce témoignage sur le site web'}</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onEdit?.(testimonial)} className="h-8 w-8">
                        <SquarePen className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Modifier ce témoignage</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => onDelete?.(testimonial)} className="h-8 w-8 text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Supprimer définitivement ce témoignage</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
