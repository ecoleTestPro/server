import { JobOffer } from '@/pages/public/careers/careers';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

export const JobPostFormModal: React.FC<{ isOpen: boolean; onClose: () => void; onSubmit: (job: Omit<JobOffer, 'id' | 'postedAt'>) => void }> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'CDI' as JobOffer['type'],
        salary: 0,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', company: '', location: '', type: 'CDI', salary: 0, description: '' });
        onClose();
    };

    const modalVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Publier une offre d'emploi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Titre</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Entreprise</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Localisation</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Type de contrat</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as JobOffer['type'] })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        >
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Stage">Stage</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Salaire (€/an)</label>
                        <input
                            type="number"
                            value={formData.salary || ''}
                            onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
                        >
                            Publier
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
