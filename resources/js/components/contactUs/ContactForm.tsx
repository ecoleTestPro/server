import { Logger } from '@/utils/console.util';
import { useForm } from '@inertiajs/react';
import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';
import InputError from '../input-error';
import BtnSecondary from '../ui/button/btn-secondary';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import SelectCustom, { ISelectItem } from '../ui/select-custom';
import { Civility, ContactFormData } from './ContactUs';

const DEFAULT_FORM_VALUE: ContactFormData = {
    civility: '' as Civility,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subjectMessage: '',
    message: '',
    recaptchaToken: '',
};

interface ContactFormProps {
    handleSubmit: (data: ContactFormData, e: React.FormEvent) => void;
    errors: { [key in keyof ContactFormData]?: string[] };
    setErrors?: (errors: { [key in keyof ContactFormData]?: string[] }) => void;
}

export default function ContactForm({ handleSubmit, errors, setErrors }: ContactFormProps) {
    const { t } = useTranslation();
    const { data, setData, processing } = useForm<ContactFormData>(DEFAULT_FORM_VALUE);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleBeforeSubmit = useCallback(
        async (event: React.FormEvent) => {
            if (
                data.email === '' ||
                data.firstName === '' ||
                data.lastName === '' ||
                data.phone === '' ||
                data.subjectMessage === '' ||
                data.message === ''
            ) {
                if (setErrors) {
                    setErrors({
                        email: data.email === '' ? [t('contacts.emailRequired', "L'email est requis.")] : [],
                        firstName: data.firstName === '' ? [t('contacts.firstNameRequired', 'Le prénom est requis.')] : [],
                        lastName: data.lastName === '' ? [t('contacts.lastNameRequired', 'Le nom est requis.')] : [],
                        phone: data.phone === '' ? [t('contacts.phoneRequired', 'Le téléphone est requis.')] : [],
                        subjectMessage: data.subjectMessage === '' ? [t('contacts.subjectRequired', 'Le sujet est requis.')] : [],
                        message: data.message === '' ? [t('contacts.messageRequired', 'Le message est requis.')] : [],
                    });
                }
                Logger.log('Formulaire incomplet, veuillez remplir tous les champs requis.');
                return;
            }

            // event.preventDefault();
            if (!executeRecaptcha) {
                console.log('executeRecaptcha not yet available');
                return;
            }

            try {
                const token = await executeRecaptcha('form_submission');
                setData('recaptchaToken', token);
                handleSubmit({ ...data, recaptchaToken: token }, event);
            } catch (error) {
                console.error('Erreur lors de la récupération du token reCAPTCHA:', error);
            }
        },
        [executeRecaptcha, data, setData, handleSubmit],
    );

    const civities: ISelectItem[] = [
        { id: 1, title: 'Monsieur', value: 'mr' },
        { id: 2, title: 'Madame', value: 'mme' },
        { id: 3, title: 'Mademoiselle', value: 'mlle' },
    ];

    return (
        <div>
            <form className="animate-form-container">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
                    <div className="col-span-1 lg:col-span-8 grid gap-2">
                        <Label htmlFor="civility">
                            Civilité <span className="text-red-500">*</span>
                        </Label>
                        {/* defaultValue="mr" */}
                        <SelectCustom
                            data={civities}
                            selectLabel={t('contacts.civility', 'Civilité')}
                            processing={processing}
                            onValueChange={(value) => setData('civility', value as Civility)}
                            required
                        />
                        {errors?.civility?.map((error, index) => <InputError key={index} message={error} />)}
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">
                                Nom <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="lastName"
                                type="text"
                                required
                                value={data.lastName}
                                onChange={(e) => setData('lastName', e.target.value)}
                                disabled={processing}
                                placeholder={t('courses.lastName', 'Nom')}
                                autoComplete="on"
                            />
                            {errors?.lastName?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">
                                Prénom <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="firstName"
                                type="text"
                                required
                                value={data.firstName}
                                onChange={(e) => setData('firstName', e.target.value)}
                                disabled={processing}
                                placeholder={t('courses.firstName', 'Prénom')}
                                autoComplete="on"
                            />
                            {errors?.firstName?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder={t('courses.email', 'Email')}
                                autoComplete="on"
                            />
                            {errors?.email?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">
                                Téléphone <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder={t('courses.phone', 'Téléphone')}
                                autoComplete="on"
                            />
                            {errors?.phone?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-8 grid gap-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                            id="company"
                            type="text"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            disabled={processing}
                            placeholder={t('courses.company', 'Entreprise')}
                            autoComplete="on"
                        />
                        {errors?.company?.map((error, index) => <InputError key={index} message={error} />)}
                    </div>
                    <div className="col-span-1 lg:col-span-8">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.2s' }}>
                            <Label htmlFor="subject">
                                Sujet <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="subject"
                                type="text"
                                required
                                value={data.subjectMessage}
                                onChange={(e) => setData('subjectMessage', e.target.value)}
                                disabled={processing}
                                placeholder="Entrez le sujet de votre message"
                                autoComplete="on"
                            />
                            {errors?.subjectMessage?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.5s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                className="focus:border-primary-500 block h-[140px] w-full rounded-md border border-gray-200 bg-gray-50 p-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:p-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Écrivez votre message..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                            ></textarea>
                            {errors?.message?.map((error, index) => <InputError key={index} message={error} />)}
                        </div>
                    </div>
                </div>

                <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.5s' }} data-aos="fade">
                    <p className="text-sm text-gray-500">les champs marqués d'un astérisque (*) sont obligatoires.</p>
                </div>
                <div className="flex justify-center">
                    <BtnSecondary label="Envoyer" onClick={(event: any) => handleBeforeSubmit(event)} />
                </div>
            </form>
        </div>
    );
}
