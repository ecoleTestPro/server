import { ICourseEnrollment } from '@/types/course';
import { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, ArrowUpDown, Mail, Phone, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';

interface EnrollmentDataTableProps {
    enrollments: ICourseEnrollment[];
    onDeleteRow?: (row: ICourseEnrollment) => void;
}

const modeOptions = [
    { label: 'En ligne', value: 'online' },
    { label: 'En présentiel', value: 'in-person' },
    { label: 'En hybride (en ligne + présentiel)', value: 'hybrid' },
];

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
            cell: ({ row }) => <span>{row.original.user_fullname || '-'}</span>,
        },
        {
            id: 'email',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.user_email || '-'}</span>,
        },
        {
            id: 'phone',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Téléphone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <span>{row.original.user_phone || '-'}</span>,
        },
        {
            id: 'contact',
            header: 'Contact',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    {row.original.user_email && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={`mailto:${row.original.user_email}`}>
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Mail</span>
                            </a>
                        </Button>
                    )}
                    {row.original.user_phone && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={`tel:${row.original.user_phone}`}>
                                <Phone className="h-4 w-4" />
                                <span className="sr-only">Téléphone</span>
                            </a>
                        </Button>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'course',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Formation
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                if (!row.original.course?.title) {
                    return (
                        <div className="flex items-center gap-2 cursor-help">
                            <Badge variant="destructive" className="gap-1 animate-pulse">
                                <AlertTriangle className="h-3 w-3" />
                                Formation supprimée
                            </Badge>
                        </div>
                    );
                }
                return <span>{row.original.course.title}</span>;
            },
        },
        {
            accessorKey: 'mode',
            header: 'Mode',
            cell: ({ row }) => {
                const label = modeOptions.find((option) => option.value === row.original.mode)?.label || '-';
                return <span>{label}</span>;
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: ({ row }) => <span>{row.original.created_at?.toString().slice(0, 10) || ''}</span>,
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <Button variant="ghost" size="icon" onClick={() => onDeleteRow?.(row.original)}>
                    <Trash2 className="text-red-600 h-4 w-4" />
                </Button>
            ),
        },
    ];

    return <DataTable columns={columns} data={enrollments} filterColumn="mode" />;
}
