export default function ContactForm() {
    return (
        <div>
            <form className="animate-form-container">
                <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Contactez nous</h2>

                <div className="col-span-1 lg:col-span-8"></div>
                <div className="col-span-1 lg:col-span-5"></div>
                <div className="col-span-1 lg:col-span-3"></div>
                <div className="col-span-1 lg:col-span-2"></div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
                    <div className="col-span-1 lg:col-span-5">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.1s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">Prénom</label>
                            <input
                                type="text"
                                className="focus:border-primary-500 block h-[50px] w-full rounded-md border border-gray-200 bg-gray-50 px-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:h-[55px] md:px-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Votre prénom"
                            />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-3">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]">
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="focus:border-primary-500 block h-[50px] w-full rounded-md border border-gray-200 bg-gray-50 px-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:h-[55px] md:px-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Votre nom"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-4">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.2s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                className="focus:border-primary-500 block h-[50px] w-full rounded-md border border-gray-200 bg-gray-50 px-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:h-[55px] md:px-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Votre adresse email"
                            />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.3s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Téléphone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                required
                                className="focus:border-primary-500 block h-[50px] w-full rounded-md border border-gray-200 bg-gray-50 px-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:h-[55px] md:px-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Votre numéro de téléphone"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-8">
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.4s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Sujet <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="focus:border-primary-500 block h-[50px] w-full rounded-md border border-gray-200 bg-gray-50 px-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:h-[55px] md:px-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Sujet de votre message"
                            />
                        </div>
                        <div className="animate-form-field mb-[20px] md:mb-[25px]" style={{ animationDelay: '0.5s' }}>
                            <label className="mb-[10px] block font-medium text-black dark:text-white">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                className="focus:border-primary-500 block h-[140px] w-full rounded-md border border-gray-200 bg-gray-50 p-[15px] text-black outline-0 transition-all placeholder:text-gray-500 md:p-[17px] dark:border-[#172036] dark:bg-[#0a0e19] dark:text-white dark:placeholder:text-gray-400"
                                placeholder="Écrivez votre message..."
                            ></textarea>
                        </div>{' '}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-500 block w-full transform rounded-md px-[17px] py-[12px] font-medium text-white transition-all duration-300 hover:scale-105 lg:text-[15px] xl:text-[16px]"
                >
                    <span className="relative inline-block ltr:pl-[25px] ltr:md:pl-[29px] rtl:pr-[25px] rtl:md:pr-[29px]">Envoyer</span>
                </button>
            </form>
        </div>
    );
}
