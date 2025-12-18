import { IBlog } from '@/types/blogs';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, BookOpen, Calendar, Eye, SquarePen, Tag, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface BlogsDataTableProps {
    blogs: IBlog[];
    onEditRow?: (row: IBlog) => void;
    onDeleteRow?: (row: IBlog) => void;
}

export default function BlogsDataTable({ blogs, onEditRow, onDeleteRow }: BlogsDataTableProps) {
    const { t } = useTranslation(); // eslint-disable-line @typescript-eslint/no-unused-vars

    const columns: ColumnDef<IBlog>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                            <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                            Titre
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Titre de l'article. Cliquez pour trier par ordre alphabétique.</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const blog = row.original;
                return (
                    <div className="py-2">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{blog.title}</div>
                        {blog.excerpt && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {blog.excerpt.length > 80 ? `${blog.excerpt.substring(0, 80)}...` : blog.excerpt}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Catégorie</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Catégorie de l'article pour l'organisation et la navigation</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const category = row.original?.category?.name;
                return (
                    <div className="flex items-center gap-2">
                        {category ? (
                            <Badge className="text-xs bg-blue-100 text-blue-800 border border-blue-200">{category}</Badge>
                        ) : (
                            <span className="text-gray-400 text-sm italic">Sans catégorie</span>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'tags',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Tag className="h-4 w-4 text-gray-500" />
                            <span>Tags</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Mots-clés pour améliorer la recherche et l'organisation</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const tags = row.original.tagArray;
                return (
                    <div className="flex flex-wrap gap-1 max-w-xs">
                        {tags?.length ? (
                            tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} className="text-xs bg-teal-100 text-teal-800 border border-teal-200">
                                    #{tag}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-400 text-sm italic">Aucun tag</span>
                        )}
                        {tags?.length > 3 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="text-xs text-gray-500 cursor-help">+{tags.length - 3}</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tags supplémentaires: {tags.slice(3).join(', ')}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'status',
            header: () => (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 cursor-help">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span>Statut</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Statut de publication de l'article sur votre site</p>
                    </TooltipContent>
                </Tooltip>
            ),
            cell: ({ row }) => {
                const isPublished = row.original.status;
                return (
                    <Badge
                        className={`text-xs ${
                            isPublished
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                        }`}
                    >
                        {isPublished ? 'Publié' : 'Brouillon'}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                <div className="flex space-x-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => onEditRow?.(row.original)} className="h-8 w-8">
                                <SquarePen className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Modifier cet article</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDeleteRow?.(row.original)}
                                className="h-8 w-8 text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Supprimer définitivement cet article</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            ),
        },
    ];

    if (blogs.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun article de blog</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                    Commencez par créer votre premier article de blog pour partager vos idées et engager votre audience.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Créer un article
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm w-full">
            <DataTable columns={columns} data={blogs} filterColumn="title" />
        </div>
    );
}
