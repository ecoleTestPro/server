import AppLogo from '@/components/app-logo';
import NewsletterCTA from '@/components/newsletter/newletter-cta';
import { useTranslation } from 'react-i18next';

export default function FooterTwo() {
    const { t } = useTranslation();

    const quickLinks = [
        {
            link: '/about',
            label: 'À propos de nous',
        },
        {
            link: '/careers',
            label: 'Carrière',
        },
        {
            link: '/contact',
            label: 'Contactez-Nous',
        },
        {
            link: '/certifications',
            label: 'Formations Certifiantes',
        },
        {
            link: '/custom-training',
            label: 'Formations Sur-Mesure',
        },
        {
            link: '/reconversion-programs',
            label: 'Programmes de Reconversion',
        },
    ];

    const contactInfo = {
        phone1: '+41 78 225 58 07',
        phone2: '+225 0706915705',
        address: "Siège social: 5ème étage de la Résidence Pacy En face de l'immeuble CGK, Cocody Angré Djibi - 9ème tranche, Abidjan Côte d'Ivoire",
        email: 'info@ecoletestpro.com',
    };

    return (
        <>
            {/* CTA */}
            <NewsletterCTA />

            <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                <div className="h-px w-full bg-gray-100 dark:hidden dark:bg-gray-900"></div>
            </div>

            <div className="relative z-[1] py-[70px] md:py-[90px] lg:py-[110px] xl:py-[130px] 2xl:py-[150px] dark:bg-[#0a0e19]">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
                        {/*  */}
                        <div className="ltr:xl:-mr-[35px] rtl:xl:-ml-[35px]">
                            <AppLogo />
                            <div>
                                <h5 className="!mb-[10px] !text-xl !leading-[1.2] !font-medium !text-gray-900 dark:!text-white">
                                    Boostez votre carrière avec TestPro !
                                </h5>

                                <p className='text-gray-600 dark:text-gray-400 text-left text-[20px] '>
                                    Formations certifiantes et sur-mesure, adaptées aux besoins du secteur éducatif et professionnel. Accédez à de
                                    nouvelles opportunités grâce à un enseignement de qualité et à des programmes de reconversion innovants.
                                </p>
                            </div>
                            <div className="mt-[20px] md:mt-[35px]">
                                <a
                                    href="#"
                                    target="_blank"
                                    className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                >
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                >
                                    <i className="ri-twitter-x-fill"></i>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                >
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                                <a
                                    href="#"
                                    target="_blank"
                                    className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                >
                                    <i className="ri-dribbble-fill"></i>
                                </a>
                            </div>
                        </div>

                        <div className="ltr:xl:pl-[130px] rtl:xl:pr-[130px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Quick Links
                            </h3>
                            <ul>
                                {quickLinks.map((link, index) => (
                                    <li key={index} className="mb-[10px] last:mb-0">
                                        <a
                                            href={link.link}
                                            className="inline-block text-gray-500 transition-all hover:text-gray-600 lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="ltr:xl:pl-[80px] rtl:xl:pr-[80px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Contactez-nous
                            </h3>
                            <ul>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Email:
                                    <a href={`mailto:${contactInfo.email}`} className="text-gray-500 transition-all hover:text-gray-800">
                                        {contactInfo.email}
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Téléphone 1:
                                    <a href="tel:+41782255807" className="text-gray-500 transition-all hover:text-gray-800">
                                        {contactInfo.phone1}
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Téléphone 2:
                                    <a href={`tel:${contactInfo.phone2}`} className="text-gray-500 transition-all hover:text-gray-800">
                                        {contactInfo.phone2}
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Adresse:
                                    <span className="font-semibold">{contactInfo.address}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 bottom-0 left-0 -z-[1] bg-gradient-to-br from-secondary-100 to-secondary-200 dark:hidden dark:from-gray-900 dark:to-gray-800" />
            </div>

            <div className="py-[25px] md:py-[30px]">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-[25px]">
                        <div className="text-center ltr:lg:text-left rtl:lg:text-right">
                            <p>
                                © <span className="text-gray-500">Ecole test pro </span>
                                {new Date().getFullYear()} - {t('FOOTER.COPYRIGHT', 'Tous droits réservés.')}
                            </p>
                        </div>
                        <div className="items-center justify-end gap-[15px] text-center lg:flex">
                            <a href="#" className="mx-[7px] mt-[10px] inline-block transition-all hover:text-gray-500 lg:mx-0 lg:mt-0">
                                {t('FOOTER.TERMS', 'Terms & Conditions')}
                            </a>
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <a href="#" className="mx-[7px] mt-[10px] inline-block transition-all hover:text-gray-500 lg:mx-0 lg:mt-0">
                                {t('FOOTER.PRIVACY', 'Politique de Confidentialité')}
                            </a>
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <a href="#" className="mx-[7px] mt-[10px] inline-block transition-all hover:text-gray-500 lg:mx-0 lg:mt-0">
                                {t('FOOTER.COOKIE', 'Politique de Cookies')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
