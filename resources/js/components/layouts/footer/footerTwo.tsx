export default function FooterTwo() {
    return (
        <footer className="bg-black w-full flex justify-center items-center overflow-hidden">
            <div className="bg-nature-600 w-full rounded-t-3xl text-white md:rounded-t-[40px] lg:rounded-t-[60px] xl:rounded-t-[80px] 2xl:rounded-t-[110px]">
                <div className="container px-3 py-6 md:py-10 lg:py-14 xl:py-20 2xl:px-0 2xl:py-[100px]">
                    <div className="flex flex-col gap-y-5 md:flex-row md:items-center md:justify-between">
                        <h2 data-aos="fade-left" className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:leading-[64px]">
                            Your home is as important to us <br />
                            as our own
                        </h2>
                        <form data-aos="fade-right" className="max-w-[366px]">
                            <div className="flex items-center gap-0">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="text-nature-600 placeholder:font-poppins placeholder:text-nature-200 rounded-l-md rounded-r-none px-[20px] py-[17px] placeholder:text-sm"
                                />
                                <button type="submit" className="bg-primary rounded-l-none rounded-r-md px-[23px] py-[17px]">
                                    <i className="fa-solid fa-magnifying-glass text-[22px]"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <hr className="!bg-nature-500 my-6 h-px md:my-8 lg:my-12 xl:my-[60px]" />

                    <div className="grid w-full grid-cols-2 gap-y-5 md:grid-cols-4">
                        <div data-aos="zoom-in">
                            <h5 className="mb-2.5 text-lg font-bold md:mb-3.5 md:text-xl lg:mb-5 lg:text-2xl xl:mb-7 xl:text-3xl">About Us</h5>
                            <ul className="font-poppins text-new-200 grid gap-2 text-sm md:gap-3 md:text-base lg:gap-4">
                                <li className="transition-all hover:text-white">
                                    <a href="#">Press</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Resources and Policies</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Careers</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Content Integrity</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Investor Relations</a>
                                </li>
                            </ul>
                        </div>

                        <div data-aos="zoom-in">
                            <h5 className="mb-2.5 text-lg font-bold md:mb-3.5 md:text-xl lg:mb-5 lg:text-2xl xl:mb-7 xl:text-3xl">
                                Tour by Categories
                            </h5>
                            <ul className="font-poppins text-new-200 grid gap-2 text-sm md:gap-3 md:text-base lg:gap-4">
                                <li className="transition-all hover:text-white">
                                    <a href="#">Outdoor Activities</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">City Tours </a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Cultural & Thematic Tours</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Indulgence & Luxury Tours</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Family Friendly Tours</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Relaxation Tours</a>
                                </li>
                            </ul>
                        </div>
                        <div data-aos="zoom-in">
                            <h5 className="mb-2.5 text-lg font-bold md:mb-3.5 md:text-xl lg:mb-5 lg:text-2xl xl:mb-7 xl:text-3xl">
                                Tripadvisor Sites
                            </h5>
                            <ul className="font-poppins text-new-200 grid gap-2 text-sm md:gap-3 md:text-base lg:gap-4">
                                <li className="transition-all hover:text-white">
                                    <a href="#">Jetsetter</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Cruise Critic</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Seat Guru</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Holiday Lettings</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Vacation Home</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Rentals</a>
                                </li>
                                <li className="transition-all hover:text-white">
                                    <a href="#">Reco Trip Designers</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="mb-2.5 text-lg font-bold md:mb-3.5 md:text-xl lg:mb-5 lg:text-2xl xl:mb-7 xl:text-3xl">Get in touch</h5>

                            <p className="font-poppins text-new-200 text-lg md:text-base">
                                Intrigued such's narrow cloud <br />
                                set upon can my sleeping <br />
                                could't alarm.
                            </p>

                            <div className="*:border-nature-400 mt-[30px] flex gap-x-2 text-sm *:flex *:size-8 *:shrink-0 *:items-center *:justify-center *:rounded-full *:border *:text-white md:gap-x-3 md:text-base lg:text-lg *:lg:size-10 xl:text-xl">
                                <a rel="nofollow" target="_blank" href="#" className="transition-all hover:bg-white hover:text-[#1877F2]">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>

                                <a rel="nofollow" target="_blank" href="#" className="transition-all hover:bg-white hover:text-[#131418]">
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>

                                <a rel="nofollow" target="_blank" href="#" className="transition-all hover:bg-white hover:text-[#0A66C2]">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>

                                <a rel="nofollow" target="_blank" href="#" className="transition-all hover:bg-white hover:text-[#E4405F]">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="!bg-nature-500 my-6 h-px md:my-8 lg:my-12 xl:my-[60px]" />

                    <p
                        data-aos="fade-out"
                        className="font-poppins text-primary-10 text-center text-sm tracking-tight md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                    >
                        Copyright &copy;2024 Homelist, All right reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
