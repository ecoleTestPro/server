import { IJobOffer } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import JobOfferActionBtn from './jobOfferActionBtn';

interface Props {
    offers: IJobOffer[];
    onEditRow?: (row: IJobOffer) => void;
    onDeleteRow?: (row: IJobOffer) => void;
    onToggleRow?: (row: IJobOffer) => void;
}

export default function JobOfferDataTable({ offers, onEditRow, onDeleteRow, onToggleRow }: Props) {
    const columns: ColumnDef<IJobOffer>[] = [
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
            accessorKey: 'salary',
            header: 'Salaire (FCFA)',
            cell: ({ row }) => <span>{row.original.salary ? `${row.original.salary} FCFA` : ' - '}</span>,
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
