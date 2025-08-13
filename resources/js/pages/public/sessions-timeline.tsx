import { Head } from '@inertiajs/react';
import { Calendar, Clock, MapPin, BookOpen, Filter, Search, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { ICourseSession } from '@/types/course';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DefaultLayout from '@/layouts/public/front.layout';
import CourseInscriptionDialog from '@/components/courses/detail/partial/CourseInscriptionDialog';

interface SessionsTimelineProps {
    sessions: ICourseSession[];
}

const SessionsTimeline = ({ sessions }: SessionsTimelineProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('all');
    const [selectedSession, setSelectedSession] = useState<ICourseSession | null>(null);
    const [isInscriptionDialogOpen, setIsInscriptionDialogOpen] = useState(false);

    // Filter and search sessions
    const filteredSessions = useMemo(() => {
        let filtered = sessions;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(session =>
                session.course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                session.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply date filter
        const now = new Date();
        switch (selectedFilter) {
            case 'upcoming':
                filtered = filtered.filter(session => new Date(session.start_date) >= now);
                break;
            case 'past':
                filtered = filtered.filter(session => new Date(session.start_date) < now);
                break;
            default:
                break;
        }

        return filtered;
    }, [sessions, searchTerm, selectedFilter]);

    // Group sessions by date
    const groupedSessions = useMemo(() => {
        const groups: { [key: string]: ICourseSession[] } = {};

        filteredSessions.forEach(session => {
            const date = new Date(session.start_date).toISOString().split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(session);
        });

        // Convert to array and sort by date
        return Object.entries(groups)
            .map(([date, sessions]) => ({
                date,
                sessions: sessions.sort((a, b) => 
                    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
                ),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [filteredSessions]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) >= new Date();
    };

    const getStatusBadge = (session: ICourseSession) => {
        const now = new Date();
        const startDate = new Date(session.start_date);
        const endDate = session.end_date ? new Date(session.end_date) : null;

        if (endDate && now > endDate) {
            return <Badge variant="secondary" className="text-xs">Terminée</Badge>;
        } else if (now >= startDate && (!endDate || now <= endDate)) {
            return <Badge className="bg-green-500 text-xs">En cours</Badge>;
        } else if (startDate > now) {
            return <Badge className="bg-blue-500 text-xs">À venir</Badge>;
        }
        return null;
    };

    const handleInscriptionClick = (session: ICourseSession) => {
        setSelectedSession(session);
        setIsInscriptionDialogOpen(true);
    };

    return (
        <DefaultLayout>
            <Head title="Timeline des Sessions de Formation" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                                Timeline des Sessions
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Découvrez toutes les sessions de formation programmées et planifiez votre parcours d'apprentissage
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Layout */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex gap-8">
                        {/* Sticky Sidebar */}
                        <div className="w-80 flex-shrink-0">
                            <div className="sticky top-8">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-emerald-600" />
                                        Filtres et Recherche
                                    </h2>
                                    
                                    {/* Search */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Recherche
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <Input
                                                type="text"
                                                placeholder="Formation, lieu..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Filter buttons */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Période
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                { key: 'all', label: 'Toutes les sessions' },
                                                { key: 'upcoming', label: 'Sessions à venir' },
                                                { key: 'past', label: 'Sessions passées' }
                                            ].map((filter) => (
                                                <Button
                                                    key={filter.key}
                                                    variant={selectedFilter === filter.key ? "default" : "outline"}
                                                    onClick={() => setSelectedFilter(filter.key as any)}
                                                    className={`w-full justify-start h-11 ${
                                                        selectedFilter === filter.key 
                                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                                            : 'hover:bg-emerald-50 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                                    }`}
                                                >
                                                    <Filter className="w-4 h-4 mr-2" />
                                                    {filter.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Statistiques
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border dark:border-emerald-800">
                                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                    {filteredSessions.filter(s => isUpcoming(s.start_date)).length}
                                                </div>
                                                <div className="text-sm text-emerald-700 dark:text-emerald-300">Sessions à venir</div>
                                            </div>
                                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border dark:border-blue-800">
                                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                    {filteredSessions.length}
                                                </div>
                                                <div className="text-sm text-blue-700 dark:text-blue-300">Total sessions</div>
                                            </div>
                                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border dark:border-purple-800">
                                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                    {new Set(filteredSessions.map(s => s.course?.id)).size}
                                                </div>
                                                <div className="text-sm text-purple-700 dark:text-purple-300">Formations distinctes</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">

                            {/* Timeline */}
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500" />

                                {/* Timeline content */}
                                <div className="space-y-12">
                                    {groupedSessions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Calendar className="w-12 h-12 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                                Aucune session trouvée
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Essayez de modifier vos critères de recherche ou filtres
                                            </p>
                                        </div>
                                    ) : (
                                        groupedSessions.map((group) => (
                                            <div key={group.date} className="relative">
                                                {/* Date header */}
                                                <div className="flex items-center mb-6">
                                                    <div className="absolute left-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-900 shadow-md" />
                                                    <div className="ml-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-6 py-3 border dark:border-gray-700">
                                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                                                            {formatDate(group.date)}
                                                        </h2>
                                                    </div>
                                                </div>

                                                {/* Sessions for this date */}
                                                <div className="ml-16 space-y-4">
                                                    {group.sessions.map((session) => (
                                                        <div 
                                                            key={session.id}
                                                            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border dark:border-gray-700 ${
                                                                isUpcoming(session.start_date) 
                                                                    ? 'border-l-4 border-emerald-500' 
                                                                    : 'border-l-4 border-gray-300 dark:border-gray-600'
                                                            }`}
                                                        >
                                                            <div className="p-6">
                                                                <div className="flex items-start justify-between mb-4">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                                {session.course?.title || 'Formation'}
                                                                            </h3>
                                                                            {getStatusBadge(session)}
                                                                        </div>
                                                                        
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                                                            <div className="flex items-center gap-2">
                                                                                <Clock className="w-4 h-4 text-emerald-500" />
                                                                                <span>
                                                                                    {formatTime(session.start_date)}
                                                                                    {session.end_date && ` - ${formatTime(session.end_date)}`}
                                                                                </span>
                                                                            </div>
                                                                            
                                                                            <div className="flex items-center gap-2">
                                                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                                                <span>{session.location}</span>
                                                                            </div>
                                                                            
                                                                            <div className="flex items-center gap-2">
                                                                                <BookOpen className="w-4 h-4 text-orange-500" />
                                                                                <span>{session.course?.duration || 'N/A'} jours</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {isUpcoming(session.start_date) && (
                                                                        <Button 
                                                                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                                                            onClick={() => handleInscriptionClick(session)}
                                                                        >
                                                                            <span>S'inscrire</span>
                                                                            <ChevronRight className="w-4 h-4 ml-2" />
                                                                        </Button>
                                                                    )}
                                                                </div>

                                                                {session.course?.excerpt && (
                                                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                                                        {session.course.excerpt}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inscription Dialog */}
            {selectedSession && selectedSession.course && (
                <CourseInscriptionDialog
                    course={selectedSession.course}
                    session={selectedSession}
                    isOpen={isInscriptionDialogOpen}
                    onOpenChange={setIsInscriptionDialogOpen}
                />
            )}
        </DefaultLayout>
    );
};

export default SessionsTimeline;