import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { CONTACT_INFO } from '../layouts/footer/footer';

export const TEAMS = [
    {
        name: 'Anass EL BEKALI',
        role: 'EXPERT QUALITÉ LOGICIEL AUDITEUR TMMi ACCRÉDITÉ',
        image: '/assets/images/teams/01.png',
    },
    {
        name: 'Alexis NANA',
        role: 'CONSULTANT SÉNIOR TESTING EXPERT TOSCA',
        image: '/assets/images/teams/02.png',
    },
    {
        name: 'Abdessalam MOUTTAKI',
        role: 'RÉFÉRENT TECHNIQUE & AUTOMATISATION DES TESTS',
        image: '/assets/images/teams/03.png',
    },
    {
        name: 'EL Mehdi TMIMI',
        role: 'CONSULTANT SENIOR ASSURANCE QUALITÉ LOGICIEL',
        image: '/assets/images/teams/04.png',
    },
];

const ContactCard = () => {
    return (
        <section className="bg-gray-100 dark:bg-[#0a0e19] py-16 px-6 text-gray-800 dark:text-white">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Bloc contact */}
                    <div>
                        <p className="text-primary text-xl mb-2">Contact & Informations</p>
                        <h2 className="text-4xl font-bold mb-4">Besoin d’informations ?</h2>
                        <p className="text-lg mb-6">Notre équipe est à votre écoute pour répondre à vos besoins et vous accompagner.</p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">✉️</span>
                                <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-semibold hover:underline">
                                    {CONTACT_INFO.email}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📞</span>
                                <a href={`tel:${CONTACT_INFO.phone2}`} className="text-lg font-semibold hover:underline">
                                    {CONTACT_INFO.phone2}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📍</span>
                                <p className="text-lg">{CONTACT_INFO.address}</p>
                            </div>
                        </div>

                        <Link
                            href={ROUTE_MAP.public.contact.link}
                            className="inline-block mt-6 rounded-full bg-secondary px-6 py-3 font-semibold text-white hover:bg-secondary-600 transition hover:shadow-lg"
                        >
                            Nous contacter
                        </Link>
                    </div>

                    {/* Bloc équipe */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {TEAMS.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-secondary mb-4"
                                />
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactCard;
