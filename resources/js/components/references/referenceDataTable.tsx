import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import ReferenceActionBtn from './referenceActionBtn';
import { IReference } from '@/types/reference';

interface ReferenceDataTableProps {
    references: IReference[];
    onEditRow?: (row: IReference) => void;
    onDeleteRow?: (row: IReference) => void;
}

export default function ReferenceDataTable({ references, onEditRow, onDeleteRow }: ReferenceDataTableProps) {
    const columns: ColumnDef<IReference>[] = [
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
            accessorKey: 'text',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Texte
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const reference = row.original;
                const name = reference.text || '';
                const imageUrl = reference.media?.src || null;

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
            cell: ({ row }) => <ReferenceActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    return <DataTable columns={columns} data={references} filterColumn="text" />;
}
