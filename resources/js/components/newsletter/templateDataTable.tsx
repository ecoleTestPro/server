import { INewsletterTemplate } from '@/types/newsletterTemplate';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';

interface Props {
    templates: INewsletterTemplate[];
    onDeleteRow?: (row: INewsletterTemplate) => void;
}

export default function TemplateDataTable({ templates, onDeleteRow }: Props) {
    const columns: ColumnDef<INewsletterTemplate>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'subject',
            header: 'Subject',
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

    return <DataTable columns={columns} data={templates} filterColumn="name" />;
}
