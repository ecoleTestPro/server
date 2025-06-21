import { CLASS_NAME } from '@/data/styles/style.constant';
import EnrollmentRateAreaChart from './EnrollmentRateAreaChart';

export default function EnrollmentRate() {
    return (
        <section className={CLASS_NAME.section}>
            <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-6 2xl:col-span-8">
                    <div className="card-body p-0">
                        <div className="flex items-center flex-wrap gap-2 justify-between">
                            <h6 className="mb-2 font-bold text-lg"></h6>
                        </div>

                        <div className="mt-10">
                            {/* <EnrollmentRateAreaChart /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
