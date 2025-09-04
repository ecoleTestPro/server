import AppLogo from '@/components/app-logo';
import NewsletterCTA from '@/components/newsletter/newletter-cta';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import Social from './social';

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
                        <Social variant='one' /> 
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
