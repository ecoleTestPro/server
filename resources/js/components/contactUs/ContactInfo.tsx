import { useTranslation } from 'react-i18next';
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import { CONTACT_INFO } from '../layouts/footer/footer';
import MotionSection from '../motion/MotionSection';

interface ContactInfo {
    title: string;
    contact: string;
    link?: string;
    image: string;
    icon: React.ReactNode;
    colorClass: string;
    animation: string;
}

const contacts: ContactInfo[] = [
    {
        title: 'Email',
        contact: CONTACT_INFO.email,
        link: `mailto:${CONTACT_INFO.email}`,
        image: '/assets/images/svgs/email-part-2-svgrepo-com.svg',
        icon: <HiMail className="w-6 h-6" />,
        colorClass: 'text-primary-600 dark:text-primary-400',
        animation: 'animate-pulse',
    },
    {
        title: 'Téléphone',
        contact: CONTACT_INFO.phone1,
        link: `tel:${CONTACT_INFO.phone1}`,
        image: '/assets/images/svgs/phone-out-svgrepo-com.svg',
        icon: <HiPhone className="w-6 h-6" />,
        colorClass: 'text-green-600 dark:text-green-400',
        animation: 'animate-bounce',
    },
    {
        title: 'Téléphone',
        contact: CONTACT_INFO.phone2,
        link: `tel:${CONTACT_INFO.phone2}`,
        image: '/assets/images/svgs/phone-out-svgrepo-com.svg',
        icon: <HiPhone className="w-6 h-6" />,
        colorClass: 'text-green-600 dark:text-green-400',
        animation: 'animate-bounce animation-delay-200',
    },
    {
        title: 'Adresse',
        contact: CONTACT_INFO.address,
        image: '/assets/images/svgs/support_agent.svg',
        icon: <HiLocationMarker className="w-6 h-6" />,
        colorClass: 'text-red-600 dark:text-red-400',
        animation: 'animate-pulse',
    },
];

export default function ContactInfo() {
    const { t } = useTranslation();
    return (
        <MotionSection>
            <div>
                <div className="container">
                    <div className="mb-8">
                        {/* <AppLogo width={260} /> */}
                        {/* <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Contactez nous</h2> */}
                        <p className="text-gray-600 dark:text-gray-400">
                            Que vous ayez des questions, que vous ayez besoin d'un devis ou que vous souhaitiez simplement nous saluer, nous sommes là
                            pour vous aider. N'hésitez pas à nous contacter et notre équipe vous répondra dans les plus brefs délais.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {contacts.map((widget, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:translate-x-2 border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`${widget.colorClass} ${widget.animation} flex-shrink-0`}>{widget.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{widget.title}</h3>
                                        {widget.link ? (
                                            <a
                                                href={widget.link}
                                                className={`inline-block text-gray-600 dark:text-gray-400 transition-all duration-300 hover:${widget.colorClass.replace('text-', 'text-')} hover:underline group-hover:translate-x-1`}
                                            >
                                                {widget.contact}
                                            </a>
                                        ) : (
                                            <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                                                {widget.contact}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionSection>
    );
}
