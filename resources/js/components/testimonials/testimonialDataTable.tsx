import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { DataTable } from '../ui/dataTable';
import { Button } from '../ui/button/button';
import TestimonialActionBtn from './testimonialActionBtn';
import { ITestimonial } from '@/types/testimonial';

interface TestimonialDataTableProps {
    testimonials: ITestimonial[];
    onEditRow?: (row: ITestimonial) => void;
    onDeleteRow?: (row: ITestimonial) => void;
}

export default function TestimonialDataTable({ testimonials, onEditRow, onDeleteRow }: TestimonialDataTableProps) {
    const columns: ColumnDef<ITestimonial>[] = [
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
                const testimonial = row.original;
                const name = testimonial.name;
                const imageUrl = testimonial.media?.src || null;

                return (
                    <div className="flex items-center gap-2">
                        {imageUrl && <img src={imageUrl} alt={name} className="h-8 w-8 rounded object-cover" />}
                        <span className="capitalize">{name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'designation',
            header: 'Poste',
        },
        {
            accessorKey: 'rating',
            header: 'Note',
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <TestimonialActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} />,
        },
    ];

    return <DataTable columns={columns} data={testimonials} filterColumn="name" />;
}
