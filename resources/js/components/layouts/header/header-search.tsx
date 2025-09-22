import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Loader, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface ISearch {
    search: string;
}

interface HeaderSearchProps {
    className?: string;
}

interface PageProps extends SharedData {
    search_result?: { courses: ICourse[] };
    searchTerm?: string;
}

export default function HeaderSearch({ className }: HeaderSearchProps) {
    const { t } = useTranslation();
    const { props } = usePage<PageProps>();
    const { searchTerm } = props;

    const [loading, setLoading] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>(searchTerm || '');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [courseResults, setCourseResults] = useState<ICourse[]>([]);

    const searchContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { setData: setSearchResult } = useForm<Required<ISearch>>({
        search: searchText,
    });

    const initializeResults = () => {
        setLoading(false);
        setCourseResults([]);
    };

    const onSearch = (searchTerm: string) => {
        setLoading(true);
        setCourseResults([]); // Reset previous results

        axios
            .post(route('search'), { search: searchTerm })
            .then((response: { data: { search_result: { courses?: ICourse[] } } }) => {
                setLoading(false);
                Logger.log('[Search] Courses updated:', response.data.search_result?.courses);
                if (response.data.search_result?.courses) {
                    setCourseResults(response.data.search_result.courses);
                }
            })
            .catch((error) => {
                setLoading(false);
                toast.error(t('courses.search', 'Une erreur est survenue lors de la recherche'));
                Logger.error('[Search] Error fetching search results:', error);
            });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setSearchResult({ search: e.target.value });

        if (e.target.value.length > 0) {
            setShowDropdown(true);
        }

        // Trigger search if input length is greater than 2 characters
        if (e.target.value.length > 2) {
            onSearch(e.target.value);
        } else {
            initializeResults();
            setSearchResult({ search: '' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim() !== '') {
            setShowDropdown(false);
            router.visit(`${ROUTE_MAP.public.search.link}?search=${encodeURIComponent(searchText)}`);
        }
    };

    const handleFocus = () => {
        setFocused(true);
        if (searchText.length > 0) {
            setShowDropdown(true);
        }
    };

    const handleClearSearch = () => {
        setSearchText('');
        setSearchResult({ search: '' });
        setCourseResults([]);
        setShowDropdown(false);
        inputRef.current?.focus();
    };

    const handleResultClick = () => {
        setShowDropdown(false);
        setFocused(false);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={className} ref={searchContainerRef}>
            <motion.div className="relative mx-auto w-full max-w-xl" animate={{ scale: focused ? 1.02 : 1 }} transition={{ duration: 0.2 }}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
                    <form className="flex items-center" onSubmit={handleSubmit}>
                        <div className="flex items-center pl-4">
                            <Search className={`h-5 w-5 transition-colors duration-200 ${focused ? 'text-primary-500' : 'text-gray-400'}`} />
                        </div>

                        <input
                            ref={inputRef}
                            placeholder="Rechercher des formations, certifications..."
                            className="h-12 w-full bg-transparent px-4 text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
                            type="text"
                            value={searchText}
                            onChange={handleSearch}
                            onFocus={handleFocus}
                        />

                        <div className="flex items-center pr-2 space-x-1">
                            {searchText && (
                                <motion.button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            )}

                            <motion.button
                                type="submit"
                                className="flex h-8 items-center justify-center rounded-lg bg-primary-500 px-3 text-white shadow-sm transition-colors hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!searchText.trim()}
                            >
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </div>
                    </form>
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                    {showDropdown && searchText.length > 0 && (
                        <motion.div
                            className="absolute left-0 right-0 top-full z-50 mt-2"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
                                <div className="max-h-96 overflow-y-auto">
                                    {loading ? (
                                        <div className="flex items-center justify-center py-12">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                                <Loader className="h-6 w-6 text-primary-500" />
                                            </motion.div>
                                            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">Recherche en cours...</span>
                                        </div>
                                    ) : (
                                        <div className="p-4">
                                            {searchText.length <= 2 ? (
                                                <div className="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
                                                    <Clock className="mr-2 h-4 w-4" />
                                                    Tapez au moins 3 caractères pour rechercher
                                                </div>
                                            ) : courseResults && courseResults.length > 0 ? (
                                                <>
                                                    <div className="mb-3 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                                                        <BookOpen className="mr-2 h-4 w-4" />
                                                        Formations ({courseResults.length})
                                                    </div>
                                                    <div className="space-y-1">
                                                        {courseResults.map((course, index) => (
                                                            <motion.div
                                                                key={course.id}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                className="group relative"
                                                            >
                                                                <Link
                                                                    href={
                                                                        ROUTE_MAP.public.courses.detail(course.category?.slug ?? '', course.slug).link
                                                                    }
                                                                    onClick={handleResultClick}
                                                                    className="flex items-center rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                                                >
                                                                    <div className="flex-1">
                                                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                                                                            {course.title}
                                                                        </h4>
                                                                        {course.category && (
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {course.category.title}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {courseResults.length >= 5 && (
                                                        <motion.div
                                                            className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.3 }}
                                                        >
                                                            <Link
                                                                href={`${ROUTE_MAP.public.search.link}?search=${encodeURIComponent(searchText)}`}
                                                                onClick={handleResultClick}
                                                                className="flex items-center justify-center rounded-lg p-3 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
                                                            >
                                                                Voir tous les résultats
                                                                <ArrowRight className="ml-1 h-4 w-4" />
                                                            </Link>
                                                        </motion.div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                                    <div className="mb-3 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                                                        <Search className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Aucun résultat trouvé</p>
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        Essayez avec d'autres termes de recherche
                                                    </p>
                                                    <Link
                                                        href={`${ROUTE_MAP.public.search.link}?search=${encodeURIComponent(searchText)}`}
                                                        onClick={handleResultClick}
                                                        className="mt-3 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
                                                    >
                                                        Recherche avancée →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
