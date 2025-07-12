import { IJobApplication } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

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
        message: '',
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    router.post(route('job.apply'), form, {
                        onSuccess: onClose,
                    });
                }}
                className="space-y-4 rounded bg-white p-6"
            >
                <h2 className="text-xl font-bold">Postuler</h2>
                <input
                    className="w-full rounded border p-2"
                    placeholder="Nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className="w-full rounded border p-2"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <textarea
                    className="w-full rounded border p-2"
                    placeholder="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="rounded bg-gray-200 px-4 py-2">
                        Annuler
                    </button>
                    <button type="submit" className="rounded bg-primary-600 px-4 py-2 text-white">
                        Envoyer
                    </button>
                </div>
            </form>
        </div>
    );
}
