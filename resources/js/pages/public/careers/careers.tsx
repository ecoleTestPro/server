import JobApplyModal from '@/components/careers/JobApplyModal';
import JobDetailModal from '@/components/careers/JobDetailModal';
import { JobList } from '@/components/careers/JobList';
import JobPagination from '@/components/careers/JobPagination';
import { JobSearchFilters } from '@/components/careers/JobSearchFilters';
import ContactCard from '@/components/contactUs/ContactCard';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import MotionSection from '@/components/motion/MotionSection';
import DefaultLayout from '@/layouts/public/front.layout';
import { IJobOffer, SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
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

    const [jobs] = useState<IJobOffer[]>(data.job_offers as IJobOffer[]);
    const [filters, setFilters] = useState({ title: '', location: '', type: '', minSalary: 0 });
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
    const [applySelected, setApplySelected] = useState<number | null>(null);
    const [openApplyModal, setOpenApplyModal] = useState<boolean>(false);
    const [detailSelected, setDetailSelected] = useState<number | null>(null);
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;

    const filteredJobs = jobs.filter((job) => {
        const salary = job.salary || 0;
        return (
            (job.title?.toLowerCase() ?? '').includes(filters.title.toLowerCase()) &&
            (job.location?.toLowerCase() ?? '').includes(filters.location.toLowerCase()) &&
            (filters.type === '' || job.type === filters.type) &&
            salary >= filters.minSalary
        );
    });

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

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
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Offres d'emploi</h1>
                                <div className="space-x-2">
                                    <button
                                        className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                                        onClick={() => setViewMode('card')}
                                    >
                                        Card
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        Liste
                                    </button>
                                </div>
                            </div>
                            <JobSearchFilters onFilterChange={setFilters} />
                            <JobList 
                                applySelected={applySelected} 
                                setApplySelected={setApplySelected} 
                                openApplyModal={openApplyModal} 
                                setOpenApplyModal={setOpenApplyModal}
                                detailSelected={detailSelected}
                                setDetailSelected={setDetailSelected}
                                openDetailModal={openDetailModal}
                                setOpenDetailModal={setOpenDetailModal}
                                jobs={paginatedJobs} 
                                view={viewMode} 
                            />
                            <JobPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                            <JobApplyModal jobId={applySelected || 0} open={openApplyModal} onClose={() => setOpenApplyModal(false)} />
                            {detailSelected && (
                                <JobDetailModal 
                                    job={jobs.find(j => j.id === detailSelected) || {} as IJobOffer}
                                    open={openDetailModal} 
                                    onClose={() => setOpenDetailModal(false)}
                                    onApply={() => {
                                        setApplySelected(detailSelected);
                                        setOpenApplyModal(true);
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                </MotionSection>

                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
