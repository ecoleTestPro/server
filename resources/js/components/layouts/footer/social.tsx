import { FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { CONTACT_INFO } from './footer';

interface SocialProps {
    variant?: 'one' | 'two';
}

const Social: React.FC<SocialProps> = ({ variant = 'one' }) => {
    const VariantOne = () => (
        <div>
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
    );

    const VariantTwo = () => (
        <div className="w-full">
            <div className="p-8 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Carte Email */}
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full mr-4">
                                <HiMail className="w-8 h-8 text-primary-600 dark:text-primary-400 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Email</h3>
                        </div>
                        <a
                            href={`mailto:${CONTACT_INFO.email}`}
                            className="text-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 break-all"
                        >
                            {CONTACT_INFO.email}
                        </a>
                    </div>

                    {/* Carte Téléphones */}
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                                <HiPhone className="w-8 h-8 text-green-600 dark:text-green-400 animate-bounce" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Téléphones</h3>
                        </div>
                        <div className="space-y-2">
                            <a
                                href={`tel:${CONTACT_INFO.phone1}`}
                                className="block text-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                            >
                                {CONTACT_INFO.phone1}
                            </a>
                            <a
                                href={`tel:${CONTACT_INFO.phone2}`}
                                className="block text-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                            >
                                {CONTACT_INFO.phone2}
                            </a>
                        </div>
                    </div>

                    {/* Carte Adresse */}
                    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 md:col-span-2">
                        <div className="flex items-center justify-center mb-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full mr-4">
                                <HiLocationMarker className="w-8 h-8 text-red-600 dark:text-red-400 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Adresse</h3>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{CONTACT_INFO.address}</p>
                    </div>
                </div>

                {/* Section Réseaux Sociaux */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">Suivez-nous sur les réseaux sociaux</h3>
                    <div className="flex justify-center gap-6">
                        <a
                            href="https://web.facebook.com/profile.php?id=61571070781870&is_tour_completed"
                            target="_blank"
                            className="group relative"
                            aria-label="Facebook"
                        >
                            <div className="absolute inset-0 bg-[#3b5998] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                                <FaFacebook className="w-12 h-12 text-[#3b5998]" />
                            </div>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/105869023/admin/analytics/updates/"
                            target="_blank"
                            className="group relative"
                            aria-label="LinkedIn"
                        >
                            <div className="absolute inset-0 bg-[#0077B5] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                                <FaLinkedin className="w-12 h-12 text-[#0077B5]" />
                            </div>
                        </a>
                        <a href="https://wa.me/message/H2CNYKQSQNCAL1" target="_blank" className="group relative" aria-label="WhatsApp">
                            <div className="absolute inset-0 bg-[#25D366] rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg group-hover:shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                                <FaWhatsapp className="w-12 h-12 text-[#25D366]" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return <div>{variant === 'one' ? <VariantOne /> : <VariantTwo />}</div>;
};

export default Social;
