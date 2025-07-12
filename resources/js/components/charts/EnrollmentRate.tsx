import { CLASS_NAME } from '@/data/styles/style.constant';
import EnrollmentRateAreaChart from './EnrollmentRateAreaChart';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function EnrollmentRate() {
    const { data } = usePage<SharedData>().props;
    const charts = data.chart_data;

    if (!charts) return null;

    return (
        <section className={CLASS_NAME.section}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnrollmentRateAreaChart
                    title="Inscriptions"
                    series={charts.enrollment_area.series}
                    categories={charts.enrollment_area.categories}
                />
                <EnrollmentRateAreaChart
                    title="Formations"
                    series={charts.course_area.series}
                    categories={charts.course_area.categories}
                />
            </div>
        </section>
    );
}
