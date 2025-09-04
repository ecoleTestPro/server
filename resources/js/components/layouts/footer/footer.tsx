import AppLogo from '@/components/app-logo';
import NewsletterCTA from '@/components/newsletter/newletter-cta';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export const CONTACT_INFO = {
    // phone1: '+41 78 225 58 07',
    phone1: '+225 2722391867',
    phone2: '+225 0706915705',
    address: "Siège social: 5ème étage de la Résidence Pacy En face de l'immeuble CGK, Cocody Angré Djibi - 9ème tranche, Abidjan Côte d'Ivoire",
    email: 'info@testpro-group.com',
};

export default function Footer() {
    const { t } = useTranslation();

    const quickLinks = [
        {
            link: ROUTE_MAP.public.aboutUs.link,
            label: 'À propos de nous',
        },
        {
            link: ROUTE_MAP.public.courses.list.link,
            label: 'Formations',
        },
        {
            link: ROUTE_MAP.public.courses.list.link,
            label: 'Certifications',
        },
        {
            link: ROUTE_MAP.public.careers.link,
            label: 'Carrière',
        },
        {
            link: ROUTE_MAP.public.blogs.list.link,
            label: 'Blogs',
        },
        {
            link: ROUTE_MAP.public.faqs.link,
            label: "FAQ's",
        },
        {
            link: ROUTE_MAP.public.contact.link,
            label: 'Contactez-Nous',
        },
    ];

    return (
        <>
            {/* CTA */}
            <NewsletterCTA />

            <div className="relative z-[1] py-[30px] md:py-[40px0px] lg:py-[50px] dark:bg-[#0a0e19]">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-4">
                        {/*  */}
                        <div className="col-span-1 lg:col-span-2">
                            <div className="ltr:xl:-mr-[35px] rtl:xl:-ml-[35px]">
                                <div className="mb-4">
                                    <AppLogo width={180} />
                                </div>
                                <div>
                                    <h5 className="!mb-[10px] !text-xl !leading-[1.2] !font-medium !text-gray-900 dark:!text-white">
                                        Boostez votre carrière avec TestPro !
                                    </h5>

                                    <p className="text-left text-[20px] text-gray-600 dark:text-gray-400">
                                        Formations certifiantes et sur-mesure, adaptées aux besoins du secteur éducatif et professionnel. Accédez à de
                                        nouvelles opportunités grâce à un enseignement de qualité et à des programmes de reconversion innovants.
                                    </p>
                                </div>
                            </div>{' '}
                        </div>

                        <div className="ltr:xl:pl-[130px] rtl:xl:pr-[130px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Quick Links
                            </h3>
                            <ul>
                                {quickLinks
                                    .filter((link) => link != undefined)
                                    .map((link, index) => (
                                        <li key={index} className="mb-[10px] last:mb-0">
                                            <Link
                                                href={link.link}
                                                className="inline-block text-gray-500 transition-all hover:text-gray-600 lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="ltr:xl:pl-[80px] rtl:xl:pr-[80px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Contactez-nous
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-gray-500 lg:text-[15px] xl:text-[16px] dark:text-gray-400 group transition-all duration-300 hover:translate-x-1">
                                    <HiMail className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-600 dark:text-primary-400 animate-pulse" />
                                    <div className="flex flex-col">
                                        {/* <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Email:</span> */}
                                        <a 
                                            href={`mailto:${CONTACT_INFO.email}`} 
                                            className="text-gray-500 transition-all duration-300 hover:text-primary-600 hover:underline group-hover:text-primary-600"
                                        >
                                            {CONTACT_INFO.email}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-500 lg:text-[15px] xl:text-[16px] dark:text-gray-400 group transition-all duration-300 hover:translate-x-1">
                                    <HiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400 animate-bounce" />
                                    <div className="flex flex-col">
                                        {/* <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Téléphone 1:</span> */}
                                        <a 
                                            href="tel:+41782255807" 
                                            className="text-gray-500 transition-all duration-300 hover:text-green-600 hover:underline group-hover:text-green-600"
                                        >
                                            {CONTACT_INFO.phone1}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-500 lg:text-[15px] xl:text-[16px] dark:text-gray-400 group transition-all duration-300 hover:translate-x-1">
                                    <HiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400 animate-bounce animation-delay-200" />
                                    <div className="flex flex-col">
                                        {/* <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Téléphone 2:</span> */}
                                        <a 
                                            href={`tel:${CONTACT_INFO.phone2}`} 
                                            className="text-gray-500 transition-all duration-300 hover:text-green-600 hover:underline group-hover:text-green-600"
                                        >
                                            {CONTACT_INFO.phone2}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 text-gray-500 lg:text-[15px] xl:text-[16px] dark:text-gray-400 group transition-all duration-300 hover:translate-x-1">
                                    <HiLocationMarker className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400 animate-pulse" />
                                    <div className="flex flex-col">
                                        {/* <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Adresse:</span> */}
                                        <span className="font-semibold text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                                            {CONTACT_INFO.address}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-6 md:mt-8 flex gap-4">
                                <a
                                    href="https://web.facebook.com/profile.php?id=61571070781870&is_tour_completed"
                                    target="_blank"
                                    className="group relative inline-block transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    aria-label="Facebook"
                                >
                                    <div className="absolute inset-0 bg-[#3b5998] rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                    <FaFacebook className="w-10 h-10 text-[#3b5998] hover:text-[#2d4373] transition-colors duration-300 relative z-10" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/105869023/admin/analytics/updates/"
                                    target="_blank"
                                    className="group relative inline-block transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    aria-label="LinkedIn"
                                >
                                    <div className="absolute inset-0 bg-[#0077B5] rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                    <FaLinkedin className="w-10 h-10 text-[#0077B5] hover:text-[#005885] transition-colors duration-300 relative z-10" />
                                </a>
                                <a
                                    href="https://wa.me/message/H2CNYKQSQNCAL1"
                                    target="_blank"
                                    className="group relative inline-block transform transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    aria-label="WhatsApp"
                                >
                                    <div className="absolute inset-0 bg-[#25D366] rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                                    <FaWhatsapp className="w-10 h-10 text-[#25D366] hover:text-[#1ead51] transition-colors duration-300 relative z-10" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="from-secondary-100 to-secondary-200 absolute top-0 right-0 bottom-0 left-0 -z-[1] bg-gradient-to-br dark:hidden dark:from-gray-900 dark:to-gray-800" />
            </div>

            <div className="bg-gray-100 py-[15px] md:py-[20px] dark:bg-gray-900">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="flex items-center justify-between gap-[15px] text-gray-500 dark:text-gray-400">
                        <div className="text-center ltr:lg:text-left rtl:lg:text-right">
                            <p>
                                ©
                                <Link className="hover:underline" href={ROUTE_MAP.auth.adminLogin.link}>
                                    <span className="text-gray-500">Test pro </span>
                                </Link>
                                {new Date().getFullYear()} - {t('FOOTER.COPYRIGHT', 'Tous droits réservés.')}
                            </p>
                        </div>
                        <div className="items-center justify-end gap-[15px] text-center lg:flex">
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <Link
                                href={ROUTE_MAP.public.privacyPolicy.link}
                                className="mx-[7px] mt-[10px] inline-block transition-all hover:text-gray-500 lg:mx-0 lg:mt-0"
                            >
                                {t('FOOTER.PRIVACY', 'Politique de Confidentialité')}
                            </Link>
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <Link
                                href={ROUTE_MAP.public.termsOfService.link}
                                className="mx-[7px] mt-[10px] inline-block transition-all hover:text-gray-500 lg:mx-0 lg:mt-0"
                            >
                                {t('FOOTER.TERMS_AND_CONDITIONS', 'Conditions Générales d’Utilisation')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
