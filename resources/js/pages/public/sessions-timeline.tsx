import CourseInscriptionDialog from '@/components/courses/detail/partial/CourseInscriptionDialog';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import DefaultLayout from '@/layouts/public/front.layout';
import { ICourseSession } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Head } from '@inertiajs/react';
import { BookOpen, Calendar, ChevronDown, ChevronRight, Clock, Filter, MapPin, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

interface SessionsTimelineProps {
    sessions: ICourseSession[];
}

const SessionsTimeline = ({ sessions }: SessionsTimelineProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('all');
    const [selectedSession, setSelectedSession] = useState<ICourseSession | null>(null);
    const [isInscriptionDialogOpen, setIsInscriptionDialogOpen] = useState(false);
    const [activeDate, setActiveDate] = useState<string | null>(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Refs pour la navigation par dates
    const dateRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Filter and search sessions
    const filteredSessions = useMemo(() => {
        let filtered = sessions;

        // Filter out sessions with incomplete course data
        filtered = filtered.filter((session) => {
            return (
                session.course && // Course must exist
                session.course.title && // Course must have a title
                session.course.title.trim() !== '' && // Title must not be empty
                session.course.duration && // Course must have duration
                session.course.duration > 0 // Duration must be positive
            );
        });

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (session) =>
                    session.course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    session.location.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        // Apply date filter
        const now = new Date();
        switch (selectedFilter) {
            case 'upcoming':
                filtered = filtered.filter((session) => new Date(session.start_date) >= now);
                break;
            case 'past':
                filtered = filtered.filter((session) => new Date(session.start_date) < now);
                break;
            default:
                break;
        }

        return filtered;
    }, [sessions, searchTerm, selectedFilter]);

    // Group sessions by date
    const groupedSessions = useMemo(() => {
        const groups: { [key: string]: ICourseSession[] } = {};

        filteredSessions.forEach((session) => {
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
                sessions: sessions.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [filteredSessions]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
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
            return (
                <Badge variant="secondary" className="text-xs">
                    Terminée
                </Badge>
            );
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

    const scrollToDate = (date: string) => {
        const element = dateRefs.current[date];
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            });
            setActiveDate(date);
        }
    };

    const formatDateShort = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
        });
    };

    const formatDateFull = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
    };

    // Effet pour définir la première date comme active par défaut
    useEffect(() => {
        if (groupedSessions.length > 0 && !activeDate) {
            setActiveDate(groupedSessions[0].date);
        }
    }, [groupedSessions, activeDate]);

    const [pageTitle, setPageTitle] = useState('Sessions de Formation');
    const breadcrumbItems: IHeroBreadcrumbItems[] = [
        { label: 'Accueil', href: ROUTE_MAP.public.home.link },
        { label: pageTitle, href: '#' },
    ];

    return (
        <DefaultLayout>
            <Head title="Sessions de Formation" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <Hero breadcrumbItems={breadcrumbItems} title={pageTitle} />

                {/* Content Layout */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Filtres Mobile Toggle */}
                        <div className="lg:hidden mb-6">
                            <Button
                                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                                variant="outline"
                                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                                    mobileFiltersOpen 
                                        ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20' 
                                        : 'border-gray-200 hover:border-emerald-200 dark:border-gray-700 dark:hover:border-emerald-700'
                                }`}
                            >
                                <span className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        mobileFiltersOpen 
                                            ? 'bg-emerald-500 text-white' 
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                    }`}>
                                        <Filter className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-semibold text-gray-900 dark:text-white">Filtres & Recherche</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {filteredSessions.length} session{filteredSessions.length > 1 ? 's' : ''} trouvée{filteredSessions.length > 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                                    mobileFiltersOpen ? 'rotate-180 text-emerald-600' : 'text-gray-400'
                                }`} />
                            </Button>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className={`w-full lg:w-80 lg:flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                            <div className="lg:sticky lg:top-10">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-emerald-600" />
                                        Filtres et Recherche
                                    </h2>

                                    {/* Search */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recherche</label>
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
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Période</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                                            {[
                                                { key: 'all', label: 'Toutes les sessions' },
                                                { key: 'upcoming', label: 'Sessions à venir' },
                                                { key: 'past', label: 'Sessions passées' },
                                            ].map((filter) => (
                                                <Button
                                                    key={filter.key}
                                                    variant={selectedFilter === filter.key ? 'default' : 'outline'}
                                                    onClick={() => {
                                                        setSelectedFilter(filter.key as any);
                                                        setMobileFiltersOpen(false);
                                                    }}
                                                    className={`w-full justify-start h-11 text-sm ${
                                                        selectedFilter === filter.key
                                                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                            : 'hover:bg-emerald-50 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                                                    }`}
                                                >
                                                    <Filter className="w-4 h-4 mr-2" />
                                                    <span className="truncate">{filter.label}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Statistiques</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                                            <div className="p-3 sm:p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border dark:border-emerald-800">
                                                <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                                    {filteredSessions.filter((s) => isUpcoming(s.start_date)).length}
                                                </div>
                                                <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">Sessions à venir</div>
                                            </div>
                                            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border dark:border-blue-800">
                                                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredSessions.length}</div>
                                                <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">Total sessions</div>
                                            </div>
                                            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border dark:border-purple-800">
                                                <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                    {new Set(filteredSessions.map((s) => s.course?.id)).size}
                                                </div>
                                                <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">Formations distinctes</div>
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
                                {/* Timeline line - cachée sur mobile pour un design plus épuré */}
                                <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500" />

                                {/* Timeline content */}
                                <div className="space-y-4 sm:space-y-6 lg:space-y-12">
                                    {groupedSessions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Calendar className="w-12 h-12 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune session trouvée</h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Essayez de modifier vos critères de recherche ou filtres
                                            </p>
                                        </div>
                                    ) : (
                                        groupedSessions.map((group) => (
                                            <div 
                                                key={group.date} 
                                                className="relative" 
                                                ref={(el) => {
                                                    dateRefs.current[group.date] = el;
                                                }}
                                            >
                                                {/* Date header */}
                                                <div className="mb-4 sm:mb-6">
                                                    {/* Mobile: Design épuré sans timeline */}
                                                    <div className="sm:hidden">
                                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 border-l-4 border-emerald-500">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                                                                        {formatDate(group.date)}
                                                                    </h2>
                                                                    <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                                                        {group.sessions.length} session{group.sessions.length > 1 ? 's' : ''} programmée{group.sessions.length > 1 ? 's' : ''}
                                                                    </p>
                                                                </div>
                                                                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                                                                    <Calendar className="w-6 h-6 text-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Desktop: Design avec timeline */}
                                                    <div className="hidden sm:flex items-center">
                                                        <div className="absolute left-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-900 shadow-md" />
                                                        <div className="ml-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-6 py-3 border dark:border-gray-700">
                                                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                                                                {formatDate(group.date)}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Sessions for this date */}
                                                <div className="sm:ml-16 space-y-3 sm:space-y-4">
                                                    {group.sessions.map((session) => (
                                                        <div
                                                            key={session.id}
                                                            className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-0 transform hover:-translate-y-1 ${
                                                                isUpcoming(session.start_date)
                                                                    ? 'ring-2 ring-emerald-100 dark:ring-emerald-900/30'
                                                                    : 'ring-1 ring-gray-200 dark:ring-gray-700'
                                                            }`}
                                                        >
                                                            {/* Badge de statut en overlay pour mobile */}
                                                            <div className="relative">
                                                                <div className={`absolute top-4 right-4 z-10 ${isUpcoming(session.start_date) ? 'block' : 'block'}`}>
                                                                    {getStatusBadge(session)}
                                                                </div>
                                                                
                                                                {/* Barre colorée en haut pour mobile */}
                                                                <div className={`h-1 w-full ${
                                                                    isUpcoming(session.start_date)
                                                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                                                        : 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                                                                }`} />
                                                                
                                                                <div className="p-4 sm:p-6">
                                                                    <div className="mb-4">
                                                                        <div className="">
                                                                            <div className="mb-3 max-w-[90%]">
                                                                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pr-20 sm:pr-0 leading-tight">
                                                                                    {session.course?.title}
                                                                                </h3>
                                                                            </div>

                                                                            {/* Informations de la session avec design moderne */}
                                                                            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                                                                                <div className="flex items-center gap-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                                                        <MapPin className="w-4 h-4 text-white" />
                                                                                    </div>
                                                                                    <div className="min-w-0">
                                                                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Lieu</p>
                                                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{session.location}</p>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                                                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                                                        <BookOpen className="w-4 h-4 text-white" />
                                                                                    </div>
                                                                                    <div className="min-w-0">
                                                                                        <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Durée</p>
                                                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{session.course?.duration} jour{Number(session.course?.duration) > 1 ? 's' : ''}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {session.course?.excerpt && (
                                                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 sm:mb-5 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg italic">
                                                                            {session.course.excerpt}
                                                                        </p>
                                                                    )}

                                                                    {isUpcoming(session.start_date) && (
                                                                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                                                                            <Button
                                                                                className="w-full group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                                                                onClick={() => handleInscriptionClick(session)}
                                                                            >
                                                                                <span>S'inscrire à cette session</span>
                                                                                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>
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

                        {/* Right Navigation Sidebar */}
                        <div className="w-full lg:w-56 lg:flex-shrink-0 order-first lg:order-last">
                            <div className="lg:sticky lg:top-10">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border dark:border-gray-700">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                        Navigation par dates
                                    </h3>

                                    {groupedSessions.length > 0 ? (
                                        <div className="lg:space-y-2 lg:overflow-y-auto lg:max-h-[calc(100vh-300px)]">
                                            {/* Mobile: horizontal scroll amélioré */}
                                            <div className="flex lg:hidden gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
                                                {groupedSessions.map((group) => {
                                                    const isActive = activeDate === group.date;
                                                    const sessionsCount = group.sessions.length;
                                                    const upcomingSessions = group.sessions.filter((s) => isUpcoming(s.start_date)).length;

                                                    return (
                                                        <button
                                                            key={group.date}
                                                            onClick={() => scrollToDate(group.date)}
                                                            className={`flex-shrink-0 w-20 h-20 p-2 rounded-2xl transition-all duration-300 text-center snap-center transform ${
                                                                isActive
                                                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                                                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200 dark:border-gray-700'
                                                            }`}
                                                        >
                                                            <div className={`text-xs font-bold mb-1 ${
                                                                isActive ? 'text-white' : 'text-gray-700 dark:text-white'
                                                            }`}>
                                                                {formatDateShort(group.date)}
                                                            </div>
                                                            
                                                            <div className={`text-lg font-bold ${
                                                                isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'
                                                            }`}>
                                                                {sessionsCount}
                                                            </div>
                                                            
                                                            <div className={`text-xs ${
                                                                isActive ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                                                            }`}>
                                                                session{sessionsCount > 1 ? 's' : ''}
                                                            </div>
                                                            
                                                            {upcomingSessions > 0 && (
                                                                <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                                                                    isActive ? 'bg-white' : 'bg-blue-500'
                                                                }`}></div>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {/* Desktop: vertical list */}
                                            <div className="hidden lg:block space-y-2">
                                                {groupedSessions.map((group) => {
                                                    const isActive = activeDate === group.date;
                                                    const sessionsCount = group.sessions.length;
                                                    const upcomingSessions = group.sessions.filter((s) => isUpcoming(s.start_date)).length;

                                                    return (
                                                        <button
                                                            key={group.date}
                                                            onClick={() => scrollToDate(group.date)}
                                                            className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                                                                isActive
                                                                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 shadow-sm'
                                                                    : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between mb-1">
                                                                <div
                                                                    className={`text-sm font-medium ${
                                                                        isActive
                                                                            ? 'text-emerald-700 dark:text-emerald-300'
                                                                            : 'text-gray-900 dark:text-white'
                                                                    }`}
                                                                >
                                                                    {formatDateFull(group.date)}
                                                                </div>
                                                                <ChevronDown
                                                                    className={`w-4 h-4 transition-transform ${
                                                                        isActive ? 'text-emerald-600 rotate-180' : 'text-gray-400'
                                                                    }`}
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span
                                                                    className={`${
                                                                        isActive
                                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                                            : 'text-gray-500 dark:text-gray-400'
                                                                    }`}
                                                                >
                                                                    {sessionsCount} session{sessionsCount > 1 ? 's' : ''}
                                                                </span>
                                                                {upcomingSessions > 0 && (
                                                                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                                                        {upcomingSessions} à venir
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Aucune date disponible</p>
                                        </div>
                                    )}

                                    {/* Navigation rapide */}
                                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Navigation rapide</h4>
                                        <div className="space-y-1">
                                            <button
                                                onClick={() => {
                                                    const upcomingGroup = groupedSessions.find((g) =>
                                                        g.sessions.some((s) => isUpcoming(s.start_date)),
                                                    );
                                                    if (upcomingGroup) scrollToDate(upcomingGroup.date);
                                                }}
                                                className="w-full text-left px-3 py-2 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                                            >
                                                Prochaine session
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (groupedSessions.length > 0) {
                                                        scrollToDate(groupedSessions[0].date);
                                                    }
                                                }}
                                                className="w-full text-left px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                                            >
                                                Première date
                                            </button>
                                        </div>
                                    </div>
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
