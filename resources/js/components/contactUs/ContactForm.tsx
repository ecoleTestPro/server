import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ContactFormData } from './ContactUs';

interface ContactFormProps {
    handleSubmit: (data: ContactFormData, e: React.FormEvent) => void;
}

export default function ContactForm({ handleSubmit }: ContactFormProps) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm<ContactFormData>();

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(data, e)} className="animate-form-container">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Contactez nous</h2>

                <div className="col-span-1 lg:col-span-8"></div>
                <div className="col-span-1 lg:col-span-5"></div>
                <div className="col-span-1 lg:col-span-3"></div>
                <div className="col-span-1 lg:col-span-2"></div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="lastName">
                                Nom <span className="text-red-500">*</span>{' '}
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
                            <InputError message={errors.lastName} />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstName">
                                Prénom <span className="text-red-500">*</span>{' '}
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
                            <InputError message={errors.firstName} />
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
                            <InputError message={errors.email} />
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
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-8">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.2s' }}>
                            <Label htmlFor="subject">
                                Sujet 
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="subject"
                                type="text"
                                required
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                disabled={processing}
                                placeholder="Entrez le sujet de votre message"
                                autoComplete="on"
                            />
                            <InputError message={errors.subject} />
                        </div>
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.5s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                className="focus:border-primary-500 block h-[140px] w-full rounded-md border border-gray-200 bg-gray-50 p-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:p-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Écrivez votre message..."
                                onChange={(e) => setData('message', e.target.value)}
                            ></textarea>
                        </div>{' '}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-500 block w-full transform rounded-md px-[17px] py-[12px] font-medium text-white transition-all duration-300 hover:scale-105 lg:text-[15px] xl:text-[16px]"
                >
                    <span className="relative inline-block ltr:pl-[25px] ltr:md:pl-[29px] rtl:pr-[25px] rtl:md:pr-[29px]">Envoyer</span>
                </button>
            </form>
        </div>
    );
}
