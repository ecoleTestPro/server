import { IMainMenuItem } from "@/types/header.type";

export const DEFULAT_MAIN_MENU: IMainMenuItem[] = [
    {
        id: 'formations',
        label: 'Formations',
        href: '/formations',
        title: 'Formations',
        description:
            'Les formations vous préparent au passage de nombreuses certifications internationales. Validez vos compétences et accroissez votre employabilité ainsi que votre efficacité au sein de votre entreprise.',
    },
    {
        id: 'certifications',
        label: 'Certifications',
        href: '/certifications',
        title: 'Certifications',
        description: 'Découvrez nos certifications qui valident vos compétences professionnelles.',
    },
    { id: 'entreprises', label: 'Offre pour entreprises', href: '/entreprise' },
    { id: 'evenements', label: 'Événements', href: '/evenements' },
    { id: 'blog', label: 'Blog/News', href: '/blog' },
];

export const DEFULAT_MAIN_MENU_RIGHT: IMainMenuItem[] = [
    { id: 'a-propos', label: 'À propos de EcoleTestProp', href: '/a-propos' },
    { id: 'contact', label: 'Contact', href: '/contact', isCta: true }
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