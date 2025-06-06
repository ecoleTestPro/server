import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Link } from '@inertiajs/react';

export default function FooterTwo() {
    return (
        <>
            <div className="mx-auto rounded-[25px] bg-secondary py-[70px] md:py-[90px] lg:py-[110px] xl:max-w-[1400px] xl:py-[135px] 2xl:max-w-[1680px] dark:bg-[#0a0e19]">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-4">
                        <div className="ltr:xl:-mr-[35px] rtl:xl:-ml-[35px]">
                            <Link href="/" className="mb-[20px] inline-block max-w-[132px] md:mb-[23px]">
                                {/* <Image src="/images/logo.svg" alt="logo" className="inline-block dark:hidden" width={132} height={34} /> */}
                                {/* <Image src="/images/white-logo.svg" alt="logo" className="hidden dark:inline-block" width={132} height={34} /> */}
                                <PlaceholderPattern className="inline-block  bg-gray-200 h-[34px] w-[132px] dark:hidden" />
                                <PlaceholderPattern className="inline-block  bg-gray-200 h-[34px] w-[132px] dark:hidden" />
                            </Link>

                            <p className="!leading-[1.6]">
                                Empowering learners worldwide with expert-led online courses, flexible learning paths, and career-boosting
                                certifications — anytime, anywhere.
                            </p>

                            <div className="mt-[20px] md:mt-[35px]">
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    className="text-primary-600 hover:text-primary-500 inline-block text-[20px] leading-none transition-all ltr:mr-[8px] ltr:last:mr-0 rtl:ml-[8px] rtl:last:ml-0"
                                >
                                    <i className="ri-facebook-fill"></i>
                                </a>
                                <a
                                    href="https://www.twitter.com/"
                                    target="_blank"
                                    className="text-primary-600 hover:text-primary-500 inline-block text-[20px] leading-none transition-all ltr:mr-[8px] ltr:last:mr-0 rtl:ml-[8px] rtl:last:ml-0"
                                >
                                    <i className="ri-twitter-x-fill"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    className="text-primary-600 hover:text-primary-500 inline-block text-[20px] leading-none transition-all ltr:mr-[8px] ltr:last:mr-0 rtl:ml-[8px] rtl:last:ml-0"
                                >
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                                <a
                                    href="https://www.dribbble.com/"
                                    target="_blank"
                                    className="text-primary-600 hover:text-primary-500 inline-block text-[20px] leading-none transition-all ltr:mr-[8px] ltr:last:mr-0 rtl:ml-[8px] rtl:last:ml-0"
                                >
                                    <i className="ri-dribbble-fill"></i>
                                </a>
                            </div>
                        </div>

                        <div className="ltr:xl:pl-[130px] rtl:xl:pr-[130px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Popular Categories
                            </h3>
                            <ul>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Web Development
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Data Science
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Analysis & Reporting
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Business & Marketing
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="ltr:xl:pl-[130px] rtl:xl:pr-[130px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Quick Links
                            </h3>
                            <ul>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="/"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="/pricing"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Pricing Plans
                                    </Link>
                                </li>
                                <li className="mb-[10px] last:mb-0">
                                    <Link
                                        href="#"
                                        className="hover:text-primary-600 inline-block text-gray-500 transition-all lg:text-[15px] xl:text-[16px] dark:text-gray-400"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="ltr:xl:pl-[80px] rtl:xl:pr-[80px]">
                            <h3 className="!mb-[18px] !text-[16px] !leading-[1.2] !font-semibold !text-gray-700 md:!text-lg dark:!text-gray-100">
                                Get in Touch
                            </h3>
                            <ul>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Email:{' '}
                                    <a href="mailto:support@trezo.com" className="text-primary-500 hover:text-primary-800 transition-all">
                                        support@trezo.com
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Phone:{' '}
                                    <a href="tell:+1(555)123-4567" className="text-primary-500 hover:text-primary-800 transition-all">
                                        +1 (555) 123-4567
                                    </a>
                                </li>
                                <li className="mb-[10px] text-gray-500 last:mb-0 lg:text-[15px] xl:text-[16px] dark:text-gray-400">
                                    Location: <span className="font-semibold">123 Learning Ave, Knowledge City, USA</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-[25px] md:py-[30px]">
                <div className="container mx-auto px-[12px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1308px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-[25px]">
                        <div className="text-center ltr:lg:text-left rtl:lg:text-right">
                            <p className="!leading-[1.6]">
                                © <span className="text-purple-500">Trezo</span> is Proudly Owned by{' '}
                                <a href="https://envytheme.com/" target="_blank" className="text-primary-500 transition-all hover:underline">
                                    EnvyTheme
                                </a>
                            </p>
                        </div>

                        <div className="items-center justify-end gap-[15px] text-center lg:flex">
                            <Link href="#" className="hover:text-primary-500 mx-[7px] mt-[10px] inline-block transition-all lg:mx-0 lg:mt-0">
                                Terms of Service
                            </Link>
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <Link href="#" className="hover:text-primary-500 mx-[7px] mt-[10px] inline-block transition-all lg:mx-0 lg:mt-0">
                                Privacy Policy
                            </Link>
                            <div className="hidden h-[15px] w-[1px] bg-gray-200 lg:block dark:bg-gray-800"></div>
                            <Link href="#" className="hover:text-primary-500 mx-[7px] mt-[10px] inline-block transition-all lg:mx-0 lg:mt-0">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
