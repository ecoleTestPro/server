import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
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
        <section className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0e19] dark:via-gray-900 dark:to-[#0a0e19] py-20 px-6 text-gray-800 dark:text-white overflow-hidden">
            {/* Éléments décoratifs de fond */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center">
                    {/* Bloc contact - Amélioré */}
                    <div className="space-y-8">
                        {/* En-tête avec badge animé */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full mb-6">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">Contact & Informations</span>
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                Besoin d'informations ?
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Notre équipe est à votre écoute pour répondre à vos besoins et vous accompagner dans vos projets.
                            </p>
                        </div>

                        {/* Informations de contact avec cartes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Email */}
                            <a
                                href={`mailto:${CONTACT_INFO.email}`}
                                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/30 transition-colors">
                                    <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                    <p className="font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-all">
                                        {CONTACT_INFO.email}
                                    </p>
                                </div>
                            </a>

                            {/* Téléphone principal */}
                            <a
                                href={`tel:${CONTACT_INFO.phone1}`}
                                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Téléphone</p>
                                    <p className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {CONTACT_INFO.phone1}
                                    </p>
                                </div>
                            </a>

                            {/* Téléphone secondaire */}
                            <a
                                href={`tel:${CONTACT_INFO.phone2}`}
                                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Mobile</p>
                                    <p className="font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {CONTACT_INFO.phone2}
                                    </p>
                                </div>
                            </a>

                            {/* Adresse */}
                            <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Adresse</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{CONTACT_INFO.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={ROUTE_MAP.public.contact.link}
                                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Nous contacter
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href={ROUTE_MAP.public.appointment.link}
                                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                            >
                                Prendre rendez-vous
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Bloc équipe - Gardé désactivé */}
                    {false && (
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
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactCard;
