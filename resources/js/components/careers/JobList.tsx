import { IJobOffer } from '@/types';
import { JobCard } from './JobCard';
import { JobTable } from './JobTable';

export const JobList: React.FC<{ jobs: IJobOffer[]; view?: 'card' | 'list' }> = ({ jobs, view = 'card' }) => {
    if (view === 'list') {
        return <JobTable jobs={jobs} />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">Aucune offre trouvée.</p>
            )}
        </div>
    );
};
