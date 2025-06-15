import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/dashboard/app-layout';
import SettingsLayout from '@/layouts/dashboard/layout';

// Define the menu item type (based on your Header component)
interface IMainMenuItem {
    id: string;
    label: string;
    href: string;
    title?: string;
    description?: string;
    isCta?: boolean;
    children?: {
        id: string;
        title: string;
        description: string;
        items: Array<{
            id: string;
            label: string;
            href: string;
            subItems?: Array<{ id: string; label: string; href: string }>;
        }>;
        featured?: Array<{ id: string; label: string; href: string }>;
    };
}

// Define the logo type
interface Logo {
    text: string;
    href: string;
    [key: string]: string; // Add this line
}

// Define the form data structure
type HeaderForm = {
    logo: Logo;
    mainMenu: IMainMenuItem[];
    mainMenuRight: IMainMenuItem[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Header Settings',
        href: 'dashboard/settings/header',
    },
];

export default function SettingPage({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, headerConfig } = usePage<SharedData & { headerConfig?: HeaderForm }>().props;

    // Initialize form with default or fetched header configuration
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<HeaderForm>({
        logo: headerConfig?.logo || { text: 'EcoleTestProp', href: '/' },
        mainMenu: headerConfig?.mainMenu || [
            {
                id: 'certifications',
                label: 'Certifications',
                href: '/certifications',
                title: 'Certifications',
                description: 'Découvrez nos certifications qui valident vos compétences professionnelles.',
            },
            { id: 'entreprises', label: 'Offre pour entreprises', href: '/entreprise' },
            { id: 'evenements', label: 'Événements', href: '/evenements' },
            { id: 'blog', label: 'Blogs', href: '/blog' },
        ],
        mainMenuRight: headerConfig?.mainMenuRight || [
            { id: 'a-propos', label: 'À propos de EcoleTestProp', href: '/a-propos' },
            { id: 'contact', label: 'Contact', href: '/contact', isCta: true },
        ],
    });

    // Handle form submission
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('header.update'), {
            preserveScroll: true,
        });
    };

    // Handle logo field changes
    const handleLogoChange = (field: keyof Logo, value: string) => {
        setData('logo', { ...data.logo, [field]: value });
    };

    // Handle main menu item changes
    const handleMainMenuChange = (index: number, field: keyof IMainMenuItem, value: string | boolean) => {
        const updatedMenu = [...data.mainMenu];
        updatedMenu[index] = { ...updatedMenu[index], [field]: value };
        setData('mainMenu', updatedMenu);
    };

    // Handle right menu item changes
    const handleMainMenuRightChange = (index: number, field: keyof IMainMenuItem, value: string | boolean) => {
        const updatedMenu = [...data.mainMenuRight];
        updatedMenu[index] = { ...updatedMenu[index], [field]: value };
        setData('mainMenuRight', updatedMenu);
    };

    // Add a new main menu item
    const addMainMenuItem = () => {
        setData('mainMenu', [
            ...data.mainMenu,
            { id: `item-${Date.now()}`, label: 'New Item', href: '#', title: '', description: '' },
        ]);
    };

    // Add a new right menu item
    const addMainMenuRightItem = () => {
        setData('mainMenuRight', [
            ...data.mainMenuRight,
            { id: `item-${Date.now()}`, label: 'New Item', href: '#', isCta: false },
        ]);
    };

    // Remove a main menu item
    const removeMainMenuItem = (index: number) => {
        setData('mainMenu', data.mainMenu.filter((_, i) => i !== index));
    };

    // Remove a right menu item
    const removeMainMenuRightItem = (index: number) => {
        setData('mainMenuRight', data.mainMenuRight.filter((_, i) => i !== index));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Header Settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Header Configuration" description="Update your header menu settings" />

                    <form onSubmit={submit} className="space-y-6">
                        {/* Logo Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Logo</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="logoText" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Logo Text
                                    </label>
                                    <input
                                        id="logoText"
                                        type="text"
                                        value={data.logo.text}
                                        onChange={(e) => handleLogoChange('text', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.logo?.text && <p className="mt-1 text-sm text-red-500">{errors.logo.text}</p>}
                                </div>
                                <div>
                                    <label htmlFor="logoHref" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Logo URL
                                    </label>
                                    <input
                                        id="logoHref"
                                        type="text"
                                        value={data.logo.href}
                                        onChange={(e) => handleLogoChange('href', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.logo?.href && <p className="mt-1 text-sm text-red-500">{errors.logo.href}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Main Menu Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Main Menu</h3>
                            {data.mainMenu.map((item, index) => (
                                <div key={item.id} className="rounded-md border p-4 dark:border-gray-600">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor={`mainMenuLabel-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Label
                                            </label>
                                            <input
                                                id={`mainMenuLabel-${index}`}
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => handleMainMenuChange(index, 'label', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.mainMenu?.[index]?.label && (
                                                <p className="mt-1 text-sm text-red-500">{errors.mainMenu[index].label}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor={`mainMenuHref-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                URL
                                            </label>
                                            <input
                                                id={`mainMenuHref-${index}`}
                                                type="text"
                                                value={item.href}
                                                onChange={(e) => handleMainMenuChange(index, 'href', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.mainMenu?.[index]?.href && (
                                                <p className="mt-1 text-sm text-red-500">{errors.mainMenu[index].href}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor={`mainMenuTitle-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Title
                                            </label>
                                            <input
                                                id={`mainMenuTitle-${index}`}
                                                type="text"
                                                value={item.title || ''}
                                                onChange={(e) => handleMainMenuChange(index, 'title', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor={`mainMenuDesc-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Description
                                            </label>
                                            <input
                                                id={`mainMenuDesc-${index}`}
                                                type="text"
                                                value={item.description || ''}
                                                onChange={(e) => handleMainMenuChange(index, 'description', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMainMenuItem(index)}
                                        className="mt-2 text-sm text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addMainMenuItem}
                                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            >
                                Add Main Menu Item
                            </button>
                        </div>

                        {/* Right Menu Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Right Menu</h3>
                            {data.mainMenuRight.map((item, index) => (
                                <div key={item.id} className="rounded-md border p-4 dark:border-gray-600">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor={`rightMenuLabel-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Label
                                            </label>
                                            <input
                                                id={`rightMenuLabel-${index}`}
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => handleMainMenuRightChange(index, 'label', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.mainMenuRight?.[index]?.label && (
                                                <p className="mt-1 text-sm text-red-500">{errors.mainMenuRight[index].label}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor={`rightMenuHref-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                URL
                                            </label>
                                            <input
                                                id={`rightMenuHref-${index}`}
                                                type="text"
                                                value={item.href}
                                                onChange={(e) => handleMainMenuRightChange(index, 'href', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                            />
                                            {errors.mainMenuRight?.[index]?.href && (
                                                <p className="mt-1 text-sm text-red-500">{errors.mainMenuRight[index].href}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor={`rightMenuCta-${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Is Call to Action?
                                            </label>
                                            <input
                                                id={`rightMenuCta-${index}`}
                                                type="checkbox"
                                                checked={item.isCta || false}
                                                onChange={(e) => handleMainMenuRightChange(index, 'isCta', e.target.checked)}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMainMenuRightItem(index)}
                                        className="mt-2 text-sm text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addMainMenuRightItem}
                                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            >
                                Add Right Menu Item
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-50"
                            >
                                Save Changes
                            </button>
                            {recentlySuccessful && <p className="text-sm text-green-500">Saved successfully!</p>}
                        </div>
                    </form>

                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}