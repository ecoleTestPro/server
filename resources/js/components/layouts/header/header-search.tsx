export default function HeaderSearch() {
    return (
        <div>
            <div className="relative mx-auto w-full max-w-xl rounded-full bg-white">
                <input
                    placeholder="e.g. Blog"
                    className="focus:border-primary-200 focus:ring-primary-200 h-16 w-full rounded-full border-2 border-gray-100 bg-transparent py-2 pr-32 pl-8 shadow-md outline-none hover:outline-none"
                    type="text"
                    name="query"
                    id="query"
                />
                <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 absolute top-3 right-3 inline-flex h-10 items-center rounded-full px-4 py-2 text-sm text-white transition duration-150 ease-in-out outline-none focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-6 sm:text-base sm:font-medium"
                >
                    <svg
                        className="mr-2 -ml-0.5 h-4 w-4 sm:-ml-1 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Search
                </button>
            </div>

            {/* <div className="flex w-full max-w-xs border border-gray-200 bg-gray-100 px-4 py-2.5 outline outline-transparent transition-all focus-within:border-slate-900 focus-within:bg-transparent">
                            <input type="text" placeholder="Search something..." className="w-full bg-transparent pr-2 text-sm outline-none" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 192.904 192.904"
                                width="16px"
                                className="cursor-pointer fill-gray-400"
                            >
                                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                            </svg>
                        </div> */}
        </div>
    );
}
