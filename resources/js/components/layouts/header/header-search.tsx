interface HeaderSearchProps {
    className?: string;
}

export default function HeaderSearch({ className }: HeaderSearchProps) {
    return (
        <div className={className}>
            <div className="relative mx-auto w-full max-w-xl rounded-full bg-white">
                <div className="flex items-center justify-center">
                    <input
                        placeholder="Rechercher des formations, des certifications, ..."
                        className="focus:border-primary-200 focus:ring-primary-200 border-[#0bbd53] h-10 w-full rounded-full border-1 bg-transparent pr-24 pl-6 outline-none hover:outline-none focus:shadow-md transition-all duration-100 ease-in-out sm:text-sm sm:font-medium"
                        type="text"
                        name="query"
                        id="query"
                    />
                    <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 absolute top-1 right-1 flex h-8 items-center justify-between rounded-full px-2 py-1 text-sm text-white transition duration-150 ease-in-out outline-none focus:ring-2 focus:ring-offset-2 focus:outline-none sm:text-sm sm:font-medium"
                    >
                        <svg
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}