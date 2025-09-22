import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/dashboard/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { ICourse, ICourseCategory } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, CheckCircle, Eye, ExternalLink, HelpCircle, Mail, MessageSquare, Reply, Search, Trash2, User, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard.index'),
    },
    {
        title: 'Questions sur les cours',
        href: route('dashboard.course-questions.index'),
    },
];

interface CourseQuestion {
    id: number;
    course_id: number;
    civility: string;
    first_name: string;
    last_name: string;
    company?: string;
    email: string;
    phone?: string;
    message: string;
    accepts_privacy_policy: boolean;
    is_answered: boolean;
    admin_response?: string;
    answered_at?: string;
    created_at: string;
    course: ICourse;
}

interface QuestionsData {
    data: CourseQuestion[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

export default function CourseQuestionsIndex() {
    const { t } = useTranslation();
    const { data } = usePage<SharedData>().props;

    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionsData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [courseFilter, setCourseFilter] = useState<string>('all');
    const [selectedQuestion, setSelectedQuestion] = useState<CourseQuestion | null>(null);
    const [adminResponse, setAdminResponse] = useState('');
    const [isAnswering, setIsAnswering] = useState(false);

    const fetchQuestions = async (page = 1) => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
            });

            if (statusFilter !== 'all') {
                params.append('is_answered', statusFilter === 'answered' ? '1' : '0');
            }

            if (courseFilter !== 'all') {
                params.append('course_id', courseFilter);
            }

            const response = await axios.get(`${route('dashboard.course-questions.index')}?${params}`);
            
            if (response.data.success) {
                setQuestions(response.data.data);
                Logger.log('Questions fetched successfully', response.data.data);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            toast.error('Erreur lors du chargement des questions');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerQuestion = async (questionId: number) => {
        if (!adminResponse.trim()) {
            toast.error('Veuillez saisir une réponse');
            return;
        }

        setIsAnswering(true);
        try {
            const response = await axios.post(route('dashboard.course-questions.answer', questionId), {
                admin_response: adminResponse,
            });

            if (response.data.success) {
                toast.success('Réponse ajoutée avec succès');
                setSelectedQuestion(null);
                setAdminResponse('');
                fetchQuestions(questions?.current_page || 1);
            }
        } catch (error: any) {
            console.error('Error answering question:', error);
            if (error.response?.data?.errors) {
                const errorMessage = Object.values(error.response.data.errors).flat().join(' ');
                toast.error(errorMessage);
            } else {
                toast.error('Erreur lors de la sauvegarde de la réponse');
            }
        } finally {
            setIsAnswering(false);
        }
    };

    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {
            return;
        }

        try {
            const response = await axios.delete(route('dashboard.course-questions.delete', questionId));
            
            if (response.data.success) {
                toast.success('Question supprimée avec succès');
                fetchQuestions(questions?.current_page || 1);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error('Erreur lors de la suppression');
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [statusFilter, courseFilter]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('fr-FR');
    };

    const getStatusBadge = (question: CourseQuestion) => {
        if (question.is_answered) {
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Répondue
                </Badge>
            );
        }
        return (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                <XCircle className="w-3 h-3 mr-1" />
                En attente
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Questions sur les cours" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700">
                    {/* Header */}
                    <div className="p-6 border-b dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <HelpCircle className="w-4 h-4 text-white" />
                                    </div>
                                    Questions sur les cours
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                    Gérez toutes les questions posées par les visiteurs sur vos formations
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-emerald-600">
                                    {questions?.total || 0}
                                </div>
                                <div className="text-sm text-gray-500">Question{(questions?.total || 0) > 1 ? 's' : ''} au total</div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="p-6 border-b dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Label className="text-sm font-medium">Rechercher</Label>
                                <div className="relative mt-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Rechercher par nom, email ou formation..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full sm:w-48">
                                <Label className="text-sm font-medium">Statut</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les questions</SelectItem>
                                        <SelectItem value="unanswered">En attente</SelectItem>
                                        <SelectItem value="answered">Répondues</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
                                <span className="ml-2">Chargement des questions...</span>
                            </div>
                        ) : !questions || questions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Aucune question
                                </h3>
                                <p className="text-gray-500">
                                    Aucune question n'a encore été posée sur vos formations.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {questions.data.map((question) => (
                                    <div
                                        key={question.id}
                                        className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                                        {question.civility} {question.first_name} {question.last_name}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {question.email}
                                                        </span>
                                                        {question.company && (
                                                            <span>• {question.company}</span>
                                                        )}
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {formatDate(question.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(question)}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-emerald-600" />
                                                <span className="font-medium text-emerald-600">Formation concernée:</span>
                                                <a
                                                    href={`/formations/${question.course.category?.slug}/${question.course.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
                                                >
                                                    {question.course.title}
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                                {question.message}
                                            </p>
                                        </div>

                                        {question.is_answered && question.admin_response && (
                                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Reply className="w-4 h-4 text-green-600" />
                                                    <span className="font-medium text-green-700 dark:text-green-300">
                                                        Réponse (le {formatDate(question.answered_at!)})
                                                    </span>
                                                </div>
                                                <p className="text-green-800 dark:text-green-200">
                                                    {question.admin_response}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-end gap-2 pt-2 border-t dark:border-gray-700">
                                            {!question.is_answered && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => setSelectedQuestion(question)}
                                                    className="bg-emerald-600 hover:bg-emerald-700"
                                                >
                                                    <Reply className="w-4 h-4 mr-1" />
                                                    Répondre
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteQuestion(question.id)}
                                                className="text-red-600 border-red-200 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {questions && questions.last_page > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: questions.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            size="sm"
                                            variant={page === questions.current_page ? 'default' : 'outline'}
                                            onClick={() => fetchQuestions(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Answer Dialog */}
            {selectedQuestion && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Reply className="w-5 h-5 text-emerald-600" />
                                Répondre à la question
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                Formation: {selectedQuestion.course.title}
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="mb-4">
                                <Label className="text-sm font-medium">Question de {selectedQuestion.first_name} {selectedQuestion.last_name}</Label>
                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    {selectedQuestion.message}
                                </div>
                            </div>

                            <div className="mb-6">
                                <Label className="text-sm font-medium">Votre réponse</Label>
                                <Textarea
                                    value={adminResponse}
                                    onChange={(e) => setAdminResponse(e.target.value)}
                                    placeholder="Saisissez votre réponse..."
                                    rows={6}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedQuestion(null);
                                        setAdminResponse('');
                                    }}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    onClick={() => handleAnswerQuestion(selectedQuestion.id)}
                                    disabled={isAnswering || !adminResponse.trim()}
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                >
                                    {isAnswering ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                                            Envoi...
                                        </>
                                    ) : (
                                        <>
                                            <Reply className="w-4 h-4 mr-2" />
                                            Envoyer la réponse
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}