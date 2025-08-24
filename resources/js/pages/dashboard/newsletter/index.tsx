import AppLayout from '@/layouts/dashboard/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { INewsletterTemplate } from '@/types/newsletterTemplate';
import { INewsletterAnalytics, INewsletterLog } from '@/types/newsletter';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/dataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Mail, Users, Send, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';

// Fonction de formatage simple pour éviter la dépendance date-fns
const formatDate = (dateString: string, formatStr?: string) => {
    const date = new Date(dateString);
    if (formatStr === 'HH:mm') {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
import RichTextQuill from '@/components/ui/form/RichTextQuill';
import 'react-quill/dist/quill.snow.css';
import { Logger } from '@/utils/console.util';

export default function NewsletterIndex() {
    const { t } = useTranslation();
    const { data } = usePage<{ data: { templates: INewsletterTemplate[] } }>().props;

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [templates, setTemplates] = useState<INewsletterTemplate[]>([]);
    const [templateId, setTemplateId] = useState<string>('');
    const [analytics, setAnalytics] = useState<INewsletterAnalytics | null>(null);
    const [logs, setLogs] = useState<INewsletterLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [activeTab, setActiveTab] = useState('compose');

    useEffect(() => {
        if (data && Array.isArray(data.templates)) {
            setTemplates(data.templates);
        }
        loadAnalytics();
    }, [data]);

    useEffect(() => {
        const tpl = templates.find((t) => t.id?.toString() === templateId);
        if (tpl) {
            setSubject(tpl.subject);
            setContent(tpl.content);
        }
    }, [templateId, templates]);

    const loadAnalytics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(route('dashboard.newsletters.analytics'));
            setAnalytics(response.data);
        } catch (error: any) {
            Logger.error('Error loading analytics:', error);
            toast.error(t('Error loading analytics', 'Erreur lors du chargement des statistiques'));
        } finally {
            setLoading(false);
        }
    };

    const loadLogs = async () => {
        try {
            const response = await axios.get(route('dashboard.newsletters.logs'));
            setLogs(response.data.data || []);
        } catch (error: any) {
            Logger.error('Error loading logs:', error);
            toast.error(t('Error loading logs', 'Erreur lors du chargement des logs'));
            setLogs([]);
        }
    };

    useEffect(() => {
        if (activeTab === 'logs') {
            loadLogs();
        }
    }, [activeTab]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        
        try {
            const response = await axios.post(route('dashboard.newsletters.send'), {
                subject,
                content
            });
            
            // Afficher le message de succès avec les statistiques
            if (response.data.stats) {
                const { success, failed, total } = response.data.stats;
                if (failed > 0) {
                    toast.error(`Newsletter envoyée avec ${failed} échec(s) sur ${total} emails`);
                } else {
                    toast.success(`Newsletter envoyée avec succès à ${success} abonné(s)`);
                }
            } else {
                toast.success(response.data.message || t('Newsletter sent successfully', 'Newsletter envoyée avec succès'));
            }
            
            // Réinitialiser le formulaire
            setSubject('');
            setContent('');
            setTemplateId('');
            
            // Recharger les analytics et passer à l'onglet analytics
            await loadAnalytics();
            setActiveTab('analytics');
            
        } catch (error: any) {
            Logger.error('Error sending newsletter:', error);
            
            // Gestion des erreurs détaillée
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.response?.status === 400) {
                toast.error(t('No subscribers found', 'Aucun abonné trouvé'));
            } else if (error.response?.status === 422) {
                // Erreurs de validation
                const errors = error.response.data.errors;
                if (errors) {
                    Object.values(errors).flat().forEach((err: any) => {
                        toast.error(err);
                    });
                } else {
                    toast.error(t('Validation error', 'Erreur de validation'));
                }
            } else {
                toast.error(t('Error sending newsletter', 'Erreur lors de l\'envoi de la newsletter'));
            }
        } finally {
            setSending(false);
        }
    };

    // Colonnes pour le tableau des logs
    const logColumns: ColumnDef<INewsletterLog>[] = [
        {
            accessorKey: 'email',
            header: t('Email'),
        },
        {
            accessorKey: 'subject',
            header: t('Subject', 'Sujet'),
            cell: ({ row }) => (
                <div className="max-w-[200px] truncate" title={row.original.subject}>
                    {row.original.subject}
                </div>
            ),
        },
        {
            accessorKey: 'is_sent',
            header: t('Status', 'Statut'),
            cell: ({ row }) => {
                const log = row.original;
                if (log.is_sent) {
                    return (
                        <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t('Sent', 'Envoyé')}
                        </Badge>
                    );
                } else if (log.error) {
                    return (
                        <Badge variant="destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {t('Failed', 'Échoué')}
                        </Badge>
                    );
                } else {
                    return (
                        <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {t('Pending', 'En attente')}
                        </Badge>
                    );
                }
            },
        },
        {
            accessorKey: 'sent_at',
            header: t('Sent at', 'Envoyé le'),
            cell: ({ row }) => {
                const sentAt = row.original.sent_at;
                if (!sentAt) return '-';
                return formatDate(sentAt);
            },
        },
        {
            accessorKey: 'error',
            header: t('Error', 'Erreur'),
            cell: ({ row }) => {
                const error = row.original.error;
                if (!error) return '-';
                return (
                    <div className="max-w-[200px] truncate text-red-600" title={error}>
                        {error}
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={[{ title: 'Newsletters', href: '/dashboard/newsletters' }]}>
            <Head title="Newsletter Dashboard" />
            
            <div className="space-y-6 p-6">
                {/* Header with title and stats overview */}
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t('Newsletter Dashboard')}</h1>
                        <p className="text-muted-foreground">
                            {t('Manage your newsletter campaigns and track performance', 'Gérez vos campagnes newsletter et suivez les performances')}
                        </p>
                    </div>
                    
                    {analytics && (
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">{analytics.stats.total_subscribers}</span>
                                <span className="text-muted-foreground">{t('subscribers', 'abonnés')}</span>
                            </div>
                        </div>
                    )}
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="compose" className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{t('Compose', 'Rédiger')}</span>
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>{t('Analytics', 'Analytiques')}</span>
                        </TabsTrigger>
                        <TabsTrigger value="logs" className="flex items-center space-x-2">
                            <Send className="h-4 w-4" />
                            <span>{t('Sending Logs', 'Logs d\'envoi')}</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Compose Tab */}
                    <TabsContent value="compose" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('Compose Newsletter', 'Rédiger une Newsletter')}</CardTitle>
                                <CardDescription>
                                    {t('Create and send newsletter to all subscribers', 'Créer et envoyer une newsletter à tous les abonnés')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    {templates.length > 0 && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('Template', 'Modèle')}</label>
                                            <Select value={templateId} onValueChange={setTemplateId}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={t('Choose template', 'Choisir un modèle')} />
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
                                        </div>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('Subject', 'Sujet')}</label>
                                        <Input
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            placeholder={t('Enter email subject', 'Saisissez le sujet de l\'email')}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('Content', 'Contenu')}</label>
                                        <RichTextQuill
                                            label={t('Content', 'Contenu')}
                                            labelId="newsletter-content"
                                            value={content}
                                            setData={setContent}
                                            className="min-h-[300px]"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            {false && analytics && (
                                                <span>
                                                    {t('Will be sent to {{count}} subscribers', {
                                                        count: analytics.stats.total_subscribers
                                                    })}
                                                </span>
                                            )}
                                        </div>
                                        <Button type="submit" disabled={sending || !subject || !content}>
                                            {sending ? (
                                                <>
                                                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                                                    {t('Sending...', 'Envoi en cours...')}
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-4 w-4" />
                                                    {t('Send Newsletter', 'Envoyer la Newsletter')}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-32">
                                <Clock className="h-6 w-6 animate-spin" />
                            </div>
                        ) : analytics ? (
                            <>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">{t('Total Subscribers', 'Total Abonnés')}</CardTitle>
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{analytics.stats.total_subscribers}</div>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">{t('Successfully Sent', 'Envoyés avec succès')}</CardTitle>
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-green-600">{analytics.stats.total_sent}</div>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">{t('Failed Sends', 'Échecs d\'envoi')}</CardTitle>
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-red-600">{analytics.stats.total_failed}</div>
                                        </CardContent>
                                    </Card>
                                    
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">{t('Pending', 'En attente')}</CardTitle>
                                            <Clock className="h-4 w-4 text-orange-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-orange-600">{analytics.stats.total_pending}</div>
                                        </CardContent>
                                    </Card>
                                </div>
                                
                                {analytics.recent_logs.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{t('Recent Activity', 'Activité Récente')}</CardTitle>
                                            <CardDescription>
                                                {t('Latest newsletter sending attempts', 'Dernières tentatives d\'envoi de newsletter')}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {analytics.recent_logs.slice(0, 5).map((log) => (
                                                    <div key={log.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                                                        <div className="flex items-center space-x-3">
                                                            {log.is_sent ? (
                                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                            ) : log.error ? (
                                                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                                            ) : (
                                                                <Clock className="h-4 w-4 text-orange-500" />
                                                            )}
                                                            <div>
                                                                <p className="text-sm font-medium">{log.email}</p>
                                                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                                    {log.subject}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {log.sent_at ? formatDate(log.sent_at, 'HH:mm') : 
                                                             log.created_at ? formatDate(log.created_at, 'HH:mm') : ''}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </>
                        ) : (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-center text-muted-foreground">
                                        {t('No analytics data available', 'Aucune donnée analytique disponible')}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    {/* Logs Tab */}
                    <TabsContent value="logs" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{t('Sending Logs', 'Logs d\'Envoi')}</CardTitle>
                                        <CardDescription>
                                            {t('Detailed logs of all newsletter sending attempts', 'Logs détaillés de toutes les tentatives d\'envoi de newsletter')}
                                        </CardDescription>
                                    </div>
                                    <Button onClick={loadLogs} variant="outline" size="sm">
                                        {t('Refresh', 'Actualiser')}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {logs.length > 0 ? (
                                    <DataTable 
                                        columns={logColumns} 
                                        data={logs} 
                                        filterColumn="email"
                                        filterPlaceholder={t('Filter by email...', 'Filtrer par email...')}
                                        showSearch={true}
                                        showColumnToggle={true}
                                    />
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Send className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>{t('No sending logs found', 'Aucun log d\'envoi trouvé')}</p>
                                        <p className="text-sm">{t('Logs will appear here after sending newsletters', 'Les logs apparaîtront ici après l\'envoi de newsletters')}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}