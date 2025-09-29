import CourseTable from '@/components/courses/list/CourseTable';
import Hero, { IHeroBreadcrumbItems } from '@/components/hero/hearo';
import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DefaultLayout from '@/layouts/public/front.layout';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Loader2, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PageProps extends SharedData {
    data: {
        courses: ICourse[];
    } & SharedData['data'];
    searchTerm: string;
}

export default function SearchPage() {
    const { t } = useTranslation();
    const { data, searchTerm } = usePage<PageProps>().props;
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [searchText, setSearchText] = useState<string>(searchTerm);
    const [loading, setLoading] = useState<boolean>(false);
    const [sortBy] = useState<'relevance' | 'date' | 'title'>('relevance');
    const [filteredCourses, setFilteredCourses] = useState<ICourse[]>([]);
    const [searchStats, setSearchStats] = useState({ total: 0, searchTime: 0 });
    const [realTimeSearch, setRealTimeSearch] = useState<boolean>(true);

    const searchStartTime = useRef<number>(0);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const breadcrumb: IHeroBreadcrumbItems[] = [
        { label: 'Home', href: ROUTE_MAP.public.home.link },
        { label: t('HEADER.SEARCH_RESULTS', 'Résultats de recherche'), href: '#' },
    ];

    useEffect(() => {
        if (data && data.courses) {
            setCourses(data.courses);
            setFilteredCourses(data.courses);
            setSearchStats({ total: data.courses.length, searchTime: 0 });
        }
    }, [data]);

    const sortCourses = useCallback((courses: ICourse[], sortType: string) => {
        const sorted = [...courses].sort((a, b) => {
            switch (sortType) {
                case 'date':
                    return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0; // relevance - keep original order
            }
        });
        return sorted;
    }, []);

    useEffect(() => {
        const sorted = sortCourses(courses, sortBy);
        setFilteredCourses(sorted);
    }, [courses, sortBy, sortCourses]);

    const performSearch = useCallback(
        (searchQuery: string) => {
            if (searchQuery.trim() === '') {
                setCourses([]);
                setFilteredCourses([]);
                setSearchStats({ total: 0, searchTime: 0 });
                return;
            }

            setLoading(true);
            searchStartTime.current = Date.now();

            axios
                .post(route('search'), { search: searchQuery })
                .then((response: { data: { search_result: { courses?: ICourse[] } } }) => {
                    const results = response.data.search_result.courses || [];
                    const searchTime = Date.now() - searchStartTime.current;

                    setCourses(results);
                    setFilteredCourses(sortCourses(results, sortBy));
                    setSearchStats({ total: results.length, searchTime });
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    setSearchStats({ total: 0, searchTime: 0 });
                });
        },
        [sortBy, sortCourses],
    );

    const handleSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            performSearch(searchText);
        },
        [searchText, performSearch],
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchText(value);

            if (realTimeSearch) {
                // Clear existing timeout
                if (searchTimeoutRef.current) {
                    clearTimeout(searchTimeoutRef.current);
                }

                // Set new timeout for real-time search
                searchTimeoutRef.current = setTimeout(() => {
                    if (value.length >= 2 || value.length === 0) {
                        performSearch(value);
                    }
                }, 300); // 300ms delay
            }
        },
        [realTimeSearch, performSearch],
    );

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <DefaultLayout title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e19]">
                <Hero title={t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')} description={searchText} breadcrumbItems={breadcrumb} />

                <div className="container mx-auto px-4 py-8">
                    {/* Enhanced Search Bar */}
                    <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="p-6 bg-white shadow-lg border border-gray-200">
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="relative">
                                    <Search
                                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                                            loading ? 'text-primary animate-pulse' : 'text-gray-400'
                                        }`}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Rechercher des formations, certifications, compétences..."
                                        value={searchText}
                                        onChange={handleInputChange}
                                        className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-primary rounded-xl transition-all duration-200"
                                    />

                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                        {/* Real-time search toggle - Disabled
                                        <motion.label
                                            className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={realTimeSearch}
                                                onChange={(e) => setRealTimeSearch(e.target.checked)}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span>Temps réel</span>
                                        </motion.label>
                                        */}
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                type="submit"
                                                disabled={loading || realTimeSearch}
                                                className="h-10 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg disabled:opacity-50"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Recherche...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Search className="h-4 w-4 mr-2" />
                                                        Rechercher
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                    {/* Search Stats and Controls */}
                    <AnimatePresence>
                        {(filteredCourses.length > 0 || loading) && (
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="font-medium text-primary">{searchStats.total}</span> résultat(s)
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Debug Info - Remove in production */}
                    {/* Disabled debug info */}
                    {/* {false && process?.env?.NODE_ENV === 'development' && (
                        <div className="mb-4 p-4 bg-yellow-100 rounded-lg text-xs">
                            <p>Debug: searchText = "{searchText}"</p>
                            <p>Debug: filteredCourses.length = {filteredCourses.length}</p>
                            <p>Debug: loading = {loading ? 'true' : 'false'}</p>
                            <p>Debug: courses.length = {courses.length}</p>
                        </div>
                    )} */}
                    {/* Results */}
                    <div ref={resultsRef}>
                        {loading ? (
                            <motion.div
                                key="loading"
                                className="flex flex-col items-center justify-center py-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="relative"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full" />
                                    <motion.div
                                        className="absolute inset-2 border-2 border-primary/30 border-b-primary rounded-full"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                    />
                                </motion.div>
                                <motion.p
                                    className="mt-4 text-lg text-gray-600"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    {realTimeSearch ? 'Recherche en temps réel...' : 'Recherche en cours...'}
                                </motion.p>
                            </motion.div>
                        ) : filteredCourses.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <CourseTable courses={filteredCourses} />
                            </div>
                        ) : searchText && searchText.length > 0 && !loading ? (
                            <motion.div
                                key="no-results"
                                className="flex flex-col items-center justify-center py-20"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="relative mb-6"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, -2, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg">
                                        <Search className="h-12 w-12 text-gray-400" />
                                    </div>
                                    <motion.div
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 border-2 border-red-300 rounded-full flex items-center justify-center"
                                        animate={{ scale: [0.8, 1.1, 0.8] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <span className="text-red-500 text-xs font-bold">0</span>
                                    </motion.div>
                                </motion.div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                                <p className="text-gray-600 text-center max-w-md mb-6">
                                    Nous n'avons trouvé aucune formation correspondant à votre recherche
                                    <span className="font-medium text-primary">"{searchText}"</span>
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSearchText('')}
                                            className="flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/5"
                                        >
                                            <Search className="h-4 w-4" />
                                            Nouvelle recherche
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href={ROUTE_MAP.public.courses.list.link}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            Voir toutes les formations
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                className="flex flex-col items-center justify-center py-16 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <Search className="h-8 w-8 text-primary" />
                                </motion.div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchText && searchText.length > 0 ? 'Aucun résultat trouvé' : 'Commencez votre recherche'}
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    {searchText && searchText.length > 0
                                        ? `Nous n'avons trouvé aucune formation correspondant à "${searchText}"`
                                        : 'Tapez au moins 2 caractères pour commencer à rechercher des formations'}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {searchText && searchText.length > 0 && (
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <button
                                                onClick={() => setSearchText('')}
                                                className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary rounded-lg hover:bg-primary/5 transition-colors"
                                            >
                                                <Search className="h-4 w-4" />
                                                Nouvelle recherche
                                            </button>
                                        </motion.div>
                                    )}
                                    <Link
                                        href={ROUTE_MAP.public.courses.list.link}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        <BookOpen className="h-4 w-4" />
                                        {searchText && searchText.length > 0 ? 'Voir toutes les formations' : 'Parcourir toutes les formations'}
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
