import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, RotateCw } from 'lucide-react';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import { INewsletterLog } from '@/types/newsletterLog';

interface Props {
    logs: INewsletterLog[];
    onResend?: (row: INewsletterLog) => void;
}

export default function LogDataTable({ logs, onResend }: Props) {
    const columns: ColumnDef<INewsletterLog>[] = [
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
            accessorKey: 'subject',
            header: 'Subject',
        },
        {
            accessorKey: 'is_sent',
            header: 'Sent',
            cell: ({ row }) => (row.original.is_sent ? 'Yes' : 'No'),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => (
                !row.original.is_sent && (
                    <Button variant="ghost" size="icon" onClick={() => onResend?.(row.original)}>
                        <RotateCw className="h-4 w-4" />
                    </Button>
                )
            ),
        },
    ];

    return <DataTable columns={columns} data={logs} filterColumn="email" />;
}
