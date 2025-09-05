import { CLASS_NAME } from '@/data/styles/style.constant';
import MotionSection from '../../motion/MotionSection';

/**
 * Structure d'un agrément/certification
 */
interface AccreditationItem {
    /** Nom de l'organisme certificateur */
    name: string;
    /** Titre complet de la certification */
    title: string;
    /** URL du logo de l'organisme */
    logoUrl: string;
    /** Texte alternatif pour le logo */
    logoAlt: string;
    /** Description détaillée de l'agrément */
    description: string;
    /** Classes CSS pour la taille du logo (optionnel) */
    logoClasses?: string;
}

/**
 * Props du composant AccreditationCard
 */
interface AccreditationCardProps {
    /** Données de l'agrément à afficher */
    accreditation: AccreditationItem;
}

/**
 * Composant pour afficher une carte d'agrément individuelle
 * 
 * @component
 * @description Carte présentant un agrément avec logo, titre et description détaillée.
 * Layout en grille responsive avec logo à gauche et contenu à droite.
 */
function AccreditationCard({ accreditation }: AccreditationCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 items-center bg-white/50 dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg">
            {/* Section Logo */}
            <div className="col-span-1 md:col-span-1 text-center">
                <img
                    src={accreditation.logoUrl}
                    alt={accreditation.logoAlt}
                    className={`mx-auto object-contain ${accreditation.logoClasses || 'h-16 md:h-20 lg:h-24'}`}
                />
            </div>
            
            {/* Section Contenu */}
            <div className="space-y-4 col-span-1 md:col-span-5">
                {/* Titre de l'agrément */}
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {accreditation.title}
                </h3>
                
                {/* Description détaillée */}
                <div 
                    className="leading-relaxed text-gray-700 dark:text-gray-300 text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: accreditation.description }}
                />
            </div>
        </div>
    );
}

/**
 * Composant de la section des agréments et certifications
 * 
 * @component
 * @description Section présentant les agréments officiels de TestPro :
 * GASQ Platinium et FDFP. Mise en page avec cartes détaillées et séparateur visuel.
 */
export default function AccreditationsSection() {
    /** Liste des agréments de l'entreprise */
    const accreditations: AccreditationItem[] = [
        {
            name: 'GASQ',
            title: 'TestPro, organisme certifié GASQ Platinium',
            logoUrl: '/assets/images/agrements/gasq.jpeg',
            logoAlt: 'Logo GASQ',
            logoClasses: 'h-16 md:h-20 lg:h-24',
            description: `
                En tant que centre de formation accrédité GASQ Platinium, <strong>TestPro</strong> propose des parcours de
                formation certifiants tels que <strong>ISTQB</strong>, alignés sur les standards internationaux du test
                logiciel.
                <br /><br />
                Nos formations allient expertise technique et pédagogie de qualité, encadrées par des formateurs certifiés,
                avec des supports officiels à jour. Les examens peuvent être passés sur site dans nos locaux à Cocody ou en
                ligne.
                <br /><br />
                Cette reconnaissance renforce notre crédibilité en tant qu'acteur clé de la formation en assurance qualité
                logicielle.
            `
        },
        {
            name: 'FDFP',
            title: 'TestPro agréé par le FDFP',
            logoUrl: '/assets/images/agrements/logo-fdfp.jpg',
            logoAlt: 'Logo FDFP',
            logoClasses: 'h-20 md:h-24 lg:h-28',
            description: `
                <strong>TestPro</strong> est agréé par le{' '}
                <strong>Fonds de Développement de la Formation Professionnelle (FDFP)</strong>, ce qui permet aux entreprises
                ivoiriennes de mobiliser leur contribution pour financer les formations de leurs équipes.
                <br /><br />
                Grâce à notre catalogue riche et adapté aux besoins métiers, nous accompagnons efficacement les entreprises
                dans la mise en œuvre de leur plan de formation, avec une prise en charge facilitée par le FDFP.
            `
        }
    ];

    return (
        <MotionSection>
            <div className={`body-font ${CLASS_NAME.bgWhite}`}>
                <div className={`${CLASS_NAME.sectionContentPadding}`}>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                        {/* Titre de la section */}
                        <h2 className="!mb-8 text-2xl font-bold md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-center">
                            Nos Agréments
                        </h2>
                        
                        {/* Affichage des agréments */}
                        {accreditations.map((accreditation, index) => (
                            <div key={accreditation.name}>
                                {/* Carte d'agrément */}
                                <AccreditationCard accreditation={accreditation} />
                                
                                {/* Séparateur entre les cartes (sauf pour la dernière) */}
                                {index < accreditations.length - 1 && (
                                    <div className="w-full border-t border-gray-200 my-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionSection>
    );
}