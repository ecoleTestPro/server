import InputError from '@/components/input-error';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types';
import { ICourse, ICourseSession } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface CourseInscriptionDialogProps {
    course: ICourse;
    session?: ICourseSession;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (formData: FormData) => void;
}

interface CourseEnrollmentForm {
    name: string;
    email: string;
    mode: 'online' | 'in-person';
    phone: string;
    company?: string;
    [key: string]: any; // <-- Add this line
}

const CourseInscriptionDialog: React.FC<CourseInscriptionDialogProps> = ({ course, session, isOpen, onOpenChange, onSubmit }) => {
    const { auth, data: sharedData } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const { data, setData, processing, errors, reset } = useForm<CourseEnrollmentForm>({
        name: auth?.user?.name || '',
        email: auth?.user?.email || '',
        phone: auth?.user?.phone || '',
        mode: 'online',
        company: '',
    });

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CourseEnrollmentForm, string>> = {};

        //
        if (!data.name.trim()) {
            newErrors.name = t('COURSE.INSCRIPTION.ERROR.NAME_REQUIRED', 'Name is required');
        }

        // ? mode validation
        if (!data.email.trim()) {
            newErrors.email = t('COURSE.INSCRIPTION.ERROR.EMAIL_REQUIRED', 'Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = t('COURSE.INSCRIPTION.ERROR.EMAIL_INVALID', 'Invalid email format');
        }

        // ? phone validation
        // if (!data.phone.trim()) {
        //     newErrors.phone = t('COURSE.INSCRIPTION.ERROR.PHONE_REQUIRED', 'Phone is required');
        // } else if (!/^\+?[\d\s-]{8,}$/.test(data.phone)) {
        //     newErrors.phone = t('COURSE.INSCRIPTION.ERROR.PHONE_INVALID', 'Invalid phone format');
        // }

        if (Object.keys(newErrors).length > 0) {
            toast.error(Object.values(newErrors).join('. '), {
                duration: 5000,
                position: 'top-right',
                style: {
                    background: '#f8d7da',
                    color: '#721c24',
                },
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            course_id: course.id,
            user_id: auth.user?.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            mode: data.mode,
            company: data.company || undefined,
        };

        Logger.log('[Enrollment] submitting:', payload);

        axios
            .post(route('course.enrollment'), payload)
            .then((response: { data: { search_result: { courses?: ICourse[] } } }) => {
                Logger.log('[Enrollment] Course successfully enrolled:', response.data.search_result?.courses);
                toast.success(t('courses.search', 'Votre inscription a été enregistrée avec succès, nous vous contacterons bientôt.'));
                reset();
                onOpenChange(false);
            })
            .catch((error) => {
                toast.error(t('courses.search', 'Une erreur est survenue lors de l’inscription'));
                Logger.error('[Enrollment] Error fetching search results:', error);
            });
    };

    if (!course) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md" aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle>
                        <span className="text-gray-500 dark:text-gray-300">{t('COURSE.INSCRIPTION.TITLE', 'Inscription')} </span> <br />
                        <span className="text-black dark:text-white mt-2">{course.title}</span>
                        {session && (
                            <>
                                <br />
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    - Session : {session.start_date} - {session.end_date}
                                </span>
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription id="dialog-description">
                        {t('COURSE.INSCRIPTION.DESCRIPTION', 'Remplissez le formulaire ci-dessous pour vous inscrire à cette formation.')}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="mb-2">{t('COURSE.INSCRIPTION.MODE', 'Mode')}</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Input
                                    id="mode-online"
                                    type="radio"
                                    name="mode"
                                    value="online"
                                    checked={data.mode === 'online'}
                                    onChange={() => setData('mode', 'online')}
                                    className="cursor-pointer w-4 h-4"
                                    required
                                />
                                <Label htmlFor="mode-online" className="cursor-pointer">
                                    {t('enrollment.online', 'En ligne')}
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="mode-in-person"
                                    type="radio"
                                    name="mode"
                                    value="in-person"
                                    checked={data.mode === 'in-person'}
                                    onChange={() => setData('mode', 'in-person')}
                                    className="cursor-pointer w-4 h-4"
                                    required
                                />
                                <Label htmlFor="mode-in-person" className="cursor-pointer">
                                    {t('enrollment.inPerson', 'En présentiel')}
                                </Label>
                            </div>
                        </div>
                        {errors.mode && <InputError message={errors.mode} />}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">{t('enrollment.name', 'Nom complet')}</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('enrollment.namePlaceholder', 'John Doe')}
                            required
                            autoComplete="name"
                            autoFocus
                        />
                        {errors.name && <InputError message={errors.name} />}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">{t('enrollment.email', 'Email')}</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder={t('enrollment.emailPlaceholder', 'email@example.com')}
                            required
                            autoComplete="email"
                        />
                        {errors.email && <InputError message={errors.email} />}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">{t('enrollment.phone', 'Téléphone')}</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder={t('enrollment.phonePlaceholder', '+123-456-7890')}
                            required
                            autoComplete="tel"
                        />
                        {errors.phone && <InputError message={errors.phone} />}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company">{t('enrollment.company', 'Société (Optionnel)')}</Label>
                        <Input
                            id="company"
                            type="text"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder={t('enrollment.companyPlaceholder', 'Nom de votre société')}
                            autoComplete="organization"
                        />
                        {errors.company && <InputError message={errors.company} />}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="bg-muted hover:bg-muted/80 text-muted-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {t('COURSE.INSCRIPTION.CANCEL', 'Annuler')}
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-green-300"
                        >
                            {processing ? 'Submitting...' : t('COURSE.INSCRIPTION.SUBMIT', "S'inscrire")}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CourseInscriptionDialog;
