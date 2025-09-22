import { IJobApplication } from '@/types';
import axios from 'axios';
import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<IJobApplication>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        try {
            const formData = new FormData();
            formData.append('job_offer_id', jobId.toString());
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('phone', form.phone);
            if (form.cv) {
                formData.append('cv', form.cv);
            }

            const response = await axios.post(route('job.apply'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Candidature envoyée avec succès!');
                onClose();
                setForm({
                    job_offer_id: jobId,
                    name: '',
                    email: '',
                    phone: '',
                    cv: null,
                });
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                // Validation errors
                const validationErrors = error.response.data.errors || {};
                setErrors(validationErrors);
                toast.error('Veuillez corriger les erreurs dans le formulaire');
            } else {
                toast.error("Erreur lors de l'envoi de la candidature");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Le fichier ne doit pas dépasser 5MB');
                return;
            }
            setForm({ ...form, cv: file });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">Postuler à cette offre</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom complet *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Votre nom complet"
                                required
                                disabled={isSubmitting}
                                aria-invalid={errors.name ? 'true' : 'false'}
                            />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="votre.email@exemple.com"
                                required
                                disabled={isSubmitting}
                                aria-invalid={errors.email ? 'true' : 'false'}
                            />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                placeholder="+33 6 12 34 56 78"
                                required
                                disabled={isSubmitting}
                                aria-invalid={errors.phone ? 'true' : 'false'}
                            />
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cv">CV (PDF, DOC, DOCX) *</Label>
                            <div className="relative">
                                <Input
                                    id="cv"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    required
                                    disabled={isSubmitting}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                    aria-invalid={errors.cv ? 'true' : 'false'}
                                />
                                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>
                            {form.cv && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="truncate">{form.cv?.name}</span>
                                    <span>({Math.round(form.cv?.size / 1024 || 0)} KB)</span>
                                </div>
                            )}
                            {errors.cv && <p className="text-sm text-destructive">{errors.cv}</p>}
                            <p className="text-xs text-muted-foreground">Taille maximale: 5MB</p>
                        </div>
                    </div>

                    <DialogFooter className="gap-3">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !form.name || !form.email || !form.phone || !form.cv}
                            className="min-w-[100px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Envoi...
                                </>
                            ) : (
                                'Envoyer'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
