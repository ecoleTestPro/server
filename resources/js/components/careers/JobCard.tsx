import { IJobOffer } from '@/types';
import { motion, Variants } from 'framer-motion';
import React, { useState } from 'react';
import JobApplyModal from './JobApplyModal';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Composant pour une carte d'offre d'emploi
export const JobCard: React.FC<{ job: IJobOffer }> = ({ job }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        hover: { y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } },
    };

    const [open, setOpen] = useState(false);

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                {job.company}
                {job.location && (
                    <span className="flex items-center gap-1">
                        - <FaMapMarkerAlt className="inline" /> {job.location}
                    </span>
                )}
            </p>
            {job?.salary && (
                <p className="text-gray-500 dark:text-gray-400">
                    {job.type} - {job?.salary?.toLocaleString()} €/an
                </p>
            )}
            <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{job.description}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Publié le {job.created_at}</p>
            <button
                onClick={() => setOpen(true)}
                className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            >
                Postuler
            </button>
            <JobApplyModal jobId={job.id!} open={open} onClose={() => setOpen(false)} />
        </motion.div>
    );
};
