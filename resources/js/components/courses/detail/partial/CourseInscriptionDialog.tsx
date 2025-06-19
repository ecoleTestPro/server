import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Assuming the Dialog components are exported to this path
import { cn } from '@/lib/utils';
import { ICourse } from '@/types/course';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

// Mock user type (replace with actual auth context type)
interface User {
    name?: string;
    email?: string;
}

// Props interface
interface CourseInscriptionDialogProps {
    course: ICourse;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User; // Optional user object for logged-in users
    onSubmit: (formData: FormData) => void; // Callback for form submission
}

// Form data interface
interface FormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
}

const CourseInscriptionDialog: React.FC<CourseInscriptionDialogProps> = ({ course, isOpen, onOpenChange, user, onSubmit }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState<FormData>({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        company: '',
    });
    const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field when user types
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.name.trim()) {
            newErrors.name = t('COURSE.INSCRIPTION.ERROR.NAME_REQUIRED', 'Name is required');
        }
        if (!formData.email.trim()) {
            newErrors.email = t('COURSE.INSCRIPTION.ERROR.EMAIL_REQUIRED', 'Email is required');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('COURSE.INSCRIPTION.ERROR.EMAIL_INVALID', 'Invalid email format');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            onOpenChange(false); // Close dialog on successful submission
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t('COURSE.INSCRIPTION.TITLE', 'Register for {{title}}', { title: course.title })}</DialogTitle>
                    <DialogDescription>{t('COURSE.INSCRIPTION.DESCRIPTION', 'Fill out the form to enroll in this course.')}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            {t('COURSE.INSCRIPTION.NAME', 'Full Name')}
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={cn(
                                'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                errors.name && 'border-red-500',
                            )}
                            placeholder={t('COURSE.INSCRIPTION.NAME_PLACEHOLDER', 'Enter your full name')}
                            disabled={!!user?.name} // Disable if user is logged in and name is pre-filled
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            {t('COURSE.INSCRIPTION.EMAIL', 'Email')}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={cn(
                                'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                                errors.email && 'border-red-500',
                            )}
                            placeholder={t('COURSE.INSCRIPTION.EMAIL_PLACEHOLDER', 'Enter your email')}
                            disabled={!!user?.email} // Disable if user is logged in and email is pre-filled
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                            {t('COURSE.INSCRIPTION.PHONE', 'Phone Number (Optional)')}
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={t('COURSE.INSCRIPTION.PHONE_PLACEHOLDER', 'Enter your phone number')}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="company" className="text-sm font-medium">
                            {t('COURSE.INSCRIPTION.COMPANY', 'Company (Optional)')}
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={t('COURSE.INSCRIPTION.COMPANY_PLACEHOLDER', 'Enter your company name')}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="bg-muted hover:bg-muted/80 text-muted-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {t('COURSE.INSCRIPTION.CANCEL', 'Cancel')}
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {t('COURSE.INSCRIPTION.SUBMIT', 'Submit Registration')}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CourseInscriptionDialog;
