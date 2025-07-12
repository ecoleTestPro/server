import { IJobOffer } from '@/types';
import { useState } from 'react';
import JobApplyModal from './JobApplyModal';

export const JobTable: React.FC<{ jobs: IJobOffer[] }> = ({ jobs }) => {
    const [openJob, setOpenJob] = useState<number | null>(null);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Titre</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Entreprise</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Localité</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <tr key={job.id}>
                                <td className="px-4 py-2 whitespace-nowrap">{job.title}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{job.company}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{job.location}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{job.type}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <button
                                        onClick={() => setOpenJob(job.id!)}
                                        className="inline-block rounded bg-primary-600 px-3 py-1 text-white hover:bg-primary-700"
                                    >
                                        Postuler
                                    </button>
                                    <JobApplyModal jobId={job.id!} open={openJob === job.id} onClose={() => setOpenJob(null)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-6 text-center text-gray-600 dark:text-gray-300">
                                Aucune offre trouvée.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
