import { SharedData } from '@/types';
import { IPartner } from '@/types/partner';
import { Logger } from '@/utils/console.util';
import { getMediaUrl } from '@/utils/utils';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Award, Building2, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import TitleBadgeOne from '../ui/badge-one';

interface ReferenceLogosProps {
    tag: string;
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'minimal' | 'premium';
    showCount?: boolean;
    maxItems?: number;
}

export default function ReferenceLogos({
    tag,
    title = 'Nos références',
    subtitle = 'Ils nous font confiance',
    variant = 'default',
    showCount = false,
    maxItems,
}: ReferenceLogosProps) {
    const { auth, data } = usePage<SharedData>().props;
    const references: IPartner[] = (data as any)?.references ?? [];

    const [filteredReferences, setFilteredReferences] = useState<IPartner[]>(references);
    const [isLoading, setIsLoading] = useState(true);

    if (!tag || tag === '' || tag === null || tag === undefined) {
        return null;
    }

    useEffect(() => {
        setIsLoading(true);
        Logger.log('references', references);

        if (tag && references.length > 0) {
            let filtered = references.filter((ref) => ref.tag?.split(';')?.includes(tag));

            // Limiter le nombre d'éléments si spécifié
            if (maxItems && filtered.length > maxItems) {
                filtered = filtered.slice(0, maxItems);
            }

            setFilteredReferences(filtered);
        } else {
            setFilteredReferences(references);
        }

        setIsLoading(false);
        Logger.log('filteredReferences', filteredReferences);
    }, [tag, references, maxItems]);

    const getImgLink = (ref: IPartner): string => {
        if (ref?.media?.src) {
            return getMediaUrl(ref.media);
        }
        return 'https://placehold.jp/250x150.png';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    if (!references || references.length === 0 || filteredReferences.length === 0) {
        return null;
    }

    const getVariantClasses = () => {
        switch (variant) {
            case 'minimal':
                return {
                    container: 'py-12 bg-white',
                    grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
                    item: 'p-4 grayscale hover:grayscale-0 transition-all duration-300',
                    image: 'h-12 w-auto object-contain mx-auto',
                };
            case 'premium':
                return {
                    container: 'py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800',
                    grid: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                    item: 'group p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700',
                    image: 'h-16 w-auto object-contain mx-auto group-hover:scale-105 transition-transform duration-300',
                };
            default:
                return {
                    container: 'py-12 bg-gray-50 dark:bg-slate-900',
                    grid: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
                    item: 'flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:border-primary/20',
                    image: 'h-14 w-auto object-contain filter hover:brightness-110 transition-all duration-300',
                };
        }
    };

    const classes = getVariantClasses();

    return (
        <section className={classes.container}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4">
                        <TitleBadgeOne title={title} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        {subtitle}
                    </motion.h2>

                    {showCount && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
                        >
                            <Award className="w-5 h-5 text-primary" />
                            <span className="text-lg font-medium">
                                {filteredReferences.length} partenaire{filteredReferences.length > 1 ? 's' : ''} de confiance
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement des références...</span>
                    </div>
                ) : (
                    /* References Grid */
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`grid gap-4 sm:gap-6 ${classes.grid}`}>
                        {filteredReferences.map((ref, index) => (
                            <motion.div
                                key={ref.id}
                                variants={itemVariants}
                                whileHover={{ scale: variant === 'minimal' ? 1.02 : 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={classes.item}
                                title={ref.name}
                            >
                                <img
                                    src={getImgLink(ref)}
                                    alt={ref?.name ?? `Référence ${index + 1}`}
                                    className={classes.image}
                                    loading="lazy"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://placehold.jp/250x150.png';
                                    }}
                                />

                                {variant === 'premium' && (
                                    <div className="mt-3 text-center">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ref.name}</p>
                                        <div className="flex items-center justify-center mt-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Partenaire certifié</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Footer CTA */}
                {variant === 'premium' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
                            <Building2 className="w-4 h-4" />
                            <span>Rejoignez nos partenaires de confiance</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

// Exemples d'utilisation :
// <ReferenceLogos tag="formation" /> // Version par défaut
// <ReferenceLogos tag="formation" variant="minimal" maxItems={8} /> // Version minimaliste
// <ReferenceLogos tag="formation" variant="premium" title="Nos partenaires" subtitle="Excellence reconnue" /> // Version premium
