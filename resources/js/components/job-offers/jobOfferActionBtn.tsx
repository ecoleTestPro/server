import { IJobOffer } from '@/types';
import { SquarePen, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface Props {
    row: { original: IJobOffer };
    onEdit?: (row: IJobOffer) => void;
    onDelete?: (row: IJobOffer) => void;
    onToggle?: (row: IJobOffer) => void;
}

export default function JobOfferActionBtn({ row, onEdit, onDelete, onToggle }: Props) {
    const offer = row.original;
    const isActive = offer.is_active;
    
    return (
        <div className="flex space-x-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        variant={'ghost'} 
                        size="icon" 
                        onClick={() => onEdit?.(offer)}
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                        <SquarePen className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Modifier l'offre <strong>{offer.title}</strong></p>
                </TooltipContent>
            </Tooltip>
            
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        variant={'ghost'} 
                        size="icon" 
                        onClick={() => onToggle?.(offer)}
                        className={`transition-colors ${
                            isActive 
                                ? 'hover:bg-yellow-50 hover:text-yellow-600' 
                                : 'hover:bg-green-50 hover:text-green-600'
                        }`}
                    >
                        {isActive ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">Activer/désactiver</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isActive ? 'Mettre en brouillon' : 'Publier'} l'offre <strong>{offer.title}</strong></p>
                </TooltipContent>
            </Tooltip>
            
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                        variant={'ghost'} 
                        size="icon" 
                        onClick={() => onDelete?.(offer)}
                        className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Supprimer</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Supprimer définitivement l'offre <strong>{offer.title}</strong></p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
