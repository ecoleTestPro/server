import { JobList } from '@/components/careers/JobList';
import { JobPostFormModal } from '@/components/careers/JobPostFormModal';
import { JobSearchFilters } from '@/components/careers/JobSearchFilters';
import ContactCard from '@/components/contactUs/ContactCard';
import Hero from '@/components/hero/hearo';
import { IHeroBreadcrumbItems } from '@/components/hero/HeroCourse';
import MotionSection from '@/components/motion/MotionSection';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Types pour les offres d'emploi
export interface JobOffer {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'CDI' | 'CDD' | 'Freelance' | 'Stage';
    salary: number;
    description: string;
    postedAt: string;
}

// Données fictives pour les offres (à remplacer par une API)
export const mockJobs: JobOffer[] = [
    {
        id: '1',
        title: 'Développeur Full Stack',
        company: 'TechCorp',
        location: 'Paris, France',
        type: 'CDI',
        salary: 60000,
        description: 'Rejoignez notre équipe pour développer des applications web modernes.',
        postedAt: '2025-06-20',
    },
    {
        id: '2',
        title: 'Designer UX/UI',
        company: 'DesignLab',
        location: 'Lyon, France',
        type: 'Freelance',
        salary: 50000,
        description: 'Créez des interfaces utilisateur intuitives et attrayantes.',
        postedAt: '2025-06-18',
    },
];

export default function Careers() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const pageTitle = t('PAGES.CAREERS', 'Carrières');

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.CAREERS', pageTitle), href: '#' },
    ];

    const [jobs, setJobs] = useState<JobOffer[]>(mockJobs);
    const [filters, setFilters] = useState({ title: '', location: '', type: '', minSalary: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredJobs = jobs.filter((job) => {
        return (
            job.title.toLowerCase().includes(filters.title.toLowerCase()) &&
            job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.type === '' || job.type === filters.type) &&
            job.salary >= filters.minSalary
        );
    });

    const handlePostJob = (newJob: Omit<JobOffer, 'id' | 'postedAt'>) => {
        const job: JobOffer = {
            ...newJob,
            id: String(jobs.length + 1),
            postedAt: new Date().toISOString().split('T')[0],
        };
        setJobs([...jobs, job]);
    };

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
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Offres d'emploi</h1>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                                >
                                    Publier une offre
                                </button>
                            </div>
                            <JobSearchFilters onFilterChange={setFilters} />
                            <JobList jobs={filteredJobs} />
                            <JobPostFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handlePostJob} />
                        </div>
                    </motion.div>
                </MotionSection>

                <ContactCard />
            </div>
        </DefaultLayout>
    );
}
