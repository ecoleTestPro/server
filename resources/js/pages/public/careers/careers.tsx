import { JobList } from '@/components/careers/JobList';
import { JobSearchFilters } from '@/components/careers/JobSearchFilters';
import ContactCard from '@/components/contactUs/ContactCard';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import MotionSection from '@/components/motion/MotionSection';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData, IJobOffer } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types pour les offres d'emploi

export default function Careers() {
    const { auth, data } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const pageTitle = t('PAGES.CAREERS', 'Carrières');

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.CAREERS', pageTitle), href: '#' },
    ];

    const [jobs, setJobs] = useState<IJobOffer[]>(data.job_offers as IJobOffer[]);
    const [filters, setFilters] = useState({ title: '', location: '', type: '', minSalary: 0 });

    const filteredJobs = jobs.filter((job) => {
        return (
            job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.type === '' || job.type === filters.type) &&
            job.salary >= filters.minSalary
        );
    });


    const pageVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <DefaultLayout
            title={t('PAGES.CAREERS', 'Carrières')}
            description={t('PAGES.CAREERS_DESCRIPTION', 'Découvrez nos opportunités de carrière et rejoignez notre équipe.')}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.CAREERS', 'Carrières')}
                    description={t('PAGES.CAREERS_DESCRIPTION', 'Découvrez nos opportunités de carrière et rejoignez notre équipe.')}
                    breadcrumbItems={breadcrumbItems}
                    gradient="style-3"
                />

                <MotionSection>
                    <motion.div
                        className="min-h-[80vh] p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                        variants={pageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="max-w-7xl mx-auto">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Offres d'emploi</h1>
                            </div>
                            <JobSearchFilters onFilterChange={setFilters} />
                            <JobList jobs={filteredJobs} />
                        </div>
                    </motion.div>
                </MotionSection>

                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
