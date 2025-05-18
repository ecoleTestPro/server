import { IMainMenuItem } from '@/types/header.type';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface MainMenuProps {
    item: IMainMenuItem;
}

export default function MainMenu({ item }: PropsWithChildren<MainMenuProps>) {
    return (
        <Menu as="li" className="relative">
            <Menu.Button className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-gray-700 transition hover:text-green-500">
                {item.label}
                {item.children && <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" aria-hidden="true" />}
            </Menu.Button>

            {/* Mega Menu */}
            {item.children && (
                <Menu.Items className="ring-opacity-5 absolute left-0 z-50 mt-1 w-full max-w-screen-lg origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                    <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                        {/* Colonne 1 - Contenu principal */}
                        <div>
                            <h3 className="mb-4 text-xl font-bold">{item.children.title}</h3>
                            <p className="mb-4">{item.children.description}</p>
                            <button className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">Détails</button>
                        </div>

                        {/* Colonne 2 - Sections avec liens */}
                        <div>
                            <div>
                                <h4 className="mb-2 text-lg font-bold">Gestion de projets et Services</h4>
                                <ul className="space-y-2">
                                    {item.children.items.map((child, index) => (
                                        <li key={index}>
                                            <Link href={child.href} className="hover:underline">
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-2 text-lg font-bold">Certifications Microsoft</h4>
                                <p className="mb-2">
                                    Découvrez également dans notre article explicatif toutes nos formations Microsoft officielles qui vous permettent
                                    de vous préparer à un examen de certification.
                                </p>
                                <Link href="#" className="text-green-500 hover:underline">
                                    Détails
                                </Link>
                            </div>
                        </div>

                        {/* Colonne 3 - Sections avec images et liens */}
                        <div>
                            <div className="flex space-x-4">
                                <img
                                    src="https://source.unsplash.com/random/200x100/?certification1 "
                                    alt="Certification 1"
                                    className="h-24 w-48 object-cover"
                                />
                                <img
                                    src="https://source.unsplash.com/random/200x100/?certification2 "
                                    alt="Certification 2"
                                    className="h-24 w-48 object-cover"
                                />
                            </div>

                            <div>
                                <h4 className="mb-2 text-lg font-bold">Certifications AWS</h4>
                                <p className="mb-2">
                                    Découvrez dans notre article tous nos cours Amazon officiels qui permettent de vous préparer à un examen de
                                    certification AWS.
                                </p>
                                <Link href="#" className="text-green-500 hover:underline">
                                    Détails
                                </Link>
                            </div>
                        </div>

                        {/* Colonne 4 - Sections supplémentaires */}
                        <div>
                            <h4 className="mb-2 text-lg font-bold">Développement</h4>
                            <ul className="space-y-2">
                                <li>IT Providers</li>
                                <li>VMware</li>
                                <li>Apple</li>
                                <li>Red Hat</li>
                                <li>Linux</li>
                                <li>Veeam</li>
                            </ul>

                            <h4 className="mb-2 text-lg font-bold">Cybersécurité</h4>
                            <ul className="space-y-2">{/* Ajoutez ici les éléments relatifs à la cybersécurité */}</ul>
                        </div>
                    </div>
                </Menu.Items>
            )}
        </Menu>
    );
}
