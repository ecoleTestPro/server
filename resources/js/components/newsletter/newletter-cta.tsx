import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BtnSecondary from '../ui/button/btn-secondary';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function NewsletterCTA() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === '') return;
        axios
            .post(route('newsletter.subscribe'), { email })
            .then(() => {
                toast.success(t('newsletter.subscribed', 'Inscription réussie'));
                setEmail('');
            })
            .catch(() => toast.error(t('newsletter.error', 'Erreur lors de l\'inscription')));
    };

    return (
        <section className="body-font text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            <style>{`
                .animate-bg-position {
                    background-position: center center;
                    animation: bgPosition 10s infinite linear;
                }

                @keyframes bgPosition {
                    0% {
                        background-position: center center;
                    }
                    100% {
                        background-position: center top;
                    }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 6s ease-in-out infinite;
                }

                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }

                    50% {
                        background-position: 100% 50%;
                    }

                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>

            <div className="w-full">
                <div
                    className="relative animate-bg-position transition-all duration-1000 ease-in-out"
                    style={{
                        backgroundImage: 'url(/assets/images/shape-2.png)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'scroll',
                        backgroundColor: '#0a0e19',
                    }}
                >
                    {/* Gradient animé en fond */}
                    <div className="relative inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient opacity-50"></div>

                    <div className="mx-auto md:max-w-[520px] px-[12px] py-[40px] md:py-[50px] lg:py-[60px] relative z-10">
                        <h2 className="!mb-[10px] !leading-[1.2] !font-medium !text-white text-lg md:text-3xl md:-tracking-[1px] lg:!mb-[12px] animate-fade-in-down">
                            {t('NEWSLETTER.CTA.TITLE', "Obtenir les derniers conseils en matière d'assistance")}
                        </h2>
                        <p className="lg:text-md text-white md:text-[15px] animate-fade-in-up animation-delay-200">
                            {t('NEWSLETTER.CTA.DESCRIPTION', 'Rejoignez notre communauté de professionnels de l’assistance.')}
                        </p>
                        <form onSubmit={handleSubmit} className="relative mx-auto mt-[20px] md:mt-[35px] md:max-w-[496px] lg:mt-[45px]">
                            <div className="flex item-cente justify-betweenr">
                                <span className="material-symbols-outlined absolute top-[14px] !text-[22px] text-gray-400 md:top-[21px] md:!text-[26px] ltr:left-[20px] ltr:md:left-[30px] rtl:right-[20px] rtl:md:right-[30px] animate-pulse">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 hidden"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="fw-medium block w-2/3 rounded-[100px] bg-gray-800 text-base text-white !outline-0 placeholder:text-gray-300 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:scale-105 py-2 px-4"
                                    placeholder="Entrez votre adresse e-mail"
                                />
                                <BtnSecondary label="S'inscrire" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
