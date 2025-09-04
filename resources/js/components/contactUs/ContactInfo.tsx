import { useTranslation } from 'react-i18next';
import MotionSection from '../motion/MotionSection';
import TitleBadgeOne from '../ui/badge-one';

interface ContactInfo {
    title: string;
    contact: string;
    link?: string;
    image: string;
}

const contacts: ContactInfo[] = [
    {
        title: 'Email',
        contact: 'info@testpro-group.com',
        link: 'mailto:info@testpro-group.com',
        image: '/assets/images/svgs/email-part-2-svgrepo-com.svg',
    },
    {
        title: 'Téléphone',
        contact: '+225 0706915705',
        link: 'tel:+2250706915705',
        image: '/assets/images/svgs/phone-out-svgrepo-com.svg',
    },
    {
        title: 'Adresse',
        contact: "Siège social: 5ème étage de la Résidence Pacy En face de l'immeuble CGK, Cocody Angré Djibi - 9ème tranche, Abidjan Côte d'Ivoire",
        image: '/assets/images/svgs/support_agent.svg',
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
                            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <div className="flex items-center mb-3">
                                    <img src={widget.image} alt={widget.title} className="w-8 h-8 mr-3" />
                                    <h3 className="text-lg font-semibold">{widget.title}</h3>
                                </div>
                                {widget.link ? (
                                    <a href={widget.link} className="text-blue-500 hover:underline mt-2 block">
                                        {widget.contact}
                                    </a>
                                ) : (
                                    <p className="text-gray-700 dark:text-gray-300">{widget.contact}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionSection>
    );
}
