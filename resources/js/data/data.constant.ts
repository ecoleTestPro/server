import { IMainMenuItem } from "@/types/header.type";
import { ROUTE_MAP } from "@/utils/route.util";


/**
 * Default main menu items for the application.
 * This includes links to formations, certifications, services, blog, and careers.
 * Each item can have properties like id, label, href, title, description, and featureImage.
 * The menu is structured to provide a clear navigation path for users.
 * The `DEFULAT_MAIN_MENU` and `DEFULAT_MAIN_MENU_RIGHT` arrays define the main menu and right-side menu items respectively.
 * The `FORMATIONS_MAIN_MENU_PART_CHILDREN` provides a structured view of the formations section with nested items.
 * The `buildCourseItems` and `buildCategoryItems` functions are used to dynamically create menu items based on course categories and their courses.
 * The `updateCourseMenuPart` function updates the main menu with course categories and their courses.
 */
export const DEFULAT_MAIN_MENU: IMainMenuItem[] = [
    {
        id: 'formations',
        label: 'Formations',
        href: ROUTE_MAP.public.courses.list.link,
        title: 'Formations',
        // featureImage: '/assets/images/pexels-divinetechygirl-1181634.jpg',
        description:
            '',
        gridClass: 'grid-cols-1 lg:grid-cols-3',
        maxWidth: 'w-[900px]',
        children: {
            id: 'formations-children',
            title: 'Formations',
            description: 'Liste des formations',
            items: [
                {
                    id: 'programmes-de-reconversion',
                    label: 'Programmes de reconversion',
                    href: ROUTE_MAP.public.reconversionMetier.link,
                    description: 'Découvrez nos programmes de reconversion professionnelle.',
                    image: 'https://placehold.jp/150x150.png',
                },
            ],
        },
    },
    // {
    //     id: 'certifications',
    //     label: 'Certifications',
    //     href: ROUTE_MAP.public.courses.list.link,
    //     title: 'Certifications',
    //     description: 'Découvrez nos certifications qui valident vos compétences professionnelles.',
    // },
    {
        id: 'servies',
        label: 'Offre pour entreprises',
        href: ROUTE_MAP.public.services.index.link,
        featureImage: '/assets/images/feature_image.png',
        gridClass: 'grid-cols-1 lg:grid-cols-3',
        maxWidth: 'w-[900px]',
        children: {
            id: 'services',
            title: 'Services',
            description: 'Découvrez nos services pour les entreprises.',
            items: [
                {
                    id: 'consulting-subitem',
                    label: 'Consulting',
                    href: '#',
                    image: '/assets/images/bg_menu_box.jpg',
                    subItems: [
                        {
                            id: 'consulting-audit',
                            label: 'Audit de maturité de test',
                            href: ROUTE_MAP.public.services.consulting.auditOfMaturityOfTests.link,
                            description: "Découvrez les formations disponibles dès maintenant, organisées par catégories. Trouvez le cours qui correspond à vos besoins et inscrivez-vous pour progresser dans votre parcours professionnel.",
                            image: 'https://placehold.co/512x512',
                            subItems: [
                                {
                                    id: 'consulting-audit',
                                    label: 'Audit de maturité de test',
                                    href: ROUTE_MAP.public.services.consulting.auditOfMaturityOfTests.link,
                                    image: 'https://placehold.co/512x512',
                                },
                                {
                                    id: 'consulting-testing',
                                    label: 'Conseil Testing',
                                    href: ROUTE_MAP.public.services.consulting.consultingTesting.link,
                                    image: 'https://placehold.co/512x512'
                                }
                            ]
                        },
                    ]
                },
                {
                    id: 'services-subitem',
                    label: 'Services',
                    href: '#',
                    image: '/assets/images/businessmen-desk-scaled.jpg',
                    subItems: [
                        {
                            id: 'consulting-audit',
                            label: 'Audit de maturité de test',
                            href: ROUTE_MAP.public.services.testSerivces.testOutsourcingServices.link,
                            description: "Découvrez les formations disponibles dès maintenant, organisées par catégories. Trouvez le cours qui correspond à vos besoins et inscrivez-vous pour progresser dans votre parcours professionnel.",
                            image: 'https://placehold.co/512x512',
                            subItems: [
                                {
                                    id: 'consulting-audit',
                                    label: 'Services d\'externalisation des tests',
                                    href: ROUTE_MAP.public.services.testSerivces.testOutsourcingServices.link,
                                    image: 'https://placehold.co/512x512',
                                },
                                {
                                    id: 'consulting-testing',
                                    label:  "Intégration de spécialistes",
                                    href: ROUTE_MAP.public.services.testSerivces.integrationSpecialists.link,
                                    image: 'https://placehold.co/512x512'
                                }
                            ]
                        },
                    ]
                },
            ]
        }
    },
    { id: 'blog', label: 'Blog/News', href: ROUTE_MAP.public.blogs.list.link },
    {
        id: 'carreers',
        label: 'Carrières',
        href: ROUTE_MAP.public.careers.link,
        title: 'Carrières',
        description: 'Découvrez nos opportunités de carrière et rejoignez notre équipe. Nous recherchons des talents passionnés pour contribuer à notre succès.',
    },
];

export const DEFULAT_MAIN_MENU_RIGHT: IMainMenuItem[] = [
    { id: 'a-propos', label: 'À propos de nous', href: ROUTE_MAP.public.aboutUs.link },
    // { id: 'calendrier', label: 'Calendrier', href: ROUTE_MAP.public.calendar.link },
    // { id: 'timeline', label: 'Timeline', href: ROUTE_MAP.public.sessionsTimeline.link },
    { id: 'rendez-vous', label: 'Rendez-vous', href: route('appointments.create'), isCta: false },
    { id: 'contact', label: 'Contact', href: ROUTE_MAP.public.contact.link, isCta: true }
];

const FORMATION_MAIN_MENU_PART_CHILDREN = {
    id: 'formations',
    label: 'Formations',
    href: '/formations',
    title: 'Formations',
    description:
        'Les formations vous préparent au passage de nombreuses certifications internationales. Validez vos compétences et accroissez votre employabilité ainsi que votre efficacité au sein de votre entreprise.',
    children: {
        id: 'formations',
        title: 'Formations',
        description: 'Découvrez nos formations et certifications.',
        items: [
            {
                id: 'formation-1',
                label: 'Microsoft',
                href: '/formations/formation-1',
                subItems: [
                    { id: 'azure', label: 'Azure', href: '/formations/formation-1/azure' },
                    { id: 'microsoft-365', label: 'Microsoft 365', href: '/formations/formation-1/microsoft-365' },
                    { id: 'windows-server', label: 'Windows Server', href: '/formations/formation-1/windows-server' },
                    { id: 'sql-server', label: 'SQL Server', href: '/formations/formation-1/sql-server' },
                    { id: 'power-platform', label: 'Power Platform', href: '/formations/formation-1/power-platform' },
                    { id: 'sharepoint', label: 'SharePoint', href: '/formations/formation-1/sharepoint' },
                    { id: 'microsoft-teams', label: 'Microsoft Teams', href: '/formations/formation-1/microsoft-teams' },
                    { id: 'microsoft-dynamics', label: 'Microsoft Dynamics', href: '/formations/formation-1/microsoft-dynamics' },
                ],
            },
            {
                id: 'formation-2',
                label: 'Cybersecurity',
                href: '/formations/formation-2',
                subItems: [
                    { id: 'cybersecurity-1', label: 'Cybersecurity 1', href: '/formations/formation-2/cybersecurity-1' },
                    { id: 'cybersecurity-2', label: 'Cybersecurity 2', href: '/formations/formation-2/cybersecurity-2' },
                    { id: 'cybersecurity-3', label: 'Cybersecurity 3', href: '/formations/formation-2/cybersecurity-3' },
                    { id: 'cybersecurity-4', label: 'Cybersecurity 4', href: '/formations/formation-2/cybersecurity-4' },
                ],
            },
            { id: 'formation-3', label: 'Formation 3', href: '/formations/formation-3' },
        ],
        featured: [{ id: 'formation-vedette-1', label: 'Formation vedette 1', href: '/formations/formation-vedette-1' }],
    },
};


export const RECAPTCHA_SITE_KEY_PUBLIC: string = "6LdOgHgrAAAAACDxYFx2jRkoJIov4VK6XqMbz6gK";
export const RECAPTCHA_SITE_KEY_PRIVATE: string = "6LdOgHgrAAAAAN6brCXYKUTyh6ToFeOT20pla4VD";