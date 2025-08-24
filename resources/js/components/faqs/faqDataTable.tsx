import { IFaq } from '@/types/faq';
import { useState } from 'react';
import { Badge } from '../ui/badge';

interface FaqDataTableProps {
    faqs: IFaq[];
    onEditRow?: (row: IFaq) => void;
    onDeleteRow?: (row: IFaq) => void;
    onCreate?: () => void;
}

export default function FaqDataTable({ faqs, onEditRow, onDeleteRow, onCreate }: FaqDataTableProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleEdit = (faq: IFaq, e: React.MouseEvent) => {
        e.stopPropagation();
        onEditRow?.(faq);
    };

    const handleDelete = (faq: IFaq, e: React.MouseEvent) => {
        onDeleteRow?.(faq);
    };

    if (faqs.length === 0) {
        return (
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Aucune FAQ disponible. Cliquez sur "Ajouter une FAQ" pour en créer une nouvelle.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-transparent dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={faq.id || index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 border-l-4 border-l-teal-500 shadow-sm"
                        >
                            <button
                                className={`w-full px-6 py-4 text-left  ${openIndex === index + 1 ? 'rounded-t-lg' : 'rounded-lg'}`}
                                onClick={() => toggleAccordion(index + 1)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center space-x-3">
                                            <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">{faq.question}</h4>
                                            {faq.is_active !== undefined && (
                                                <Badge
                                                    className={`text-xs ${
                                                        faq.is_active
                                                            ? 'bg-green-100 text-green-800 border border-green-200'
                                                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                    }`}
                                                >
                                                    {faq.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={(e) => handleEdit(faq, e)}
                                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded dark:hover:bg-blue-900/20 transition-colors duration-200"
                                            title="Modifier"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(faq, e)}
                                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded dark:hover:bg-red-900/20 transition-colors duration-200"
                                            title="Supprimer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                        <svg
                                            className="w-5 h-5 text-gray-400 transform transition-transform duration-200"
                                            style={{
                                                transform: openIndex === index + 1 ? 'rotate(180deg)' : 'rotate(0deg)',
                                            }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </button>

                            {openIndex === index + 1 && (
                                <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                                    <div className="pt-4">
                                        <div
                                            className="text-gray-600 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex space-x-3">
                                            <button
                                                onClick={(e) => handleEdit(faq, e)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Modifier
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(faq, e)}
                                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
