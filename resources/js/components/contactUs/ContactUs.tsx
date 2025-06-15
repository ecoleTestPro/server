import { CLASS_NAME } from '@/data/styles/style.constant';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';
import TitleBadgeOne from '../ui/badge-one';

const ContactUs: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className={`${CLASS_NAME.bgDefault} p-[20px] md:p-[30px] lg:p-[40px] xl:p-[60px]`}>
            <div className="pt-[60px] md:pt-[80px] lg:pt-[100px] xl:pt-[150px]">
                <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-[25px] lg:grid-cols-2">
                        <div className="rounded-[7px] border border-white/[.13] bg-white/[.31] p-[15px] backdrop-blur-[5.099999904632568px] md:p-[20px] lg:px-[20px] lg:py-[30px] ltr:xl:mr-[50px] rtl:xl:ml-[50px] dark:border-black/[.13] dark:bg-black/[.54]">
                            <img src="assets/images/front-pages/contact.jpg" alt="contact-image" className="rounded-[7px]" width={554} height={724} />
                        </div>

                        <div>
                            <div className="mb-[25px] md:mb-[30px] md:max-w-[540px] lg:mb-[35px] lg:max-w-full xl:mb-[40px]">
                                <TitleBadgeOne title="Contact" />
                                <h2 className="!mb-0 !text-[24px] !leading-[1.2] -tracking-[.5px] md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                                    {t('CONTACT_US.TITLE', 'Comment pouvons-nous vous aider ? ')}
                                </h2>
                            </div>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
