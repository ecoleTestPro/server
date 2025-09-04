import { IJobOffer } from '@/types';
import { motion, Variants } from 'framer-motion';
import { Building2, Calendar, Clock, Eye, MapPin, Send } from 'lucide-react';
import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

// Composant pour une carte d'offre d'emploi
export const JobCard: React.FC<{
    job: IJobOffer;
    applySelected: number | null;
    setApplySelected: React.Dispatch<React.SetStateAction<number | null>>;
    openApplyModal: boolean;
    setOpenApplyModal: React.Dispatch<React.SetStateAction<boolean>>;
    detailSelected: number | null;
    setDetailSelected: React.Dispatch<React.SetStateAction<number | null>>;
    openDetailModal: boolean;
    setOpenDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    job,
    applySelected,
    setApplySelected,
    openApplyModal,
    setOpenApplyModal,
    detailSelected,
    setDetailSelected,
    openDetailModal,
    setOpenDetailModal,
}) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        hover: { y: -5, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', transition: { duration: 0.3 } },
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const isExpiringSoon = (dateString: string) => {
        const expiryDate = new Date(dateString);
        const today = new Date();
        const diffTime = expiryDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && diffDays > 0;
    };

    const isExpired = (dateString: string) => {
        const expiryDate = new Date(dateString);
        const today = new Date();
        return expiryDate < today;
    };

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="h-full">
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/30">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground leading-tight mb-2">{job.title}</h3>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                {job.company && (
                                    <div className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        <span>{job.company}</span>
                                    </div>
                                )}
                                {job.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 items-end">
                            {job.type && (
                                <Badge variant="secondary" className="text-xs text-white">
                                    {job.type}
                                </Badge>
                            )}
                            {job.expires_at && isExpired(job.expires_at) && (
                                <Badge
                                    variant={isExpired(job.expires_at) ? 'destructive' : isExpiringSoon(job.expires_at) ? 'secondary' : 'outline'}
                                    className="text-xs"
                                >
                                    {isExpired(job.expires_at) ? 'Expiré' : isExpiringSoon(job.expires_at) ? 'Expire bientôt' : 'Expire'}
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                    {job.salary && (
                        <div className="flex items-center gap-1 text-sm font-medium text-foreground mb-3">
                            <span className="text-green-600">{job.salary.toLocaleString('fr-FR')} FCFA/ mois</span>
                        </div>
                    )}

                    <div className="space-y-2 text-xs text-muted-foreground">
                        {job.created_at && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Publié le {formatDate(job.created_at)}</span>
                            </div>
                        )}
                        {job.expires_at && (
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className={isExpiringSoon(job.expires_at) ? 'text-amber-600 font-medium' : ''}>
                                    {isExpired(job.expires_at)
                                        ? `Expiré le ${formatDate(job.expires_at)}`
                                        : `Expire le ${formatDate(job.expires_at)}`}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-0 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                            setDetailSelected(job.id || 0);
                            setOpenDetailModal(true);
                        }}
                    >
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1"
                        disabled={job.expires_at ? isExpired(job.expires_at) : false}
                        onClick={() => {
                            setApplySelected(job.id || 0);
                            setOpenApplyModal(true);
                        }}
                    >
                        <Send className="h-4 w-4 mr-1" />
                        Postuler
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
