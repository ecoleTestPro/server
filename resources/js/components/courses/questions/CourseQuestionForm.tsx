import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ICourse } from '@/types/course';
import { router } from '@inertiajs/react';
import { HelpCircle, Send, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface CourseQuestionFormProps {
    course: ICourse;
    className?: string;
}

interface FormData {
    course_id: number;
    civility: string;
    first_name: string;
    last_name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    accepts_privacy_policy: boolean;
}

const CourseQuestionForm = ({ course, className = '' }: CourseQuestionFormProps) => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        course_id: course.id!,
        civility: '',
        first_name: '',
        last_name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        accepts_privacy_policy: false,
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Use Inertia router for form submission like other public forms
        router.post(route('course.questions.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Votre question a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais.');
                // Reset form
                setFormData({
                    course_id: course.id!,
                    civility: '',
                    first_name: '',
                    last_name: '',
                    company: '',
                    email: '',
                    phone: '',
                    message: '',
                    accepts_privacy_policy: false,
                });
            },
            onError: (errors) => {
                setErrors(errors);
                const firstError = Object.values(errors)[0];
                if (Array.isArray(firstError)) {
                    toast.error(firstError[0] || 'Une erreur s\'est produite');
                } else {
                    toast.error('Une erreur s\'est produite lors de l\'envoi de votre question');
                }
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border dark:border-gray-700 ${className}`}>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-white" />
                    </div>
                    Questions sur le cours
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Avez-vous des questions sur "{course.title}" ? N'hésitez pas à nous contacter !
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Civility */}
                <div>
                    <Label htmlFor="civility" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        Civilité
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Input
                                id="civility-madame"
                                type="radio"
                                name="civility"
                                value="Madame"
                                checked={formData.civility === 'Madame'}
                                onChange={handleInputChange}
                                className="cursor-pointer w-4 h-4"
                            />
                            <Label htmlFor="civility-madame" className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                                Madame
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                id="civility-monsieur"
                                type="radio"
                                name="civility"
                                value="Monsieur"
                                checked={formData.civility === 'Monsieur'}
                                onChange={handleInputChange}
                                className="cursor-pointer w-4 h-4"
                            />
                            <Label htmlFor="civility-monsieur" className="cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                                Monsieur
                            </Label>
                        </div>
                    </div>
                    {errors.civility && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.civility[0]}</p>
                    )}
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="first_name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Prénom <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        {errors.first_name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.first_name[0]}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="last_name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nom <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        {errors.last_name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.last_name[0]}</p>
                        )}
                    </div>
                </div>

                {/* Company */}
                <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Société <span className="text-gray-400">(optionnel)</span>
                    </Label>
                    <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.company && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company[0]}</p>
                    )}
                </div>

                {/* Contact fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            E-mail <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email[0]}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Téléphone
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone[0]}</p>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Posez votre question sur cette formation..."
                        className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                        required
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message[0]}</p>
                    )}
                </div>

                {/* Privacy policy */}
                <div className="flex items-start space-x-2">
                    <input
                        id="accepts_privacy_policy"
                        name="accepts_privacy_policy"
                        type="checkbox"
                        checked={formData.accepts_privacy_policy}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        required
                    />
                    <Label htmlFor="accepts_privacy_policy" className="text-sm text-gray-700 dark:text-gray-300">
                        J'accepte la{' '}
                        <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 underline"
                        >
                            politique de confidentialité
                        </a>
                        . <span className="text-red-500">*</span>
                    </Label>
                </div>
                {errors.accepts_privacy_policy && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.accepts_privacy_policy[0]}</p>
                )}

                {/* Submit button */}
                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Envoyer
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CourseQuestionForm;