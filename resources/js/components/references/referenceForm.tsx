import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { InputFile } from '@/components/ui/inputFile';
import { Label } from '@/components/ui/label';
import TagInput from '@/components/ui/tag-input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IPartner } from '@/types/partner';
import { getMediaUrl } from '@/utils/utils';
import axios from 'axios';
import { Building2, HelpCircle, Image as ImageIcon, ImageOff, Loader2, Tag, X } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ReferenceFormProps {
    closeDrawer?: () => void;
    initialData?: IPartner;
    onSuccess?: (updatedReference: IPartner) => void;
}

interface ReferenceFormData {
    name: string;
    tag?: string;
    is_active: boolean;
    is_reference: boolean;
    picture?: File;
    [key: string]: any;
}

export default function ReferenceForm({ closeDrawer, initialData, onSuccess }: ReferenceFormProps) {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [data, setData] = useState<ReferenceFormData>({
        name: initialData?.name || '',
        tag: initialData?.tag || '',
        is_active: initialData?.is_active ?? true,
        is_reference: initialData?.is_reference ?? true,
    });
    const [tags, setTags] = useState<string[]>(initialData?.tag ? initialData.tag.split(';').filter(Boolean) : []);

    // Initialiser l'aperçu avec l'image existante
    useEffect(() => {
        if (initialData?.media?.src) {
            setPreviewUrl(getMediaUrl(initialData.media.src));
        }
    }, [initialData]);

    useEffect(() => {
        setData((prevData) => ({ ...prevData, tag: tags.join(';') }));
    }, [tags]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            // Préparer FormData pour l'envoi avec fichier
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('tag', data.tag || '');
            formData.append('is_reference', '1');
            formData.append('is_active', data.is_active ? '1' : '0');

            // Ajouter le fichier s'il existe
            if (file) {
                formData.append('picture', file);
            }

            // Déterminer l'URL et la méthode
            const isUpdate = initialData?.id;
            const url = isUpdate ? route('dashboard.references.update', initialData.id) : route('dashboard.references.store');

            // Effectuer la requête
            const response = isUpdate
                ? await axios.post(url, formData, {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                          'X-HTTP-Method-Override': 'PUT',
                      },
                  })
                : await axios.post(url, formData, {
                      headers: {
                          'Content-Type': 'multipart/form-data',
                      },
                  });

            // Succès
            toast.success(isUpdate ? t('references.updated', 'Référence mise à jour !') : t('references.created', 'Référence créée !'));

            // Si on a un callback de succès, récupérer les données mises à jour
            if (onSuccess) {
                try {
                    // Récupérer les données mises à jour depuis le serveur
                    const refreshResponse = await axios.get('/dashboard/references/api');
                    const references = refreshResponse.data.references || refreshResponse.data.data?.references || [];

                    // Trouver la référence mise à jour/créée
                    let updatedReference;
                    if (isUpdate && initialData?.id) {
                        updatedReference = references.find((ref: IPartner) => ref.id === initialData.id);
                    } else {
                        // Pour une création, prendre la dernière référence (plus récente)
                        updatedReference = references[0]; // Assuming they're sorted by newest first
                    }

                    if (updatedReference) {
                        onSuccess(updatedReference);
                    } else {
                        // Fallback: callback avec toutes les références
                        onSuccess(response.data);
                    }
                } catch (refreshError) {
                    console.warn('Erreur lors du rafraîchissement des données:', refreshError);
                    // En cas d'erreur de rafraîchissement, utiliser les données de la réponse
                    onSuccess(response.data);
                }
            }

            // Réinitialiser le formulaire et fermer
            setData({
                name: '',
                tag: '',
                is_active: true,
                is_reference: true,
            });
            setFile(null);
            setPreviewUrl(null);
            setTags([]);
            closeDrawer?.();
        } catch (error: any) {
            console.error('Erreur lors de la sauvegarde:', error);

            if (error.response?.status === 422) {
                // Erreurs de validation
                const validationErrors = error.response.data.errors || {};
                setErrors(validationErrors);

                const firstError = Object.values(validationErrors)[0] as string[];
                if (firstError && firstError[0]) {
                    toast.error(firstError[0]);
                }
            } else {
                toast.error('Erreur lors de la sauvegarde. Veuillez réessayer.');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="mx-auto">
            {/* En-tête du formulaire avec description */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <Building2 className="h-6 w-6 text-teal-600 mt-0.5" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {initialData?.id ? 'Modifier une référence' : 'Ajouter une nouvelle référence'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {initialData?.id
                                ? 'Mettez à jour les informations de votre partenaire ou référence client.'
                                : 'Ajoutez un nouveau partenaire ou référence client avec son logo, ses informations et ses tags pour une meilleure organisation.'}
                        </p>
                    </div>
                </div>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            {t('Name', 'Nom du partenaire')}
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Le nom officiel de votre partenaire ou client (ex: "ACME Corporation")</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="name"
                        required
                        value={data.name}
                        onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        disabled={processing}
                        placeholder="Ex: ACME Corporation, Google, Microsoft..."
                        className="transition-all focus:ring-2 focus:ring-teal-500"
                    />
                    <InputError message={errors.name?.[0]} />
                </div>
                <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="tag" className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-gray-500" />
                            Tags
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Organisez vos partenaires par catégories (ex: client, fournisseur, partenaire technologique). Séparez les tags par
                                    des points-virgules.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <TagInput tags={tags} onChange={setTags} placeholder="Ex: client;partenaire;fournisseur" />
                    <InputError message={errors.tag?.[0]} />
                    <p className="text-xs text-gray-500">
                        💡 Utilisez des tags pour organiser vos partenaires par secteur, type de collaboration, etc.
                    </p>
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="picture" className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-gray-500" />
                            Logo/Image
                            <span className="text-sm text-gray-500">(optionnel)</span>
                        </Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajoutez le logo de votre partenaire pour une meilleure présentation. Formats supportés: JPEG, PNG, SVG.</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Aperçu de l'image actuelle ou nouvelle */}
                    {(previewUrl || file) && (
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <div className="w-full h-full border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Aperçu" className="w-full h-full object-contain p-2" />
                                ) : previewUrl ? (
                                    <img src={previewUrl} alt="Image actuelle" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                        <ImageOff className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFile(null);
                                            if (!initialData?.media?.src) {
                                                setPreviewUrl(null);
                                            }
                                        }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimer cette image</p>
                                </TooltipContent>
                            </Tooltip>
                            {file && (
                                <div className="absolute -bottom-8 left-0 right-0 text-center">
                                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">✓ Nouvelle image sélectionnée</span>
                                </div>
                            )}
                        </div>
                    )}

                    <InputFile
                        id="picture"
                        onFilesChange={(files) => {
                            if (files && files.length > 0) {
                                const selectedFile = files[0];

                                // Validation locale
                                const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
                                if (!validTypes.includes(selectedFile.type)) {
                                    toast.error('Le fichier doit être une image (JPEG, PNG, JPG, GIF, SVG)');
                                    return;
                                }

                                if (selectedFile.size > 2048 * 1024) {
                                    // 2MB
                                    toast.error("L'image ne doit pas dépasser 2 Mo");
                                    return;
                                }

                                setFile(selectedFile);
                            } else {
                                setFile(null);
                            }
                        }}
                        accept="image/*"
                        multiple={false}
                        disabled={processing}
                    />
                    <InputError message={errors.picture?.[0]} />
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <ImageIcon className="h-3 w-3" />
                        Formats supportés: JPEG, PNG, JPG, GIF, SVG. Taille maximale: 2 Mo.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white transition-all duration-200 shadow-sm hover:shadow-md"
                    disabled={processing}
                >
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {processing
                        ? t('Saving', 'Sauvegarde...')
                        : initialData?.id
                          ? t('Update', 'Mettre à jour la référence')
                          : t('Create', 'Créer la référence')}
                </Button>
            </form>
        </div>
    );
}
