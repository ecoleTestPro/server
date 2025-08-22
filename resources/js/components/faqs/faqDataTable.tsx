import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, HelpCircle as QuestionMarkCircle, MessageCircle, Eye } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from 'react-i18next';
import FaqActionBtn from './faqActionBtn';
import { IFaq } from '@/types/faq';

interface FaqDataTableProps {
    faqs: IFaq[];
    onEditRow?: (row: IFaq) => void;
    onDeleteRow?: (row: IFaq) => void;
}

export default function FaqDataTable({ faqs, onEditRow, onDeleteRow }: FaqDataTableProps) {
    const { t } = useTranslation();
    
    const columns: ColumnDef<IFaq>[] = [ 
        {
            accessorKey: 'question',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                            <QuestionMarkCircle className="mr-2 h-4 w-4 text-primary" />
                            Question
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Question fréquemment posée. Cliquez pour trier par ordre alphabétique.</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const faq = row.original;
                return (
                    <div className="py-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</div>
                        {faq.answer && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {faq.answer.length > 80 ? `${faq.answer.substring(0, 80)}...` : faq.answer}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'answer',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                            <span>Réponse</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Réponse détaillée à la question posée</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const answer = row.original.answer;
                if (!answer) {
                    return <span className="text-gray-400 text-sm italic">Aucune réponse</span>;
                }
                return (
                    <div className="max-w-xs">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {answer.length > 120 ? `${answer.substring(0, 120)}...` : answer}
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
                        <p>Statut d'affichage de la FAQ sur votre site web</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const isActive = row.original.is_active;
                return (
                    <Badge 
                        className={`text-xs ${
                            isActive 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                    >
                        {isActive ? 'Active' : 'Inactive'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <FaqActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    if (faqs.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <QuestionMarkCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucune FAQ</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Commencez par créer des questions-réponses pour aider vos visiteurs 
                    à trouver rapidement les informations qu'ils cherchent.
                </p>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors">
                    <QuestionMarkCircle className="w-4 h-4 mr-2 inline" />
                    Créer une FAQ
                </button>
            </div>
        );
    }
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm w-full">
            <DataTable columns={columns} data={faqs} filterColumn="question" />
        </div>
    );
}
