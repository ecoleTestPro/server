import { IDataWithPagination } from '@/types';
import { ICourseCategory } from '@/types/course';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import CategoryActionBtn from './categoryActionBtn';

const categories: ICourseCategory[] = [
    { id: 1, title: 'Développement Web', color: 'blue', is_featured: true },
    { id: 2, title: 'Design', color: 'red', is_featured: false },
    { id: 3, title: 'Marketing', color: 'green', is_featured: true },
];

interface CategoryDataTableProps {
    categories: IDataWithPagination<ICourseCategory>;
    onEditRow?: (row: ICourseCategory) => void;
    onDeleteRow?: (row: ICourseCategory) => void;
}

export default function CategoryDataTable({ categories, onEditRow, onDeleteRow }: CategoryDataTableProps) {
    // Définition des colonnes
    const columns: ColumnDef<ICourseCategory>[] = [
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
            accessorKey: 'title',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const category = row.original;
                const title = category.title;
                const imageUrl = category?.image?.src || null;

                return (
                    <div className="flex items-center gap-2">
                        {imageUrl && <img src={imageUrl} alt={title} className="h-8 w-8 rounded object-cover" />}
                        <span className="capitalize">{title}</span>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <CategoryActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    return <DataTable columns={columns} data={categories.data} filterColumn="title" />;
}
