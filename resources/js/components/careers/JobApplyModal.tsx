import { IJobApplication } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BtnSecondary from '../ui/button/btn-secondary';
import { Button } from '../ui/button/button';

interface Props {
    jobId: number;
    open: boolean;
    onClose: () => void;
}

export default function JobApplyModal({ jobId, open, onClose }: Props) {
    const [form, setForm] = useState<IJobApplication>({
        job_offer_id: jobId,
        name: '',
        email: '',
        phone: '',
        cv: null,
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.post(route('job.apply'), form, {
                        forceFormData: true,
                        onSuccess: () => {
                            toast.success('Candidature envoyée');
                            onClose();
                        },
                        onError: () => {
                            toast.error("Erreur lors de l'envoi");
                        },
                    });
                }}
                className="space-y-4 rounded bg-white p-6"
            >
                <h2 className="text-xl font-bold">Postuler</h2>
                <input
                    className="w-full rounded border p-2"
                    placeholder="Nom complet"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    className="w-full rounded border p-2"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="tel"
                    className="w-full rounded border p-2"
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                />
                <input
                    type="file"
                    className="w-full rounded border p-2"
                    onChange={(e) => setForm({ ...form, cv: e.target.files ? e.target.files[0] : null })}
                    accept=".pdf,.doc,.docx"
                    required
                />
                <div className="flex justify-end gap-2">
                    <Button type="button" onClick={onClose} className="rounded bg-red-300 hover:bg-red-400">
                        Annuler
                    </Button>
                    <BtnSecondary label="Envoyer" type="submit" className="rounded bg-primary-600 text-white" />
                </div>
            </form>
        </div>
    );
}
