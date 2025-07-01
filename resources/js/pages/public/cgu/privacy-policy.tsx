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
        { label: t('PAGES.ABOUT_US', 'Politique de confidentialité'), href: '#' },
    ];

    return (
        <DefaultLayout
            title={t('PAGES.PRIVACY_POLICY', 'Politique de confidentialité')}
            description={t(
                'PAGES.PRIVACY_POLICY_DESCRIPTION',
                '',
            )}
        >
            <div className="bg-gray-100 dark:bg-[#0a0e19]">
                <Hero
                    title={t('PAGES.ABOUT_US', 'Politique de confidentialité')}
                    description={t(
                        'PAGES.ABOUT_US_DESCRIPTION',
                        "En savoir plus sur notre mission, notre vision et l'équipe à l'origine de notre plateforme.",
                    )}
                    breadcrumbItems={breadcrumbItems}
                />
                <section className={`${CLASS_NAME.bgWhite} py-10 md:py-12 lg:py-16`}>
                    <div className="container mx-auto px-4 md:px-6 lg:px-8">
                        {/* Titre principal */}
                        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                            {t('PAGES.PRIVACY_POLICY', 'Politique de Confidentialité')}
                        </h1>
                        <p className="mb-8 text-justify text-lg text-gray-600 md:text-xl dark:text-gray-300">
                            L’École TestPro accorde une grande importance à la confidentialité de vos données personnelles. Cette politique explique
                            quelles informations nous collectons, comment elles sont utilisées, partagées et protégées, conformément à la législation
                            en vigueur.
                        </p>

                        {/* Section 1 - Informations Collectées */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">1. Informations Collectées</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Nous pouvons collecter les informations suivantes : Informations personnelles : nom, prénom, adresse e-mail, numéro de
                                téléphone, adresse postale. Informations professionnelles : employeur, poste, domaine d’activité. Données techniques :
                                adresse IP, type de navigateur, pages visitées, durée de navigation. Informations de paiement : uniquement pour les
                                transactions sécurisées via nos partenaires.
                            </p>
                        </section>

                        {/* Section 2 - Utilisation des Informations */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">2. Utilisation des Informations</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Les données collectées sont utilisées pour : Gérer vos inscriptions aux formations et certifications. Répondre à vos
                                demandes d’information. Personnaliser votre expérience sur notre site. Améliorer nos services et contenus. Envoyer des
                                communications liées à nos services (newsletters, mises à jour, offres promotionnelles).
                            </p>
                        </section>

                        {/* Section 3 - Partage des Informations */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">3. Partage des Informations</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Vos informations ne seront jamais vendues à des tiers. Cependant, nous pouvons partager vos données avec : Nos
                                partenaires de paiement pour traiter vos transactions. Nos prestataires de services (hébergement, emailing) sous
                                strictes conditions de confidentialité. Les autorités légales, si requis par la loi.
                            </p>
                        </section>

                        {/* Section 4 - Sécurité des Données */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">4. Sécurité des Données</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre les accès non
                                autorisés, pertes, ou altérations.
                            </p>
                        </section>

                        {/* Section 5 - Durée de Conservation */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">5. Durée de Conservation</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Vos données personnelles sont conservées uniquement pendant la durée nécessaire pour atteindre les objectifs
                                mentionnés ci-dessus ou conformément aux exigences légales.
                            </p>
                        </section>

                        {/* Section 6 - Vos Droits */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">6. Vos Droits</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Conformément à la réglementation applicable, vous disposez des droits suivants : Accès : connaître les données
                                personnelles que nous détenons sur vous. Rectification : corriger vos informations personnelles si elles sont
                                inexactes. Suppression : demander l’effacement de vos données, sauf obligation légale. Opposition : refuser le
                                traitement de vos données pour certaines finalités. Portabilité : obtenir vos données dans un format structuré,
                                couramment utilisé. Pour exercer vos droits, contactez-nous à info@ecoletestpro.com.
                            </p>
                        </section>

                        {/* Section 7 - Cookies */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">7. Cookies</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez les désactiver dans les
                                paramètres de votre navigateur.
                            </p>
                        </section>

                        {/* Section 8 - Modifications de la Politique */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                                8. Modifications de la Politique de Confidentialité
                            </h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification sera publiée sur cette page
                                avec une date mise à jour.
                            </p>
                        </section>

                        {/* Section 9 - Nous Contacter */}
                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">9. Nous Contacter</h2>
                            <p className="text-justify text-gray-600 dark:text-gray-300">
                                Pour toute question concernant cette politique ou le traitement de vos données, vous pouvez nous contacter : Par
                                e-mail : info@ecoletestpro.com Par téléphone : +225 0706915705 Adresse : Ecole TestPro, Siège social: Abidjan –
                                Attécoubé Locodjro, cité Lagoona City, lot n° GH 23, ilot n°00, 01 BP 5676 ABIDJAN 01
                            </p>
                        </section>
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
}
