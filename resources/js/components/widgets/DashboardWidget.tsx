import { CLASS_NAME } from '@/data/styles/style.constant';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function DashboardWidget() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const TrendingDown = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-500"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
            />
        </svg>
    );
    const TrendingUp = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-green-400"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
        </svg>
    );

    const WidgetUserPart = () => (
        <div className="card shadow-none border border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg h-full bg-gradient-to-r from-cyan-600/10 to-bg-white">
            <div className="card-body p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-white mb-1">{t('USERS.TOTAL', 'Total utilisateurs')}</p>
                        <h6 className="mb-0 dark:text-white">{data.users?.total ?? 0}</h6>
                    </div>
                    <div className="w-[50px] h-[50px] bg-cyan-600 rounded-full flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                        </svg>
                    </div>
                </div>
                {data.users?.last_30_days && (
                    <p className="font-medium text-sm text-neutral-600 dark:text-white mt-3 mb-0 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                            {data.users?.last_30_days > 0 ? <TrendingUp /> : <TrendingDown />}+{data.users?.last_30_days ?? 0}
                        </span>
                        {t('USERS.LAST_30_DAYS', 'Dans les 30 derniers jours')}
                    </p>
                )}
            </div>
        </div>
    );

    const WidgetCoursePart = () => (
        <div className="card shadow-none border border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg h-full bg-gradient-to-r from-purple-600/10 to-bg-white">
            <div className="card-body p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-white mb-1">{t('COURSE.TOTAL', 'Formations')}</p>
                        <h6 className="mb-0 dark:text-white">{data?.courses?.total ?? 0}</h6>
                    </div>
                    <div className="w-[50px] h-[50px] bg-purple-600 rounded-full flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );

    const WidgetCouseEnrollment = () => (
        <div className="card shadow-none border border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg h-full bg-gradient-to-r from-blue-600/10 to-bg-white">
            <div className="card-body p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-white mb-1">{t('ENROLLMENT.TOTAL', 'Inscriptions')}</p>
                        <h6 className="mb-0 dark:text-white">{data?.enrollments?.total ?? 0}</h6>
                    </div>
                    <div className="w-[50px] h-[50px] bg-blue-600 rounded-full flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                            />
                        </svg>
                    </div>
                </div>
                {data.enrollments?.last_30_days && (
                    <p className="font-medium text-sm text-neutral-600 dark:text-white mt-3 mb-0 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-success-600 dark:text-success-400">
                            {data.enrollments?.last_30_days > 0 ? <TrendingUp /> : <TrendingDown />}+{data.enrollments?.last_30_days ?? 0}
                        </span>
                        {t('ENROLLMENT.LAST_30_DAYS', 'Dans les 30 derniers jours')}
                    </p>
                )}
            </div>
        </div>
    );

    const WidgetNotification = () => (
        <div className="card shadow-none border border-gray-200 dark:border-neutral-600 dark:bg-neutral-700 rounded-lg h-full bg-gradient-to-r from-yellow-600/10 to-bg-white">
            <div className="card-body p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="font-medium text-neutral-900 dark:text-white mb-1">{t('NOTIFICATION.TITLE', 'Alertes')}</p>
                        <h6 className="mb-0 dark:text-white">{data?.notifications?.unread_count ?? 0}</h6>
                    </div>
                    <div className="w-[50px] h-[50px] bg-yellow-600 rounded-full flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 text-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className={CLASS_NAME.section}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6">
                <WidgetNotification />
                <WidgetCouseEnrollment />
                <WidgetCoursePart />
                <WidgetUserPart />
            </div>
        </section>
    );
}
