import { IPartner } from '@/types/partner';
import { getMediaUrl } from '@/utils/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Building2, ImageOff, Tag } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import { Skeleton } from '../ui/skeleton';
import ReferenceActionBtn from './referenceActionBtn';

interface ReferenceDataTableProps {
    references: IPartner[];
    onEditRow?: (row: IPartner) => void;
    onDeleteRow?: (row: IPartner) => void;
    loading?: boolean;
}

export default function ReferenceDataTable({ references, onEditRow, onDeleteRow, loading = false }: ReferenceDataTableProps) {
    const columns: ColumnDef<IPartner>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                    <Building2 className="mr-2 h-4 w-4 text-blue-600" />
                    Partenaire
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const reference = row.original;
                const name = reference.name || 'Sans nom';
                const imageUrl = getMediaUrl(reference.media?.src) || null;
                const linkUrl = reference.link || '';

                return (
                    <div className="flex items-center gap-3 py-2">
                        <div className="relative">
                            {imageUrl ? (
                                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                    <img
                                        src={imageUrl}
                                        alt={name}
                                        className="h-full w-full object-contain p-1"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 hidden">
                                        <ImageOff className="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-12 w-12 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                                    <ImageOff className="h-6 w-6 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{name}</div>
                            {reference.tag && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                    Tags: {reference.tag.split(';').slice(0, 2).join(', ')}
                                </div>
                            )}
                            {linkUrl && (
                                <div className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                                    <a
                                        href={linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        🌐 Site web
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: 'tag',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="h-8 px-2 lg:px-3">
                    <Tag className="mr-2 h-4 w-4 text-teal-600" />
                    Tags
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const reference = row.original;
                const tags = reference.tag || '';
                const tagList = tags
                    .split(';')
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0);

                if (tagList.length === 0) {
                    return (
                        <div className="flex items-center text-gray-400 text-sm">
                            <Tag className="mr-2 h-3 w-3" />
                            Aucun tag
                        </div>
                    );
                }

                return (
                    <div className="flex flex-wrap gap-1 py-1">
                        {tagList.slice(0, 3).map((tag, index) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs bg-teal-100 text-teal-800 hover:bg-teal-200 border border-teal-200"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {tagList.length > 3 && (
                            <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                                +{tagList.length - 3}
                            </Badge>
                        )}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: () => <span className="sr-only">Actions</span>,
            enableHiding: false,
            cell: ({ row }) => <ReferenceActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
            size: 100,
        },
    ];

    // Calcul des statistiques
    const stats = {
        total: references.length,
        active: references.filter((ref) => ref.is_active !== false).length,
        reference: references.filter((ref) => ref.is_reference === true).length,
        withTags: references.filter((ref) => ref.tag && ref.tag.trim().length > 0).length,
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                            <Skeleton className="h-4 w-20 mb-2" />
                            <Skeleton className="h-8 w-12" />
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg border">
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full">
            {/* Tableau des données ou état vide */}
            {references.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                        <Building2 className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Aucun partenaire trouvé</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                        Commencez par ajouter vos premiers partenaires et références pour les gérer ici.
                    </p>
                    <div className="flex justify-center gap-2">
                        <Button variant="outline" size="sm">
                            <Building2 className="w-4 h-4 mr-2" />
                            Ajouter un partenaire
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-sm">
                    <DataTable columns={columns} data={references} filterColumn="name" />
                </div>
            )}
        </div>
    );
}
