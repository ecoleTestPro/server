import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IJobOffer } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import RichTextQuill from '../ui/form/RichTextQuill';
import SelectCustom, { ISelectItem } from '../ui/select-custom';

interface Props {
    closeDrawer?: () => void;
    initialData?: IJobOffer;
}

const defaultValues: IJobOffer = {
    title: '',
    company: '',
    location: '',
    type: '',
    salary: 0,
    description: '',
    expires_at: '',
    is_active: true,
};

export default function JobOfferForm({ closeDrawer, initialData }: Props) {
    const { data, setData, processing, errors, reset } = useForm<IJobOffer>(initialData || defaultValues);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const routeUrl = initialData?.id ? route('dashboard.job-offers.update', initialData.id) : route('dashboard.job-offers.store');

        router.visit(routeUrl, {
            method: initialData?.id ? 'put' : 'post',
            data: {
                ...data,
                is_active: data.is_active ? '1' : '0',
            },
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                closeDrawer?.();
            },
        });
    };

    const typeList = (): ISelectItem[] => [
        { value: 'CDI', title: 'CDI', id: 1 },
        { value: 'CDD', title: 'CDD', id: 2 },
        { value: 'Alternance', title: 'Alternance', id: 3 },
        { value: 'Stage', title: 'Stage', id: 4 },
        { value: 'Freelance', title: 'Freelance', id: 5 },
        { value: 'Consultant', title: 'Consultant', id: 6 },
        { value: 'Autre', title: 'Autre', id: 7 },
        { value: 'Indépendant', title: 'Indépendant', id: 8 },
        { value: 'Volontariat', title: 'Volontariat', id: 9 },
        // { value: 'Bénévolat', title: 'Bénévolat', id: 10 },
        { value: "Stage de fin d'études", title: "Stage de fin d'études", id: 11 },
        { value: 'Stage de découverte', title: 'Stage de découverte', id: 12 },
    ];

    return (
        <form className="mx-auto flex flex-col gap-4" onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" required value={data.title} onChange={(e) => setData('title', e.target.value)} disabled={processing} />
                <InputError message={errors.title} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} disabled={processing} />
                    <InputError message={errors.company} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input id="location" value={data.location} onChange={(e) => setData('location', e.target.value)} disabled={processing} />
                    <InputError message={errors.location} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="type">Type (CDI, CDD, Stage) </Label>
                    <SelectCustom
                        data={typeList()}
                        selectLabel={"Type d'offre"}
                        disabled={processing}
                        processing={processing}
                        onValueChange={(value) => setData('type', value)}
                        value={data.type}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="salary">Salaire</Label>
                    <Input
                        id="salary"
                        type="number"
                        value={data.salary || ''}
                        onChange={(e) => setData('salary', Number(e.target.value))}
                        disabled={processing}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="expires_at">Date de fin</Label>
                <Input
                    id="expires_at"
                    type="date"
                    value={data.expires_at || ''}
                    onChange={(e) => setData('expires_at', e.target.value)}
                    disabled={processing}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <RichTextQuill
                    label="Description"
                    labelId="description"
                    value={data.description ?? ''}
                    setData={(value: string) => setData('description', value)}
                />
            </div>
            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                {initialData?.id ? 'Mettre à jour' : 'Créer'}
            </Button>
        </form>
    );
}
