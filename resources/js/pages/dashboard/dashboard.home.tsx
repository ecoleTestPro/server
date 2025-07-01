import EnrollmentRate from '@/components/charts/EnrollmentRate';
import DashboardWidget from '@/components/widgets/DashboardWidget';
import AppLayout from '@/layouts/dashboard/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // const { t } = useTranslation();

    // const { data } = usePage<SharedData>().props;

    // const [showConfirm, setShowConfirm] = useState(false);
    // const [isDeleting, setIsDeleting] = useState(false);

    // const [open, setOpen] = useState(false);
    // const [selected, setCategory] = useState<ICourseForm | undefined>(undefined);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    <DashboardWidget />
                    <EnrollmentRate />
                </div>
            </div>
        </AppLayout>
    );
}
