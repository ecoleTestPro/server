import { ITestimonial } from '@/types/testimonial';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Briefcase, Eye, MessageSquareQuote, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import TestimonialActionBtn from './testimonialActionBtn';

interface TestimonialDataTableProps {
    testimonials: ITestimonial[];
    onEditRow?: (row: ITestimonial) => void;
    onDeleteRow?: (row: ITestimonial) => void;
}

export default function TestimonialDataTable({ testimonials, onEditRow, onDeleteRow }: TestimonialDataTableProps) {
    const { t } = useTranslation();

    const columns: ColumnDef<ITestimonial>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                            <User className="mr-2 h-4 w-4 text-primary" />
                            Nom du client
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Nom du client qui a laissé le témoignage. Cliquez pour trier par ordre alphabétique.</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const testimonial = row.original;
                const name = testimonial.name;

                return (
                    <div className="py-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{name}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'designation',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Briefcase className="h-4 w-4 text-gray-500" />
                            <span>Poste</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Poste ou fonction du client dans son entreprise</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const designation = row.original.designation;
                return (
                    <div className="flex items-center gap-2">
                        {designation ? (
                            <Badge className="text-xs bg-secondary/20 text-secondary border border-secondary/30">{designation}</Badge>
                        ) : (
                            <span className="text-gray-400 text-sm italic">Non spécifié</span>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'description',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <MessageSquareQuote className="h-4 w-4 text-gray-500" />
                            <span>Témoignage</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Extrait du commentaire laissé par le client</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const description = row.original.description;
                if (!description) {
                    return <span className="text-gray-400 text-sm italic">Aucun commentaire</span>;
                }
                return (
                    <div className="max-w-xs">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            "{description.length > 80 ? `${description.substring(0, 80)}...` : description}"
                        </p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'is_active',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span>Statut</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Statut d'affichage du témoignage sur votre site web</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const isActive = row.original.is_active;
                return (
                    <Badge
                        className={`text-xs ${
                            isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                    >
                        {isActive ? 'Actif' : 'Inactif'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <TestimonialActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    if (testimonials.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <MessageSquareQuote className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun témoignage</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Commencez par collecter des avis positifs de vos clients pour renforcer votre crédibilité et convaincre de nouveaux prospects.
                </p>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
                    <MessageSquareQuote className="w-4 h-4 mr-2 inline" />
                    Ajouter un témoignage
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm w-full">
            <DataTable columns={columns} data={testimonials} filterColumn="name" />
        </div>
    );
}
