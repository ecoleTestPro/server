import { ROUTE_MAP } from '@/utils/route.util';
import { Link } from '@inertiajs/react';
import { CONTACT_INFO } from '../layouts/footer/footer';

export const TEAMS = [
    {
        name: 'Anass EL BEKALI',
        role: 'EXPERT QUALITÉ LOGICIEL AUDITEUR TMMi ACCRÉDITÉ',
        image: '/assets/images/teams/01.png', 
    },
    {
        name: 'Alexis NANA',
        role: 'CONSULTANT SÉNIOR TESTING EXPERT TOSCA',
        image: '/assets/images/teams/02.png',
    },
    {
        name: 'Abdessalam MOUTTAKI',
        role: 'RÉFÉRENT TECHNIQUE & AUTOMATISATION DES TESTS',
        image: '/assets/images/teams/03.png',
    },
    {
        name: 'EL Mehdi TMIMI',
        role: 'CONSULTANT SENIOR ASSURANCE QUALITÉ LOGICIEL',
        image: '/assets/images/teams/04.png',
    },
];

const ContactCard = () => {
    return (
        <section>
            <section className="body-font text-gray-600 dark:bg-[#0a0e19] dark:text-white">
                <div className="relative z-[1] container mx-auto py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px] 2xl:max-w-[1320px]">
                    <div className="flex items-center justify-center">
                        <div className="py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px]">
                            <div className="flex flex-col justify-between md:flex-row">
                                <div className="mb-4 w-full md:mb-0 md:w-6/12">
                                    <p className="text-primary text-xl">Contact & demandes de renseignements</p>
                                    <h2 className="mt-2 text-4xl font-bold">Besoin d'informations ?</h2>
                                    <p className="mt-2 text-2xl">Notre équipe se tient à votre disposition pour vous accompagner dans vos projets.</p>

                                    <div className="my-4">
                                        <p className="flex items-center">
                                            <span className="mr-2">✉️</span>
                                            <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg font-semibold hover:underline">
                                                {CONTACT_INFO.email}
                                            </a>
                                        </p>
                                        <p className="flex items-center">
                                            <span className="mr-2">📞</span>
                                            <a href={`tel:${CONTACT_INFO.phone2}`} className="text-lg font-semibold hover:underline">
                                                {CONTACT_INFO.phone2}
                                            </a>
                                        </p>
                                        <p className="mt-2">
                                            <span className="mr-2 text-2xl">📍</span> {CONTACT_INFO.address}
                                        </p>
                                    </div>

                                    <Link
                                        href={ROUTE_MAP.public.contact.link}
                                        className=" bg-secondary hover:bg-secondary-600 mt-4 cursor-pointer rounded-full px-4 py-2 font-semibold text-white transition duration-300 hover:underline hover:shadow-lg"
                                    >
                                        Nous contacter
                                    </Link>
                                </div>

                                <div className="mt-4 w-full md:mt-0 md:ml-6 md:w-6/12">
                                    <div className="item-center flex h-fit flex-col">
                                        {/* <h3 className="text-xl font-semibold">Notre équipe</h3> */}
                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {TEAMS.map((teamMember, index) => (
                                                <div key={index} className="flex flex-col items-center">
                                                    <img
                                                        src={teamMember.image}
                                                        alt={teamMember.name}
                                                        className="h-32 w-32 rounded-full"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                    <p className="mt-2 text-sm font-medium">{teamMember.name}</p>
                                                    <p className="text-xs">{teamMember.role}</p>
                                                </div>
                                            ))}
                                        </div>{' '}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ContactCard;
