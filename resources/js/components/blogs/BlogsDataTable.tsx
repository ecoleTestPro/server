import { IBlog } from '@/types/blogs';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';

interface BlogsDataTableProps {
    blogs: IBlog[];
    onEditRow?: (row: IBlog) => void;
    onDeleteRow?: (row: IBlog) => void;
}

export default function BlogsDataTable({ blogs, onEditRow, onDeleteRow }: BlogsDataTableProps) {
    // Définition des colonnes
    const columns: ColumnDef<IBlog>[] = [
        // {
        //     id: 'select',
        //     header: ({ table }) => (
        //         <Checkbox
        //             checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({ row }) => (
        //         <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const category = row.original;
                const title = category.title;

                return (
                    <div className="flex items-center gap-2">
                        <span className="capitalize">{title}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Catégorie
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <span className="capitalize">{row.original?.category?.name || '-'}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'tags',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Étiquettes
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <span className="capitalize">show tags here</span>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                <>
                    <div className="flex space-x-2">
                        <Button variant={'ghost'} size="icon" onClick={() => onEditRow?.(row.original)}>
                            <SquarePen className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                        </Button>

                        <Button variant={'ghost'} size="icon" onClick={() => onDeleteRow?.(row.original)}>
                            <Trash2 className="text-red h-4 w-4" style={{ color: 'red' }} />
                            <span className="sr-only">Supprimer</span>
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    return <DataTable columns={columns} data={blogs} filterColumn="title" />;
}
