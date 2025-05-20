import { BtnLinkCustom } from '@/components/ui/button/Btnlink';

export default function Footer() {
    // Données dynamiques pour le footer
    const contact = {
        phone: '022 738 80 80 ou 021 321 65 00',
        hours: 'du Lu au Ve, 08h00–17h00',
        email: 'romandie@digicomp.ch',
        address: `Digicomp Academy SA
Rue de Monthoux 64 – 1201 Genève
Avenue de la Gare 50 - 1003 Lausanne`,
    };

    const topEditors = ['Microsoft', 'VMware', 'Citrix', 'Apple', 'Adobe', 'SAP'];
    const services = ['Assessments', 'Centre de tests', 'Location de salles'];
    const digicompLinks = [
        'Sites',
        'Contact',
        'Impressum',
        'Politique de confidentialité',
        'CG',
        'Jobs',
        'Droit des marques',
        'Gestion des réclamations',
        'Notre modèle andragogique',
    ];
    const certifications = ['eduQua', 'ISO 9001', 'Dun & Bradstreet'];

    const socialLinks = [
        { name: 'Facebook', icon: 'facebook' },
        { name: 'Instagram', icon: 'instagram' },
        { name: 'LinkedIn', icon: 'linkedin' },
        { name: 'YouTube', icon: 'youtube' },
    ];

    const contactLink = {
        url: '/contact',
        label: 'Contact',
    };

    return (
        <div className="bg-deep-purple-accent-400 relative mt-16">
            <svg
                className="text-deep-purple-accent-400 absolute top-0 -mt-5 h-6 w-full sm:-mt-10 sm:h-16"
                preserveAspectRatio="none"
                viewBox="0 0 1440 54"
            >
                <path
                    fill="currentColor"
                    d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
                />
            </svg>
            <div className="mx-auto px-4 pt-12 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
                <div className="row-gap-10 mb-8 grid gap-16 lg:grid-cols-6">
                    <div className="md:max-w-md lg:col-span-2">
                        <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
                            <svg
                                className="text-teal-accent-400 w-8"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeMiterlimit="10"
                                stroke="currentColor"
                                fill="none"
                            >
                                <rect x="3" y="1" width="7" height="12" />
                                <rect x="3" y="17" width="7" height="6" />
                                <rect x="14" y="1" width="7" height="6" />
                                <rect x="14" y="11" width="7" height="12" />
                            </svg>
                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">Company</span>
                        </a>
                        <div className="mt-4 lg:max-w-sm">
                            <p className="text-deep-purple-50 text-sm">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                            <p className="text-deep-purple-50 mt-4 text-sm">
                                Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>

                            <BtnLinkCustom href="admin/login" text="Login" className="mt-4" />
                        </div>
                    </div>
                    <div className="row-gap-8 grid grid-cols-2 gap-5 md:grid-cols-4 lg:col-span-4">
                        <div>
                            <p className="text-teal-accent-400 font-semibold tracking-wide">Category</p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        News
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        World
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Games
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        References
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-teal-accent-400 font-semibold tracking-wide">Cherry</p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Web
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        eCommerce
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Business
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Entertainment
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Portfolio
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-teal-accent-400 font-semibold tracking-wide">Apples</p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Media
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Brochure
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Nonprofit
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Educational
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Projects
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-teal-accent-400 font-semibold tracking-wide">Business</p>
                            <ul className="mt-2 space-y-2">
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Infopreneur
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Personal
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Wiki
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-deep-purple-50 hover:text-teal-accent-400 transition-colors duration-300">
                                        Forum
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-deep-purple-accent-200 flex flex-col justify-between border-t pt-5 pb-10 sm:flex-row">
                    <p className="text-sm text-gray-100">© Copyright 2020 Lorem Inc. All rights reserved.</p>
                    <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                        <a href="/" className="text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                            </svg>
                        </a>
                        <a href="/" className="text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300">
                            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                <circle cx="15" cy="15" r="4" />
                                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                            </svg>
                        </a>
                        <a href="/" className="text-deep-purple-100 hover:text-teal-accent-400 transition-colors duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <footer className="bg-gray-100 py-10">
    //         <div className="container mx-auto px-6">
    //             <div>
    //                 <h2 className="mb-4 text-2xl font-bold">Footer</h2>
    //             </div>
    //             {false && (
    //                 <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    //                     {/* Contact */}
    //                     <div>
    //                         <h3 className="mb-4 text-xl font-bold">Restez en contact</h3>
    //                         <p className="mb-4">
    //                             Conseil personnalisé au
    //                             <br />
    //                             {contact.phone}
    //                             <br />
    //                             {contact.hours}
    //                         </p>
    //                         <p className="mb-4">{contact.email}</p>
    //                         <pre className="text-sm whitespace-pre-line text-gray-600">{contact.address}</pre>
    //                     </div>

    //                     {/* Éditeurs & Services */}
    //                     <div>
    //                         <h3 className="mb-4 text-xl font-bold">Top des éditeurs</h3>
    //                         <ul className="mb-6 space-y-2">
    //                             {topEditors.map((item) => (
    //                                 <li key={item}>{item}</li>
    //                             ))}
    //                         </ul>

    //                         <h3 className="mb-4 text-xl font-bold">Offre de services</h3>
    //                         <ul className="space-y-2">
    //                             {services.map((item) => (
    //                                 <li key={item}>{item}</li>
    //                             ))}
    //                         </ul>
    //                     </div>

    //                     {/* Digicomp & Certifications */}
    //                     <div>
    //                         <h3 className="mb-4 text-xl font-bold">Digicomp</h3>
    //                         <ul className="mb-6 space-y-2">
    //                             {digicompLinks.map((item) => (
    //                                 <li key={item}>
    //                                     <Link href="#" className="hover:underline">
    //                                         {item}
    //                                     </Link>
    //                                 </li>
    //                             ))}
    //                         </ul>

    //                         <h3 className="mb-4 text-xl font-bold">Certifications</h3>
    //                         <ul className="space-y-2">
    //                             {certifications.map((item) => (
    //                                 <li key={item}>{item}</li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 </div>
    //             )}

    //             {/* Bottom Bar */}
    //             <div className="mt-10 flex flex-col items-center justify-between border-t pt-6 md:flex-row">
    //                 <div className="mb-4 md:mb-0">{/* TODO : Add social links */}</div>

    //                 <div className="flex space-x-6">{/* TODO : Add social links */}</div>
    //             </div>
    //         </div>
    //     </footer>
    // );
}
