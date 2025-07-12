import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import LogDataTable from '@/components/newsletter/logDataTable';
import { INewsletterLog } from '@/types/newsletterLog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logs',
        href: '/dashboard/newsletter-logs',
    },
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
];

export default function NewsletterLogs() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [logs, setLogs] = useState<INewsletterLog[]>([]);

    useEffect(() => {
        if (data && Array.isArray(data.logs)) {
            setLogs(data.logs as any);
        }
    }, [data]);

    const handleResend = (log: INewsletterLog) => {
        router.post(route('dashboard.newsletter-logs.resend', log.id), {}, {
            onSuccess: () => {
                toast.success(t('mail.resent', 'Mail renvoyé'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter Logs" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto flex h-full items-center justify-center">
                    {logs && <LogDataTable logs={logs} onResend={handleResend} />}
                </div>
            </div>
        </AppLayout>
    );
}
