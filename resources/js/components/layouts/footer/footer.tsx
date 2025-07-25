import AppLogo from '@/components/app-logo';
import NewsletterCTA from '@/components/newsletter/newletter-cta';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export const CONTACT_INFO = {
    // phone1: '+41 78 225 58 07',
    phone2: '+225 0706915705',
    address: "Siège social: 5ème étage de la Résidence Pacy En face de l'immeuble CGK, Cocody Angré Djibi - 9ème tranche, Abidjan Côte d'Ivoire",
    email: 'info@ecoletestpro.com',
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
                                <div  className='mb-4'>
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
                                <div className="mt-2 md:mt-5">
                                    <a
                                        href="https://web.facebook.com/profile.php?id=61571070781870&is_tour_completed"
                                        target="_blank"
                                        className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                    >
                                        <i className="ri-facebook-fill"></i>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/105869023/admin/analytics/updates/"
                                        target="_blank"
                                        className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                    >
                                        <i className="ri-linkedin-fill"></i>
                                    </a>
                                    <a
                                        href="https://wa.me/message/H2CNYKQSQNCAL1"
                                        target="_blank"
                                        className="inline-block text-[20px] leading-none text-gray-600 transition-all hover:text-gray-400 ltr:mr-[5px] ltr:last:mr-0 rtl:ml-[5px] rtl:last:ml-0"
                                    >
                                        <i className="ri-whatsapp-fill"></i>
                                    </a>
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
                            <ul>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Email:
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-500 transition-all hover:text-gray-800">
                                        {CONTACT_INFO.email}
                                    </a>
                                </li>
                                {/* <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Téléphone 1:
                                    <a href="tel:+41782255807" className="text-gray-500 transition-all hover:text-gray-800">
                                        {CONTACT_INFO.phone1}
                                    </a>
                                </li> */}
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Téléphone:
                                    <a href={`tel:${CONTACT_INFO.phone2}`} className="text-gray-500 transition-all hover:text-gray-800">
                                        {CONTACT_INFO.phone2}
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Adresse:
                                    <span className="font-semibold">{CONTACT_INFO.address}</span>
                                </li>
                            </ul>
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
                                © <span className="text-gray-500">Ecole test pro </span>
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
            <div className="bg-black flex justify-end items-center text-white ">
                <div className="container mx-auto">
                    <Link href={ROUTE_MAP.auth.adminLogin.link}>{t('FOOTER.LOGIN', 'Connexion')}</Link>
                </div>
            </div>
        </>
    );
}
