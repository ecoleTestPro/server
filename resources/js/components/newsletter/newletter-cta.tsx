export default function NewsletterCTA() {
    return (
        <div className="">
            <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                <div
                    className="rounded-[15px] bg-cover bg-center bg-no-repeat px-[20px] py-[70px] text-center md:py-[90px] lg:py-[110px]"
                    style={{
                        backgroundImage: 'url(assets/images/cta-bg.jpg)',
                    }}
                >
                    <div className="mx-auto md:max-w-[520px]">
                        <h2 className="!mb-[10px] !text-xl !leading-[1.2] !font-medium !text-white md:!text-3xl md:-tracking-[1px] lg:!mb-[12px] lg:!text-4xl xl:!text-5xl">
                            Obtenir les derniers conseils en matière d'assistance
                        </h2>
                        <p className="lg:text-md text-white md:text-[15px]">Join our community of helpdesk pros.</p>
                        <form action="#" className="relative mx-auto mt-[20px] md:mt-[35px] md:max-w-[496px] lg:mt-[45px]">
                            <span className="material-symbols-outlined absolute top-[14px] !text-[22px] text-gray-400 md:top-[21px] md:!text-[26px] ltr:left-[20px] ltr:md:left-[30px] rtl:right-[20px] rtl:md:right-[30px]">
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
                                className="fw-medium block h-[50px] w-full rounded-[100px] bg-gray-800 px-[52px] text-base text-white !outline-0 placeholder:text-gray-300 md:h-[70px] md:px-[70px]"
                                placeholder="Entrez votre adresse e-mail"
                            />
                            <button
                                type="button"
                                className="mt-[20px] inline-block cursor-pointer rounded-[100px] border border-gray-600 bg-gray-600 px-[25px] py-[9px] text-base font-medium text-white transition-all hover:border-gray-500 hover:bg-gray-500 md:absolute md:top-[13px] md:mt-0 md:px-[30px] md:py-[10.5px] ltr:md:right-[13px] rtl:md:left-[13px]"
                            >
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
