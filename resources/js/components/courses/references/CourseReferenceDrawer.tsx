import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ICourse } from '@/types/course';
import { IPartner } from '@/types/partner';
import { getMediaUrl } from '@/utils/utils';
import axios from 'axios';
import { Building2, CheckCircle2, Info, Search, Tag, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CourseReferenceDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    course: ICourse;
    partners: IPartner[];
    onSuccess?: () => void;
}

export default function CourseReferenceDrawer({ 
    open, 
    setOpen, 
    course, 
    partners,
    onSuccess 
}: CourseReferenceDrawerProps) {
    const [partnerTags, setPartnerTags] = useState<string>('');
    const [selectedPartners, setSelectedPartners] = useState<number[]>([]);
    const [partnerFilter, setPartnerFilter] = useState('');

    // Initialiser les valeurs quand le drawer s'ouvre
    useEffect(() => {
        if (open) {
            // Récupérer les IDs des partenaires déjà associés
            const currentPartnerIds = course.partners ? course.partners.map(p => p.id!).filter(id => id !== undefined) : [];
            setSelectedPartners(currentPartnerIds);
            
            // Récupérer le tag existant
            setPartnerTags(course.reference_tag || '');
        }
    }, [open, course]);

    const handleUpdatePartners = async () => {
        try {
            if (!selectedPartners || selectedPartners.length === 0) {
                toast.error('Veuillez sélectionner au moins une référence.');
                return;
            } else if (!partnerTags) {
                toast.error('Veuillez entrer un tag de référence.');
                return;
            }

            await axios
                .post(route('dashboard.course.partners.sync', course.slug), {
                    partner_ids: selectedPartners,
                    reference_tag: partnerTags,
                })
                .then(() => {
                    toast.success('Références associées avec succès');
                    setOpen(false);
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        window.location.reload();
                    }
                })
                .catch(() => {
                    toast.error('Erreur lors de la mise à jour des références');
                });
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
        }
    };

    const togglePartner = (partnerId: number) => {
        setSelectedPartners(prev => {
            if (prev.includes(partnerId)) {
                return prev.filter(id => id !== partnerId);
            } else {
                return [...prev, partnerId];
            }
        });
    };

    const filteredPartners = partners.filter(p => 
        p.name.toLowerCase().includes(partnerFilter.toLowerCase())
    );

    return (
        <Drawer
            title="Associer des références"
            open={open}
            setOpen={setOpen}
            component={
                <div className="space-y-4">
                    {/* En-tête descriptif */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-blue-900 mb-1">À propos des références</h3>
                                <p className="text-sm text-blue-700">
                                    Les références permettent d'associer des partenaires à cette formation. 
                                    Ils apparaîtront sur la page de la formation comme références de confiance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Aperçu des références actuelles */}
                    {course.partners && course.partners.length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <h3 className="font-semibold text-green-900">
                                    Références actuellement associées ({course.partners.length})
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {course.partners.map((partner) => (
                                    <div key={partner.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-green-300">
                                        {partner.media && (
                                            <img 
                                                src={getMediaUrl(partner.media)} 
                                                alt={partner.name} 
                                                className="w-5 h-5 rounded-full object-cover" 
                                            />
                                        )}
                                        <span className="text-sm font-medium">{partner.name}</span>
                                    </div>
                                ))}
                            </div>
                            {course.reference_tag && (
                                <div className="mt-2 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">Tag actuel: <strong>{course.reference_tag}</strong></span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Barre de recherche améliorée */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            className="pl-10 pr-4"
                            placeholder="Rechercher une référence..."
                            value={partnerFilter}
                            onChange={(e) => setPartnerFilter(e.target.value)}
                        />
                    </div>

                    {/* Actions rapides */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                            <Users className="inline w-4 h-4 mr-1" />
                            {filteredPartners.length} référence(s) disponible(s)
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPartners(partners.map(p => p.id).filter((id): id is number => id !== undefined))}
                            >
                                Tout sélectionner
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPartners([])}
                            >
                                Tout désélectionner
                            </Button>
                        </div>
                    </div>

                    {/* Liste des références avec switches */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="max-h-[40vh] overflow-y-auto">
                            {filteredPartners.map((partner, index) => (
                                <div 
                                    key={partner.id} 
                                    className={`flex items-center justify-between p-3 hover:bg-gray-50 transition-colors ${
                                        index !== 0 ? 'border-t' : ''
                                    } ${selectedPartners.includes(partner.id!) ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="relative">
                                            {partner.media ? (
                                                <img 
                                                    src={getMediaUrl(partner.media)} 
                                                    alt={partner.name} 
                                                    className="h-12 w-12 rounded-lg object-cover border" 
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <Building2 className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                            {selectedPartners.includes(partner.id!) && (
                                                <CheckCircle2 className="absolute -top-1 -right-1 w-5 h-5 text-blue-600 bg-white rounded-full" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{partner.name}</p>
                                            {(partner as any).description && (
                                                <p className="text-xs text-gray-500 line-clamp-1">{(partner as any).description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Switch
                                        checked={selectedPartners.includes(partner.id!)}
                                        onCheckedChange={() => togglePartner(partner.id!)}
                                        className="ml-4"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Champ de tag amélioré */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            <Tag className="inline w-4 h-4 mr-1" />
                            Tag de référence
                        </label>
                        <Input
                            required
                            type="text"
                            value={partnerTags}
                            onChange={(e) => setPartnerTags(e.target.value)}
                            placeholder="Ex: Partenaire officiel, Référence certifiée..."
                            className="w-full"
                        />
                        <p className="text-xs text-gray-500">
                            Ce tag apparaîtra sur la page de formation pour qualifier les références
                        </p>
                    </div>

                    {/* Résumé et actions */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                                {selectedPartners.length === 0 
                                    ? "Aucune référence sélectionnée" 
                                    : `${selectedPartners.length} référence(s) sélectionnée(s)`
                                }
                            </span>
                            {partnerTags && (
                                <span className="text-sm text-gray-600">
                                    Tag: <strong>{partnerTags}</strong>
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                onClick={() => {
                                    setOpen(false);
                                    setSelectedPartners(course.partners ? course.partners.map(p => p.id!) : []);
                                    setPartnerTags(course.reference_tag || '');
                                }}
                                className="flex-1"
                            >
                                Annuler
                            </Button>
                            <Button 
                                onClick={handleUpdatePartners}
                                disabled={selectedPartners.length === 0 || !partnerTags}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Enregistrer les références
                            </Button>
                        </div>
                    </div>
                </div>
            }
        />
    );
}