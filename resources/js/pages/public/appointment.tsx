import AppointmentCalendar from '@/components/appointments/AppointmentCalendar';
import Hero from '@/components/hero/hearo';
import DefaultLayout from '@/layouts/public/front.layout';
import { Head } from '@inertiajs/react';
import React from 'react';

interface PublicAppointmentCreateProps {
    businessHours?: any;
}

const PublicAppointmentCreate: React.FC<PublicAppointmentCreateProps> = ({ businessHours }) => {
    return (
        <DefaultLayout>
            <Head title="Prendre un rendez-vous - EcoleTestPro" />

            {/* Hero Section */}
            <Hero
                title="Prendre un rendez-vous"
                description="Choisissez une date et une heure pour votre rendez-vous avec nos conseillers."
                breadcrumbItems={[
                    { label: 'Accueil', href: '/' },
                    { label: 'Prendre un rendez-vous', href: '#' },
                ]}
            />

            {/* Calendrier de prise de RDV */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AppointmentCalendar />
                </div>
            </section>

            {/* Section informations complémentaires */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi prendre rendez-vous ?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Notre équipe d'experts vous accompagne dans le choix des formations les mieux adaptées à vos objectifs professionnels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Conseil personnalisé</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Analyse de vos besoins et recommandations sur mesure pour votre parcours de formation.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Processus simplifié</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Information complète sur les modalités, financement et démarches d'inscription.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Suivi personnalisé</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Accompagnement tout au long de votre parcours de formation et de votre montée en compétences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section contact alternatif */}
            <section className="py-12 bg-blue-50 dark:bg-blue-900/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Vous préférez nous contacter directement ?</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Notre équipe est à votre disposition pour répondre à toutes vos questions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Téléphone</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Du lundi au vendredi</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">8h00 - 18h00</p>
                            <a
                                href="tel:+2250787654321"
                                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                            >
                                +225 07 87 65 43 21
                            </a>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">Réponse sous 24h</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">En jours ouvrés</p>
                            <a
                                href="mailto:info@ecoletestpro.com"
                                className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300"
                            >
                                info@ecoletestpro.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default PublicAppointmentCreate;
