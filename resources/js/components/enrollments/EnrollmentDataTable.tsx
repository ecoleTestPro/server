import { ICourseEnrollment } from '@/types/course';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Trash2 } from 'lucide-react';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';

interface EnrollmentDataTableProps {
    enrollments: ICourseEnrollment[];
    onDeleteRow?: (row: ICourseEnrollment) => void;
}

export default function EnrollmentDataTable({ enrollments, onDeleteRow }: EnrollmentDataTableProps) {
    const columns: ColumnDef<ICourseEnrollment>[] = [
        {
            accessorKey: 'user',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Utilisateur
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.user?.name || '-'}</span>,
        },
        {
            id: 'email',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.user?.email || '-'}</span>,
        },
        {
            id: 'phone',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Téléphone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.user?.phone || '-'}</span>,
        },
        {
            accessorKey: 'course',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Formation
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.course?.title || '-'}</span>,
        },
        {
            accessorKey: 'mode',
            header: 'Mode',
            cell: ({ row }) => <span>{row.original.mode}</span>,
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: ({ row }) => <span>{row.original.created_at?.toString().slice(0,10) || ''}</span>,
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

    return <DataTable columns={columns} data={enrollments} filterColumn="mode" />;
}
