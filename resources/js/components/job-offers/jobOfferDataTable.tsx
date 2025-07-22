import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import JobOfferActionBtn from './jobOfferActionBtn';
import { IJobOffer } from '@/types';

interface Props {
    offers: IJobOffer[];
    onEditRow?: (row: IJobOffer) => void;
    onDeleteRow?: (row: IJobOffer) => void;
    onToggleRow?: (row: IJobOffer) => void;
}

export default function JobOfferDataTable({ offers, onEditRow, onDeleteRow, onToggleRow }: Props) {
    const columns: ColumnDef<IJobOffer>[] = [
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
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'expires_at',
            header: 'Expire le',
        },
        {
            accessorKey: 'is_active',
            header: 'Active',
            cell: ({ row }) => (row.original.is_active ? 'Oui' : 'Non'),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <JobOfferActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} onToggle={onToggleRow} />,
        },
    ];

    return <DataTable columns={columns} data={offers} filterColumn="title" />;
}
