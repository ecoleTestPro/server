// Imports des sections modulaires
import AccreditationsSection from './sections/AccreditationsSection';
import CEOQuoteSection from './sections/CEOQuoteSection';
import MissionSection from './sections/MissionSection';
import OffersSection from './sections/OffersSection';
import SpecialSection from './sections/SpecialSection';
import ValuesSection from './sections/ValuesSection';
import WelcomeSection from './sections/WelcomeSection';

/**
 * Composant principal de la page À Propos
 *
 * @component
 * @description Page complète présentant TestPro, divisée en sections modulaires :
 * - Section de bienvenue avec présentation
 * - Mission de l'entreprise
 * - Citation du CEO
 * - Ce qui nous rend spécial
 * - Nos valeurs
 * - Nos offres de services
 * - Agréments et certifications
 *
 * Chaque section est un composant indépendant pour une meilleure maintenabilité.
 */
function AboutUsCardThree() {
    /**
     * Variants d'animation pour les images
     * Utilisés par les sections contenant des images animées
     */
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <section className="text-gray-600 dark:bg-[#0a0e19] dark:text-white">
            {/* Section 1 - Bienvenue et présentation TestPro */}
            <WelcomeSection imageVariants={imageVariants} />

            {/* Section 2 - Notre Mission */}
            <MissionSection />

            {/* Section 3 - Citation du Directeur général */}
            <CEOQuoteSection />

            {/* Section 4 - Ce qui nous rend spécial */}
            <SpecialSection imageVariants={imageVariants} />

            {/* Section 5 - Nos Valeurs */}
            <ValuesSection />

            {/* Section 6 - Nos Offres de services */}
            <OffersSection />

            {/* Section 7 - Agréments et certifications */}
            <AccreditationsSection />
        </section>
    );
}

export default AboutUsCardThree;
