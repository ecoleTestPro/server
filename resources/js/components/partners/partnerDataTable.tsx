import { IPartner } from '@/types/partner';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button/button';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import PartnerActionBtn from './partnerActionBtn';

interface PartnerDataTableProps {
    partners: IPartner[];
    onEditRow?: (row: IPartner) => void;
    onDeleteRow?: (row: IPartner) => void;
}

export default function PartnerDataTable({ partners, onEditRow, onDeleteRow }: PartnerDataTableProps) {
    const columns: ColumnDef<IPartner>[] = [
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
            accessorKey: 'name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const partner = row.original;
                const name = partner.name || '';
                const imageUrl = partner.media?.src || null;

                return (
                    <div className="flex items-center gap-2">
                        {imageUrl && <img src={imageUrl} alt={name} className="h-8 w-8 rounded object-cover" />}
                        <span>{name}</span>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <PartnerActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    return <DataTable columns={columns} data={partners} filterColumn="name" />;
}
