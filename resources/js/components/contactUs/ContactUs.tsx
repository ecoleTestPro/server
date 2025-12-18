import { CLASS_NAME } from '@/data/styles/style.constant';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';

import { SharedData } from '@/types';
import { Logger } from '@/utils/console.util';
import { handleErrorsRequest } from '@/utils/utils';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MotionSection from '../motion/MotionSection';
import TitleBadgeOne from '../ui/badge-one';
import PageLoading from '../ui/page-loading';
import ContactInfo from './ContactInfo';
import ContactMap from './ContactMap';
import ContactSuccessSubmited from './ContactSuccessSubmited';

export type Civility = 'M' | 'Mme' | 'Mlle';

export interface ContactFormData {
    civility: Civility;
    company?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subjectMessage: string;
    message: string;
    recaptchaToken?: string;
}

const ContactUs: React.FC = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key in keyof ContactFormData]?: string[] }>({});

    const { data: dataShared } = usePage<SharedData>().props;

    const handleSubmit = (data: ContactFormData) => {
        setLoading(true);

        axios
            .post(route('contact.post'), data)
            .then((response) => {
                Logger.log('[ContactUs] Response from contact form submission:', response);
                if (response.data.success) {
                    setSuccess(true);
                    toast.success(
                        t('CONTACT_US.SUCCESS', 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'),
                    );
                    // e.preventDefault();
                }
                setLoading(false);
            })
            .catch((error) => {
                handleErrorsRequest(error, setLoading, (message) => toast.error(message), setErrors);
            });
    };

    useEffect(() => {
        Logger.log('[DATA_SHARED]', dataShared);
        return;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh] flex-col">
                <PageLoading />
                <p className="ml-5 italic text-gray-500 dark:text-gray-400"> Envoie en cours... </p>
            </div>
        );
    }

    if (success) {
        return <ContactSuccessSubmited />;
    }

    return (
        <>
            <section
                className={`${CLASS_NAME.bgDefault} p-[10px] lg:p-[20px]`}
                style={{
                    backgroundImage: 'url(assets/images/pattern-15.png)',
                    backgroundSize: 'cover',
                }}
            >
                <div className="p-[20px] md:p-[30px]">
                    <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                        <div className="grid grid-cols-1 items-center gap-[25px] lg:grid-cols-6 mx-auto">
                            <div className="col-span-1 lg:col-span-6 mb-2">
                                <div className="mb-[5px] lg:mb-[15px] max-w-full">
                                    <TitleBadgeOne title="Contact" />
                                    <h2 className="!mb-0 text-2xl lg:text-3xl !leading-[1.2] -tracking-[.5px]  md:-tracking-[.6px] lg:-tracking-[.8px]  xl:-tracking-[1px]">
                                        {t('CONTACT_US.TITLE', 'Comment pouvons-nous vous aider ? ')}
                                    </h2>
                                    <p className="mt-[10px] text-gray-600 dark:text-gray-400">
                                        Remplissez le formulaire ci-dessous afin que nous puissions mieux vous connaître et répondre à vos besoins.
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 lg:col-span-2">
                                <ContactInfo />
                            </div>

                            <div className="col-span-1 lg:col-span-4">
                                <MotionSection>
                                    <div
                                        className={`${CLASS_NAME.bgWhite} rounded-2xl p-[10px] shadow-lg hover:shadow-2xl transition-all duration-100 ease-in-out`}
                                    >
                                        <ContactForm handleSubmit={handleSubmit} errors={errors} setErrors={setErrors} />
                                    </div>
                                </MotionSection>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <ContactMap />
            </section>
        </>
    );
};

export default ContactUs;
