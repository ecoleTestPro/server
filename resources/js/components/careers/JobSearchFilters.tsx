import { motion, Variants } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export const JobSearchFilters: React.FC<{
    onFilterChange: (filters: { title: string; location: string; type: string; minSalary: number }) => void;
}> = ({ onFilterChange }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [minSalary] = useState(0); // setMinSalary non utilisé

    useEffect(() => {
        onFilterChange({ title, location, type, minSalary });
    }, [title, location, type, minSalary, onFilterChange]);

    const filterVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6" variants={filterVariants} initial="hidden" animate="visible">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Titre du poste"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                    type="text"
                    placeholder="Localisation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="">Type de contrat</option>
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Stage">Stage</option>
                </select>
                {/* Salary filter disabled
                <input
                    type="number"
                    placeholder="Salaire minimum (€)"
                    value={minSalary || ''}
                    onChange={(e) => setMinSalary(Number(e.target.value))}
                    className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                */}
            </div>
        </motion.div>
    );
};
