import { SharedData } from '@/types';
import { IMainMenuItem } from '@/types/header.type';
import { Link, usePage } from '@inertiajs/react';
import { JSX } from 'react';
import MainMenu from './main-menu';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    // Logo
    const logo = {
        text: 'EcoleTestProp',
        href: '/',
    };

    // Langues disponibles
    const languages = [
        { code: 'FR', label: 'FR' },
        { code: 'EN', label: 'EN' },
    ];

    // Liens du menu principal
    const mainMenu: IMainMenuItem[] = [
        {
            label: 'Formations',
            href: '/formations',
            children: {
                title: 'Formations',
                description: 'Découvrez nos formations',
                items: [
                    { label: 'Formation 1', href: '/formations/formation-1' },
                    { label: 'Formation 2', href: '/formations/formation-2' },
                    { label: 'Formation 3', href: '/formations/formation-3' },
                ],
                featured: [{ label: 'Formation vedette 1', href: '/formations/formation-vedette-1' }],
            },
        },
        {
            label: 'Certifications',
            href: '/certifications',
            children: {
                title: 'Certifications',
                description: 'Découvrez nos certifications',
                items: [
                    { label: 'Certification 1', href: '/certifications/certification-1' },
                    { label: 'Certification 2', href: '/certifications/certification-2' },
                    { label: 'Certification 3', href: '/certifications/certification-3' },
                    { label: 'Certification 4', href: '/certifications/certification-4' },
                    { label: 'Certification 5', href: '/certifications/certification-5' },
                ],
                featured: [{ label: 'Certification vedette 1', href: '/certifications/certification-vedette-1' }],
            },
        },
        { label: 'Offre pour entreprises', href: '/entreprise' },
        { label: 'Événements', href: '/evenements' },
        { label: 'Blog/News', href: '/blog' },
    ];

    const mainMenuRight: IMainMenuItem[] = [
        { label: 'À propos de EcoleTestProp', href: '/a-propos' },
        { label: 'Contact', href: '/contact', isCta: true },
    ];

    // Icônes utilisateur
    const userIcons: { name: string; icon: JSX.Element; link: string }[] = [
        {
            name: 'Profil',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                </svg>
            ),
            link: route('auth.login'),
        },
        // {
        //     name: 'Favoris',
        //     icon: (
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //             <path
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        //             />
        //         </svg>
        //     ),
        //     link: route('favorites'),
        // },
        // {
        //     name: 'Panier',
        //     icon: (
        //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //             <path
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //                 d="M3 3h2l1.5 9h12l1.5-9h2M6 21a2 2 0 1 0 4 0H6zm8 0a2 2 0 1 0 4 0h-4zM6.5 7h13l-1.5 9H7L6.5 7z"
        //             />
        //         </svg>
        //     ),
        //     link: route('cart'),
        // },
    ];

    return (
        <header className="border-b bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            {/* Top Bar */}
            <div className="mx-auto flex items-center justify-between p-4">
                <Link href={logo.href} className="text-xl font-bold text-green-500">
                    {logo.text}
                </Link>

                <div className="flex items-center space-x-4">
                    {/* Search Form */}
                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher par formation, événement, ..."
                            className="w-64 rounded border border-green-500 px-3 py-2"
                        />
                        <button type="submit" className="absolute top-0 right-0 mt-3 mr-3 focus:outline-none" aria-label="Rechercher">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>

                    {/* Language Selector */}
                    <div className="dropdown relative">
                        <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none">
                            {languages.find((lang) => lang.code === 'FR')?.label}
                        </button>
                    </div>

                    {/* User Icons */}
                    {userIcons.map(({ name, icon, link }) => (
                        <Link key={name} href={link} className="text-green-500 transition hover:text-green-700" aria-label={name}>
                            {icon}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="mx-auto p-4">
                <div className="grid grid-cols-5 grid-rows-5 gap-4">
                    {/* Main Menu */}
                    <div className="col-span-3">
                        <ul className="flex space-x-4">
                            {mainMenu.map((item, index) => (
                                <MainMenu key={index} item={item} />
                            ))}
                        </ul>
                    </div>

                    {/* Menu Right */}
                    <div className="col-span-2 col-start-4">
                        <div className="flex items-center justify-end">
                            <ul className="flex space-x-4">
                                {mainMenuRight.map(({ label, href, isCta }, index) => (
                                    <li key={index}>
                                        <Link
                                            href={href}
                                            className={`${
                                                isCta
                                                    ? 'rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600'
                                                    : 'text-gray-700 transition hover:text-green-500'
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>{' '}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
