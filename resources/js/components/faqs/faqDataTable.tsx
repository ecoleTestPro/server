import { IFaq } from '@/types/faq';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, MessageCircle, HelpCircle as QuestionMarkCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import FaqActionBtn from './faqActionBtn';

interface FaqDataTableProps {
    faqs: IFaq[];
    onEditRow?: (row: IFaq) => void;
    onDeleteRow?: (row: IFaq) => void;
}

export default function FaqDataTable({ faqs, onEditRow, onDeleteRow }: FaqDataTableProps) {
    const { t } = useTranslation();
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRowExpansion = (rowId: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(rowId)) {
            newExpanded.delete(rowId);
        } else {
            newExpanded.add(rowId);
        }
        setExpandedRows(newExpanded);
    };

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
                    <div className="py-2 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-gray-100 break-words">{faq.question}</div>
                    </div>
                );
            },
            size: 100,
        },
        {
            accessorKey: 'answer',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                            <span className="hidden sm:inline">Réponse</span>
                            <span className="sm:hidden">Rép.</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Réponse détaillée à la question posée</p>
                    </TooltipContent>
                </Tooltip>
            ),
            size: 300,
            cell: ({ row }) => {
                const answer = row.original.answer;
                const faqId = row.original.id;
                const isExpanded = faqId ? expandedRows.has(faqId) : false;
                const shouldTruncate = answer && answer.length > 80;

                if (!answer) {
                    return <span className="text-gray-400 text-sm italic">Aucune réponse</span>;
                }

                return (
                    <div className="w-[250px]">
                        <div
                            className="text-sm text-gray-600 dark:text-gray-300 break-words"
                            dangerouslySetInnerHTML={{
                                __html: shouldTruncate && !isExpanded ? `${answer.substring(0, 80)}...` : answer,
                            }}
                        />
                        {shouldTruncate && faqId && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mt-1 p-0 h-auto text-primary hover:text-primary/80 text-xs"
                                onClick={() => toggleRowExpansion(faqId)}
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp className="h-3 w-3 mr-1" />
                                        <span className="hidden sm:inline">Réduire</span>
                                        <span className="sm:hidden">−</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-3 w-3 mr-1" />
                                        <span className="hidden sm:inline">Plus</span>
                                        <span className="sm:hidden">+</span>
                                    </>
                                )}
                            </Button>
                        )}
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
                        className={`text-xs whitespace-nowrap ${
                            isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                    >
                        <span className="hidden sm:inline">{isActive ? 'Active' : 'Inactive'}</span>
                        <span className="sm:hidden">{isActive ? 'A' : 'I'}</span>
                    </Badge>
                );
            },
            size: 100,
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <FaqActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
            size: 120,
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
                    Commencez par créer des questions-réponses pour aider vos visiteurs à trouver rapidement les informations qu'ils cherchent.
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
