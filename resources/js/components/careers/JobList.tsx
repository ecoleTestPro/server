import { IJobOffer } from '@/types';
import { JobCard } from './JobCard';
import { JobTable } from './JobTable';

export const JobList: React.FC<{
    jobs: IJobOffer[];
    view?: 'card' | 'list';
    applySelected: number | null;
    setApplySelected: React.Dispatch<React.SetStateAction<number | null>>;
    openApplyModal: boolean;
    setOpenApplyModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ jobs, view = 'card', applySelected, setApplySelected, openApplyModal, setOpenApplyModal }) => {
    if (view === 'list') {
        return (
            <JobTable
                setApplySelected={setApplySelected}
                applySelected={applySelected}
                openApplyModal={openApplyModal}
                setOpenApplyModal={setOpenApplyModal}
                jobs={jobs}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job.id} job={job} setApplySelected={setApplySelected}
                applySelected={applySelected}
                openApplyModal={openApplyModal}
                setOpenApplyModal={setOpenApplyModal} />)
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">Aucune offre trouvée.</p>
            )}
        </div>
    );
};
