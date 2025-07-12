import AppLayout from '@/layouts/dashboard/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/text-area';
import { useTranslation } from 'react-i18next';

export default function NewsletterIndex() {
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('dashboard.newsletter.send'), { subject, content });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Newsletters', href: '/dashboard/newsletters' }]}>
            <Head title="Newsletters" />
            <form onSubmit={submit} className="flex flex-col gap-4 p-4 max-w-xl">
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
