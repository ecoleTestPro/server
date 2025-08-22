import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { InputFile } from '@/components/ui/inputFile';
import { Label } from '@/components/ui/label';
import TagInput from '@/components/ui/tag-input';
import { IPartner } from '@/types/partner';
import { getMediaUrl } from '@/utils/utils';
import { ImageOff, X, Loader2 } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface ReferenceFormProps {
    closeDrawer?: () => void;
    initialData?: IPartner;
}

interface ReferenceFormData {
    name: string;
    link?: string;
    tag?: string;
    is_active: boolean;
    is_reference: boolean;
    picture?: File;
    [key: string]: any;
}


export default function ReferenceForm({ closeDrawer, initialData }: ReferenceFormProps) {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [data, setData] = useState<ReferenceFormData>({
        name: initialData?.name || '',
        link: initialData?.link || '',
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
        setData(prevData => ({ ...prevData, tag: tags.join(';') }));
    }, [tags]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            // Préparer FormData pour l'envoi avec fichier
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('link', data.link || '');
            formData.append('tag', data.tag || '');
            formData.append('is_reference', '1');
            formData.append('is_active', data.is_active ? '1' : '0');

            // Ajouter le fichier s'il existe
            if (file) {
                formData.append('picture', file);
            }

            // Déterminer l'URL et la méthode
            const isUpdate = initialData?.id;
            const url = isUpdate 
                ? route('dashboard.references.update', initialData.id)
                : route('dashboard.references.store');

            // Effectuer la requête
            const response = isUpdate 
                ? await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-HTTP-Method-Override': 'PUT'
                    }
                })
                : await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            // Succès
            toast.success(
                isUpdate 
                    ? t('references.updated', 'Référence mise à jour !') 
                    : t('references.created', 'Référence créée !')
            );

            // Réinitialiser le formulaire et fermer
            setData({
                name: '',
                link: '',
                tag: '',
                is_active: true,
                is_reference: true,
            });
            setFile(null);
            setPreviewUrl(null);
            setTags([]);
            closeDrawer?.();

            // Recharger la page pour voir les changements
            window.location.reload();

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
        <form className="mx-auto flex flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="name">{t('Name', 'Nom')}</Label>
                <Input 
                    id="name" 
                    required 
                    value={data.name} 
                    onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))} 
                    disabled={processing} 
                />
                <InputError message={errors.name?.[0]} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="link">{t('Link', 'Lien')} <span className="text-sm text-gray-500">(optionnel)</span></Label>
                <Input 
                    id="link" 
                    type="url"
                    value={data.link || ''} 
                    onChange={(e) => setData(prev => ({ ...prev, link: e.target.value }))} 
                    disabled={processing}
                    placeholder="https://example.com"
                />
                <InputError message={errors.link?.[0]} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="tag">Tag</Label>
                <TagInput tags={tags} onChange={setTags} placeholder="tag1;tag2" />
                <InputError message={errors.tag?.[0]} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="picture">{t('Image')} <span className="text-sm text-gray-500">(optionnel)</span></Label>
                
                {/* Aperçu de l'image actuelle ou nouvelle */}
                {(previewUrl || file) && (
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="w-full h-full border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            {file ? (
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt="Aperçu" 
                                    className="w-full h-full object-contain p-2"
                                />
                            ) : previewUrl ? (
                                <img 
                                    src={previewUrl} 
                                    alt="Image actuelle" 
                                    className="w-full h-full object-contain p-2"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <ImageOff className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                        </div>
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
                        {file && (
                            <div className="absolute -bottom-8 left-0 right-0 text-center">
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Nouvelle image sélectionnée
                                </span>
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
                            
                            if (selectedFile.size > 2048 * 1024) { // 2MB
                                toast.error('L\'image ne doit pas dépasser 2 Mo');
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
                <p className="text-xs text-gray-500">
                    Formats supportés: JPEG, PNG, JPG, GIF, SVG. Taille maximale: 2 Mo.
                </p>
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {processing 
                    ? t('Saving', 'Sauvegarde...') 
                    : initialData?.id 
                        ? t('Update', 'Mettre à jour') 
                        : t('Create', 'Créer')
                }
            </Button>
        </form>
    );
}
