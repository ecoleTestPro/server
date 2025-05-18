import { Link } from '@inertiajs/react';

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
        <footer className="bg-gray-100 py-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Restez en contact</h3>
                        <p className="mb-4">
                            Conseil personnalisé au<br />
                            {contact.phone}
                            <br />
                            {contact.hours}
                        </p>
                        <p className="mb-4">{contact.email}</p>
                        <pre className="text-sm text-gray-600 whitespace-pre-line">{contact.address}</pre>
                    </div>

                    {/* Éditeurs & Services */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Top des éditeurs</h3>
                        <ul className="space-y-2 mb-6">
                            {topEditors.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold mb-4">Offre de services</h3>
                        <ul className="space-y-2">
                            {services.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Digicomp & Certifications */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Digicomp</h3>
                        <ul className="space-y-2 mb-6">
                            {digicompLinks.map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:underline">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold mb-4">Certifications</h3>
                        <ul className="space-y-2">
                            {certifications.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                    <div className="mb-4 md:mb-0">
                        <Link
                            href={contactLink.url}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            {contactLink.label}
                        </Link>
                    </div>

                    <div className="flex space-x-6">
                        {socialLinks.map(({ name, icon }) => (
                            <a key={name} href="#" aria-label={name}>
                                {/* SVG Placeholder - remplace Font Awesome */}
                                {icon === 'facebook' && (
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1.02-1.1h3.26V.5l-4.01-.01c-3.47 0-5.35 2.2-5.35 5.58V7H7.05v4h2.94v11h5.12v-11h3.76l.53-4z" />
                                    </svg>
                                )}
                                {icon === 'instagram' && (
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                    </svg>
                                )}
                                {icon === 'linkedin' && (
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                )}
                                {icon === 'youtube' && (
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}