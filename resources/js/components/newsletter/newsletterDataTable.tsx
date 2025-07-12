import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import { INewsletter } from '@/types/newsletter';

interface NewsletterDataTableProps {
    newsletters: INewsletter[];
    onDeleteRow?: (row: INewsletter) => void;
}

export default function NewsletterDataTable({ newsletters, onDeleteRow }: NewsletterDataTableProps) {
    const columns: ColumnDef<INewsletter>[] = [
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: ({ row }) => <span>{row.original.created_at?.toString().slice(0, 10) || ''}</span>,
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                <Button variant="ghost" size="icon" onClick={() => onDeleteRow?.(row.original)}>
                    <Trash2 className="text-red-600 h-4 w-4" />
                </Button>
            ),
        },
    ];

    return <DataTable columns={columns} data={newsletters} filterColumn="email" />;
}
