import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { IJobOffer } from '@/types';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBill } from 'react-icons/fa';
import BtnSecondary from '../ui/button/btn-secondary';

interface Props {
    job: IJobOffer;
    open: boolean;
    onClose: () => void;
    onApply: () => void;
}

export default function JobDetailModal({ job, open, onClose, onApply }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">{job.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Informations générales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {job.company && (
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Entreprise:</strong> {job.company}
                                </span>
                            </div>
                        )}

                        {job.location && (
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Localisation:</strong> {job.location}
                                </span>
                            </div>
                        )}

                        {job.type && (
                            <div className="flex items-center gap-2">
                                <FaBriefcase className="text-green-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Type:</strong> {job.type}
                                </span>
                            </div>
                        )}

                        {job.salary && (
                            <div className="flex items-center gap-2">
                                <FaMoneyBill className="text-yellow-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                    <strong>Salaire:</strong> {job.salary.toLocaleString()} (FCFA)
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {job.description && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Description du poste</h3>
                            <div
                                className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white prose-strong:text-gray-900 dark:prose-strong:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400"
                                dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                        </div>
                    )}

                    {/* Informations temporelles */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {job.created_at && (
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-blue-400" />
                                    <span>
                                        <strong>Publié le:</strong> {job.created_at}
                                    </span>
                                </div>
                            )}

                            {job.expires_at && (
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-red-400" />
                                    <span>
                                        <strong>Expire le:</strong> {job.expires_at}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex gap-3 justify-end">
                        <BtnSecondary label="Fermer" onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg" />
                        <BtnSecondary
                            label="Postuler"
                            onClick={() => {
                                onApply();
                                onClose();
                            }}
                            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
