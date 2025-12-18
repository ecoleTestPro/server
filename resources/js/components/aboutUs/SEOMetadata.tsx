import { Head } from '@inertiajs/react';

/**
 * Props du composant SEOMetadata
 */
interface SEOMetadataProps {
    /** Titre personnalisé de la page (optionnel) */
    title?: string;
    /** Description personnalisée (optionnelle) */
    description?: string;
    /** URL canonique (optionnelle) */
    canonicalUrl?: string;
}

/**
 * Composant pour les métadonnées SEO de la page À propos
 *
 * @component
 * @description Gère toutes les métadonnées pour optimiser le référencement :
 * - Balises meta classiques (title, description, keywords)
 * - Open Graph pour les réseaux sociaux
 * - Twitter Cards
 * - Données structurées JSON-LD pour Google
 */
export default function SEOMetadata({
    title = 'À propos de TestPro - Expert en test logiciel et formations certifiantes ISTQB',
    description = "Découvrez TestPro, centre de formation certifié GASQ Platinium et agréé FDFP. Spécialisé dans le test logiciel, formations ISTQB, audit qualité et accompagnement digital en Côte d'Ivoire.",
    canonicalUrl = 'https://testpro.ci/about',
}: SEOMetadataProps) {
    /** Données structurées pour l'organisation */
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TestPro',
        alternateName: "TestPro Côte d'Ivoire",
        description: 'Centre de formation spécialisé en test logiciel, certifications ISTQB et transformation digitale',
        url: 'https://testpro.ci',
        logo: 'https://testpro.ci/assets/images/logo.png',
        image: 'https://testpro.ci/assets/images/testpro-about.jpg',
        foundingDate: '2020',
        founder: {
            '@type': 'Person',
            name: 'Alexis NANA',
            jobTitle: 'CEO TestPro | Expert en Assurance Qualité Logicielle | Formateur ISTQB, IREB, IQBBA, IIBA, PSPO, PSM',
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Cocody',
            addressLocality: 'Abidjan',
            addressCountry: 'CI',
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                telephone: '+225-XX-XX-XX-XX',
                contactType: 'customer service',
                availableLanguage: ['French', 'English'],
            },
        ],
        sameAs: ['https://linkedin.com/company/testpro-ci', 'https://facebook.com/testpro.ci'],
        areaServed: {
            '@type': 'Place',
            name: "Côte d'Ivoire",
        },
        serviceType: ['Formation professionnelle', 'Test logiciel', 'Certification ISTQB', 'Audit qualité', 'Conseil en transformation digitale'],
        accreditation: [
            {
                '@type': 'Certification',
                name: 'GASQ Platinium',
                certificationBody: 'GASQ',
            },
            {
                '@type': 'Certification',
                name: 'Agrément FDFP',
                certificationBody: 'FDFP',
            },
        ],
        knowsAbout: [
            'Test logiciel',
            'ISTQB',
            'Automatisation des tests',
            'Assurance qualité',
            'Formation professionnelle',
            'Transformation digitale',
        ],
    };

    /** Données structurées pour les services */
    const servicesSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Formation Test Logiciel',
        provider: {
            '@type': 'Organization',
            name: 'TestPro',
        },
        serviceType: 'Formation professionnelle',
        description: 'Formations certifiantes en test logiciel, préparation ISTQB, audit qualité et conseils stratégiques',
        areaServed: {
            '@type': 'Place',
            name: "Côte d'Ivoire",
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Formations TestPro',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Course',
                        name: 'Formation ISTQB Foundation',
                        description: 'Formation certifiante ISTQB Foundation Level',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Course',
                        name: 'Automatisation des tests',
                        description: "Formation aux outils d'automatisation des tests",
                    },
                },
            ],
        },
    };

    return (
        <Head>
            {/* Balises Meta classiques */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="keywords"
                content="TestPro, test logiciel, ISTQB, formation, certification, GASQ, FDFP, Côte d'Ivoire, Abidjan, assurance qualité, automatisation tests, audit qualité, transformation digitale"
            />
            <meta name="author" content="TestPro" />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <link rel="canonical" href={canonicalUrl} />

            {/* Métadonnées de langues */}
            <meta httpEquiv="content-language" content="fr" />
            <meta name="language" content="French" />

            {/* Open Graph pour Facebook */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content="https://testpro.ci/assets/images/og-about.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content="TestPro - Formation en test logiciel et certifications" />
            <meta property="og:site_name" content="TestPro" />
            <meta property="og:locale" content="fr_FR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://testpro.ci/assets/images/twitter-about.jpg" />
            <meta name="twitter:image:alt" content="TestPro - Expert en test logiciel" />
            <meta name="twitter:site" content="@testpro_ci" />

            {/* Métadonnées géographiques */}
            <meta name="geo.region" content="CI" />
            <meta name="geo.placename" content="Abidjan" />
            <meta name="geo.position" content="5.3364;-4.0267" />
            <meta name="ICBM" content="5.3364, -4.0267" />

            {/* Métadonnées business */}
            <meta name="classification" content="Formation professionnelle" />
            <meta name="category" content="Éducation, Technologie, Test logiciel" />
            <meta name="coverage" content="Côte d'Ivoire" />
            <meta name="distribution" content="global" />
            <meta name="rating" content="general" />

            {/* Données structurées JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />

            {/* Balises spécifiques aux moteurs de recherche */}
            <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow" />
            <meta name="slurp" content="index, follow" />

            {/* Métadonnées de révision */}
            <meta name="revised" content={new Date().toISOString()} />
            <meta name="topic" content="Formation test logiciel" />
            <meta name="summary" content="TestPro est un centre de formation spécialisé en test logiciel, certifié GASQ et agréé FDFP" />

            {/* Balises pour les réseaux sociaux professionnels */}
            <meta property="article:author" content="TestPro" />
            <meta property="article:publisher" content="https://facebook.com/testpro.ci" />
        </Head>
    );
}
