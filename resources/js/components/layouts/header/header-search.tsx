import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { Logger } from '@/utils/console.util';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useState } from 'react';
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

    const [courseResults, setCourseResults] = useState<ICourse[]>([]);

    const {
        data: searchResult,
        setData: setSearchResult,
        post,
        processing,
        errors,
        reset,
    } = useForm<Required<ISearch>>({
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

        // Trigger search if input length is greater than 2 characters
        if (e.target.value.length > 2) {
            onSearch(e.target.value);
        } else {
            initializeResults();
            setSearchResult({ search: '' });
        }
    };

    // Update courseResults when search_result changes
    // useEffect(() => {
    //     if (search_result?.courses) {
    //         setCourseResults(search_result.courses);
    //     }
    // }, [search_result]);

    return (
        <>
            <div className={className}>
                <div className="relative mx-auto w-full max-w-xl rounded-full bg-white">
                    <div className="flex items-center justify-center">
                        <input
                            placeholder="Rechercher des formations, des certifications, ..."
                            className="focus:border-primary-200 focus:ring-primary-200 border-[#0bbd53] h-10 w-full rounded-full border-1 bg-transparent pr-24 pl-6 outline-none hover:outline-none focus:shadow-md transition-all duration-100 ease-in-out sm:text-sm sm:font-medium"
                            type="text"
                            name="query"
                            id="query"
                            value={searchText}
                            onChange={handleSearch}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 absolute top-1 right-1 flex h-8 items-center justify-between rounded-full px-2 py-1 text-sm text-white transition duration-150 ease-in-out outline-none focus:ring-2 focus:ring-offset-2 focus:outline-none sm:text-sm sm:font-medium"
                        >
                            <svg
                                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {focused && searchText.length > 0 && (
                <div className="">
                    <div className="absolute left-0 top-[60px] z-10 w-full rounded-lg bg-white shadow-lg dark:bg-gray-800">
                        <div className="w-[400px] h-[300px] mx-auto p-4">
                            {loading ? (
                                <div className="flex justify-center items-center h-full w-full">
                                    <Loader className="h-6 w-6 animate-spin text-primary-600" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="col-span-1 md:col-span-3">
                                        {/* formations */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                                {t('HEADER.SEARCH_RESULTS', 'Résultats de recherche')}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('HEADER.SEARCH_FORMATIONS', 'Formations')}</p>
                                            <ul className="max-h-[200px] overflow-y-auto p-2">
                                                {courseResults && courseResults.length > 0 ? (
                                                    courseResults.map((course) => (
                                                        <li key={course.id} className="cursor-pointer p-2 hover:bg-white dark:hover:bg-gray-700">
                                                            <Link
                                                                classID="hover:underline"
                                                                href={ROUTE_MAP.public.courses.detail(course.category?.slug ?? '', course.slug).link}
                                                            >
                                                                {course.title}
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="p-2 text-gray-500 dark:text-gray-400">
                                                        {t('HEADER.NO_RESULTS', 'Aucun résultat trouvé')}
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
