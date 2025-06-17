import { useTranslation } from 'react-i18next';

export default function NewsletterCTA() {
    const { t } = useTranslation();

    return (
        <section className="body-font text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            <div className="w-full">
                <div
                    className="bg-cover bg-center bg-no-repeat px-[20px] py-[70px] text-center md:py-[90px] lg:py-[110px] relative overflow-hidden"
                    style={{
                        backgroundImage: 'url(assets/images/shape-2.png)',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'scroll',
                        backgroundColor: '#0a0e19',
                    }}
                >
                    {/* Gradient animé en fond */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient opacity-50"></div>

                    <div className="mx-auto md:max-w-[520px] px-[12px] py-[70px] md:py-[90px] lg:py-[110px] xl:py-[130px] 2xl:py-[150px] relative z-10">
                        <h2
                            className="!mb-[10px] !text-xl !leading-[1.2] !font-medium !text-white md:!text-3xl md:-tracking-[1px] lg:!mb-[12px] lg:!text-4xl xl:!text-5xl animate-fade-in-down"
                        >
                            {t('NEWSLETTER.CTA.TITLE', "Obtenir les derniers conseils en matière d'assistance")}
                        </h2>
                        <p className="lg:text-md text-white md:text-[15px] animate-fade-in-up animation-delay-200">
                            {t('NEWSLETTER.CTA.DESCRIPTION', 'Rejoignez notre communauté de professionnels de l’assistance.')}
                        </p>
                        <form action="#" className="relative mx-auto mt-[20px] md:mt-[35px] md:max-w-[496px] lg:mt-[45px]">
                            <div className="item-center flex">
                                <span className="material-symbols-outlined absolute top-[14px] !text-[22px] text-gray-400 md:top-[21px] md:!text-[26px] ltr:left-[20px] ltr:md:left-[30px] rtl:right-[20px] rtl:md:right-[30px] animate-pulse">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="fw-medium block h-[50px] w-full rounded-[100px] bg-gray-800 px-[52px] text-base text-white !outline-0 placeholder:text-gray-300 md:h-[70px] md:px-[70px] transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:scale-105"
                                    placeholder="Entrez votre adresse e-mail"
                                />
                                <button
                                    type="button"
                                    className="mt-[20px] inline-block cursor-pointer rounded-[100px] border border-gray-600 bg-gray-600 px-[25px] py-[9px] text-base font-medium text-white transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:scale-105 md:absolute md:top-[13px] md:mt-0 md:px-[30px] md:py-[10.5px] ltr:md:right-[13px] rtl:md:left-[13px]"
                                >
                                    S'inscrire
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}