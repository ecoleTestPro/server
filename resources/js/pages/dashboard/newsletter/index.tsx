import AppLayout from '@/layouts/dashboard/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import { useTranslation } from 'react-i18next';
import { INewsletterTemplate } from '@/types/newsletterTemplate';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NewsletterIndex() {
    const { t } = useTranslation();
    const { data } = usePage<{ data: { templates: INewsletterTemplate[] } }>().props;

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [templates, setTemplates] = useState<INewsletterTemplate[]>([]);
    const [templateId, setTemplateId] = useState<string>('');

    useEffect(() => {
        if (data && Array.isArray(data.templates)) {
            setTemplates(data.templates);
        }
    }, [data]);

    useEffect(() => {
        const tpl = templates.find((t) => t.id?.toString() === templateId);
        if (tpl) {
            setSubject(tpl.subject);
            setContent(tpl.content);
        }
    }, [templateId, templates]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('dashboard.newsletters.send'), { subject, content });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Newsletters', href: '/dashboard/newsletters' }]}>
            <Head title="Newsletters" />
            <form onSubmit={submit} className="flex flex-col gap-4 p-4 max-w-xl">
                {templates.length > 0 && (
                    <Select value={templateId} onValueChange={setTemplateId}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('Choose template', 'Choisir un template')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {templates.map((tpl) => (
                                    <SelectItem key={tpl.id} value={tpl.id!.toString()}>
                                        {tpl.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
                <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={t('Subject', 'Sujet')}
                    required
                />
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={t('Content', 'Contenu')}
                    required
                />
                <Button type="submit">{t('Send', 'Envoyer')}</Button>
            </form>
        </AppLayout>
    );
}
