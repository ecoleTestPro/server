import { IJobOffer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { AlertCircle, ArrowUpDown, Briefcase, Building2, Calendar, DollarSign, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import JobOfferActionBtn from './jobOfferActionBtn';

interface Props {
    offers: IJobOffer[];
    onEditRow?: (row: IJobOffer) => void;
    onDeleteRow?: (row: IJobOffer) => void;
    onToggleRow?: (row: IJobOffer) => void;
}

export default function JobOfferDataTable({ offers, onEditRow, onDeleteRow, onToggleRow }: Props) {
    const { t } = useTranslation();

    const getDaysUntilExpiry = (expiryDate: string | null | undefined) => {
        if (!expiryDate) return null;
        const days = Math.floor((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days;
    };

    const columns: ColumnDef<IJobOffer>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                            <Briefcase className="mr-2 h-4 w-4 text-teal-600" />
                            Poste
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Titre du poste proposé. Cliquez pour trier par ordre alphabétique.</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const offer = row.original;
                return (
                    <div className="py-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{offer.title}</div>
                        {offer.company && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Building2 className="h-3 w-3" />
                                <span>{offer.company}</span>
                            </div>
                        )}
                        {offer.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                <MapPin className="h-3 w-3" />
                                <span>{offer.location}</span>
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'type',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Briefcase className="h-4 w-4 text-gray-500" />
                            <span>Type de contrat</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Type de contrat proposé (CDI, CDD, Stage, etc.)</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const type = row.original.type;
                const typeColors: Record<string, string> = {
                    CDI: 'bg-green-100 text-green-800 border-green-200',
                    CDD: 'bg-blue-100 text-blue-800 border-blue-200',
                    Stage: 'bg-purple-100 text-purple-800 border-purple-200',
                    Alternance: 'bg-orange-100 text-orange-800 border-orange-200',
                    Freelance: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                };
                return <Badge className={`text-xs ${typeColors[type] || 'bg-gray-100 text-gray-800 border-gray-200'} border`}>{type}</Badge>;
            },
        },
        {
            accessorKey: 'salary',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>Salaire</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Salaire proposé en FCFA. Peut être laissé vide si confidentiel.</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const salary = row.original.salary;
                if (!salary || salary === 0) {
                    return <span className="text-gray-400 text-sm italic">Non spécifié</span>;
                }
                return <div className="font-medium text-gray-900 dark:text-gray-100">{salary.toLocaleString('fr-FR')} FCFA</div>;
            },
        },
        {
            accessorKey: 'expires_at',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Date d'expiration</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Date limite pour postuler à cette offre</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const expiryDate = row.original.expires_at;
                if (!expiryDate) {
                    return <span className="text-gray-400 text-sm italic">Pas de limite</span>;
                }

                const days = getDaysUntilExpiry(expiryDate);
                const date = new Date(expiryDate).toLocaleDateString('fr-FR');

                if (days !== null && days < 0) {
                    return (
                        <div className="flex items-center gap-2">
                            <Badge className="text-xs bg-red-100 text-red-800 border border-red-200">Expirée</Badge>
                            <span className="text-xs text-gray-500">{date}</span>
                        </div>
                    );
                }

                if (days !== null && days <= 7) {
                    return (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-yellow-700">{date}</span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Expire dans {days} jour{days > 1 ? 's' : ''}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    );
                }

                return (
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{expiryDate} </span>
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
                            <span>Statut</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Statut de publication de l'offre sur votre site</p>
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
                        {isActive ? 'Publiée' : 'Brouillon'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <JobOfferActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} onToggle={onToggleRow} />,
        },
    ];

    if (offers.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucune offre d'emploi</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Commencez par créer votre première offre d'emploi pour attirer les meilleurs talents.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Créer une offre
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm w-full">
            <DataTable columns={columns} data={offers} filterColumn="title" />
        </div>
    );
}
