import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import { CLASS_NAME } from '@/data/styles/style.constant';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { ROUTE_MAP } from '@/utils/route.util';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: t('PAGES.HOME', 'Accueil'), href: ROUTE_MAP.public.home.link },
        { label: t('PAGES.TERMS', "Conditions d'utilisation"), href: '#' },
    ];

    return (
        <DefaultLayout title={t('PAGES.TERMS', "Conditions d'utilisation")} description={t('PAGES.TERMS_DESCRIPTION', '')}>
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.TERMS', "Conditions d'utilisation")}
                    description={t('PAGES.ABOUT_US_DESCRIPTION', '')}
                    breadcrumbItems={breadcrumbItems}
                />
                <section className={`${CLASS_NAME.bgWhite} py-10 md:py-12 lg:py-16`}>
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        {/* Titre principal */}
                        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                            {t('PAGES.PRIVACY_POLICY', 'Politique de Confidentialité')}
                        </h1>

                        {/* Section 1 - Objet des CGU */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">1. Objet des CGU</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Les présentes CGU régissent l’utilisation du site internet de l’École TestPro, incluant ses fonctionnalités, contenus
                                et services.
                            </p>
                        </section>

                        {/* Section 2 - Accès au Site */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">2. Accès au Site</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                L’accès au site est libre et gratuit, sous réserve de votre acceptation des présentes CGU. Certaines sections du site
                                peuvent être accessibles uniquement après inscription ou paiement.
                            </p>
                        </section>

                        {/* Section 3 - Utilisation du Site */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">3. Utilisation du Site</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">En utilisant ce site, vous vous engagez à :</p>
                            <ul className="list-disc pl-5 text-justify text-gray-600 dark:text-gray-300">
                                <li>Ne pas utiliser le site à des fins frauduleuses ou illégales.</li>
                                <li>Respecter les droits d’autrui, notamment en matière de propriété intellectuelle et de vie privée.</li>
                                <li>
                                    Ne pas perturber le fonctionnement du site, notamment par l’introduction de virus ou autres logiciels
                                    malveillants.
                                </li>
                            </ul>
                        </section>

                        {/* Section 4 - Inscription et Compte Utilisateur */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">4. Inscription et Compte Utilisateur</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Vous devez fournir des informations exactes et à jour lors de votre inscription. Vous êtes seul responsable de
                                l’utilisation et de la sécurité de vos identifiants. Toute utilisation frauduleuse de votre compte doit être signalée
                                immédiatement à TestPro.
                            </p>
                        </section>

                        {/* Section 5 - Propriété Intellectuelle */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">5. Propriété Intellectuelle</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Tout le contenu du site (textes, images, vidéos, logos, etc.) est protégé par le droit de la propriété intellectuelle.
                                Toute reproduction, représentation, modification ou exploitation non autorisée des contenus est strictement interdite.
                            </p>
                        </section>

                        {/* Section 6 - Responsabilité */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">6. Responsabilité</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                L’École TestPro s’efforce de garantir l’exactitude et la mise à jour des informations présentes sur le site.
                                Cependant, nous ne pouvons être tenus responsables des éventuelles erreurs ou omissions. L’accès au site peut être
                                suspendu pour maintenance ou pour des raisons indépendantes de notre volonté (panne, force majeure, etc.).
                            </p>
                        </section>

                        {/* Section 7 - Liens vers sites tiers */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">7. Liens vers sites tiers</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Notre site peut contenir des liens vers des sites tiers. Nous déclinons toute responsabilité quant au contenu ou à la
                                sécurité de ces sites externes.
                            </p>
                        </section>

                        {/* Section 8 - Liens vers sites tiers */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">8. Liens vers sites tiers</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Notre site peut contenir des liens vers des sites tiers. Nous déclinons toute responsabilité quant au contenu ou à la
                                sécurité de ces sites externes.
                            </p>
                        </section>

                        {/* Section 9 - Données Personnelles */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">9. Données Personnelles</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Votre utilisation du site est soumise à notre Politique de Confidentialité, accessible sur le site.
                            </p>
                        </section>

                        {/* Section 10 - Modification des CGU */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">10. Modification des CGU</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                L’École TestPro se réserve le droit de modifier les présentes CGU à tout moment. Toute mise à jour sera publiée sur
                                cette page avec une date de modification.
                            </p>
                        </section>

                        {/* Section 11 - Droit Applicable et Litiges */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">11. Droit Applicable et Litiges</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Les présentes CGU sont soumises au droit ivoirien. En cas de litige, les parties s’engagent à privilégier une
                                résolution amiable avant toute action judiciaire.
                            </p>
                        </section>

                        {/* Section 12 - Nous Contacter */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">12. Nous Contacter</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Pour toute question concernant ces CGU ou nos services, vous pouvez nous joindre : Par e-mail : info@ecoletestpro.com
                                Par téléphone : +225 0706915705 Adresse : Ecole TestPro, Siège social: Abidjan – Attécoubé Locodjro, cité Lagoona
                                City, lot n° GH 23, ilot n°00, 01 BP 5676 ABIDJAN 01
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}
