import CourseReferenceDrawer from '@/components/courses/references/CourseReferenceDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { IPartner } from '@/types/partner';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    Calendar1,
    CalendarDays,
    ChevronDown,
    ChevronUp,
    Clock,
    DollarSign,
    Edit2Icon,
    ExternalLink,
    Eye,
    EyeOff,
    MapPin,
    Trash2Icon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './CourseCard.css'; // Link to CSS file
import { getPeriodicity } from '@/utils/utils';

interface CourseCardProps {
    course: ICourse;
    onDelete?: (course: ICourse) => void;
    onCourseUpdate?: (updatedCourse: ICourse) => void;
    setOpenSessionDrawer?: (open: boolean) => void;
    setSelectedCourseSessionSession?: (course: ICourse | null) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete, onCourseUpdate, setOpenSessionDrawer, setSelectedCourseSessionSession }) => {
    const { auth, data } = usePage<SharedData>().props;
    const { t } = useTranslation();

    const [openPartnerDrawer, setOpenPartnerDrawer] = useState(false);
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isTogglingFeatured, setIsTogglingFeatured] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<ICourse>(course);

    const durationValue: boolean | string = getPeriodicity(course.periodicity_unit, course.periodicity_value);

    const getNextSession = (): string => {
        if (!currentCourse.course_sessions || currentCourse.course_sessions.length === 0) {
            return t('COURSE.TABLE.NO_UPCOMING_SESSION', 'N/A');
        }

        const now = new Date();
        const upcomingSessions = currentCourse.course_sessions
            //.filter((session) => new Date(session.start_date) > now)
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        const next = upcomingSessions[0];
        if (!next) {
            return t('COURSE.TABLE.NO_UPCOMING_SESSION', 'N/A');
        }

        if (next.end_date) {
            return `${next.start_date} - ${next.end_date}`;
        }

        return next.start_date;
    };

    useEffect(() => {
        if ((data as any)?.partners) {
            setPartners((data as any).partners as IPartner[]);
        }
    }, [data]);

    // Mettre à jour le cours local quand le prop course change
    useEffect(() => {
        setCurrentCourse(course);
    }, [course]);

    // Fonction pour gérer la mise à jour du cours
    const handleCourseUpdate = (updatedCourse: ICourse) => {
        setCurrentCourse(updatedCourse);
        if (onCourseUpdate) {
            onCourseUpdate(updatedCourse);
        }
    };

    const handleTogglePublish = async () => {
        setIsPublishing(true);
        try {
            // Simuler l'appel API pour publier/dépublier
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(currentCourse.is_published ? 'Formation dépubliée' : 'Formation publiée');
            window.location.reload(); // À remplacer par une mise à jour locale
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
        } finally {
            setIsPublishing(false);
        }
    };

    const handleToggleFeatured = async () => {
        setIsTogglingFeatured(true);
        try {
            const response = await axios.patch(route('dashboard.course.toggle-featured', currentCourse.id));
            const updatedCourse = { ...currentCourse, is_featured: response.data.is_featured };
            setCurrentCourse(updatedCourse);
            if (onCourseUpdate) {
                onCourseUpdate(updatedCourse);
            }
            toast.success(response.data.message);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour de la mise en avant');
            console.error('Error toggling featured:', error);
        } finally {
            setIsTogglingFeatured(false);
        }
    };

    const handleConfirmDelete = () => {
        if (onDelete) {
            onDelete(currentCourse);
            setShowConfirmDelete(false);
        }
    };

    const getStatusColor = () => {
        if (currentCourse.is_published) return 'bg-green-100 text-green-800 border-green-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const truncateDescription = (text: string, maxLength: number = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const CourseHeader = () => {
        return (
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-green-500">Formation</span>
                <div>
                    {auth?.user?.is_admin && <span className="bg-yellow-500 rounded-full p-2 text-sm italic"> #{course.id} </span>}
                    {course.is_featured && <span className="text-sm text-yellow-500">FEATURED</span>}
                </div>
            </div>
        );
    };

    const CourseTitle = () => {
        return <h2 className="mb-2 text-lg font-bold">{course.title}</h2>;
    };

    const CourseDescription = () => {
        return <p className="mb-4 text-gray-500">{course.excerpt}</p>;
    };

    const CourseDuration = () => {
        return (
            <div className="mb-2 flex items-center">
                <div className="mr-4 flex items-center">
                    <FaClock className="mr-1 text-green-500" />
                    <span>{course.duration} jours</span>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-green-500" />
                    <span>{course.location_mode}</span>
                </div>
            </div>
        );
    };

    const CourseFooter = () => {
        const formatPrice = (price: number, includesTax: boolean) => {
            const currency = 'XOF';
            return includesTax ? `${price.toLocaleString()} ${currency} (Tax Incl.)` : `${price.toLocaleString()} ${currency} `;
        };

        return (
            <div>
                <div className="mb-2 flex items-center">
                    <div className="mr-2">
                        <span className="text-lg font-semibold">{formatPrice(course.price, course.price_includes_tax)}</span>

                        {course.regular_price > course.price && (
                            <span className="mr-2 text-gray-500 line-through">{course.regular_price.toLocaleString()} XOF</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2">
                        {auth?.user?.is_admin && (
                            <>
                                <button
                                    onClick={() => {
                                        setSelectedCourseSessionSession && setSelectedCourseSessionSession(course);
                                        setOpenSessionDrawer && setOpenSessionDrawer(true);
                                    }}
                                    className="cursor-pointer text-blue-500 p-4 rounded-full hover:bg-blue-400 hover:text-white"
                                    type="button"
                                >
                                    <Calendar1 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setOpenPartnerDrawer(true)}
                                    className="cursor-pointer text-indigo-500 p-4 rounded-full hover:bg-indigo-400 hover:text-white"
                                    type="button"
                                    title="Associer des références"
                                >
                                    <Building2 className="w-4 h-4" />
                                </button>
                            </>
                        )}
                        <Link
                            href={ROUTE_MAP.dashboard.course.edit(course.slug).link}
                            className="text-green-400 p-4 rounded-full hover:bg-green-400 hover:text-white"
                            type="button"
                        >
                            <Edit2Icon className="w-4 h-4  " />
                        </Link>
                        <button
                            onClick={() => onDelete && onDelete(course)}
                            className="cursor-pointer text-red-500 p-4 rounded-full hover:bg-red-400 hover:text-white"
                            type="button"
                        >
                            <Trash2Icon className="w-4 h-4" />
                        </button>
                    </div>{' '}
                    <div>
                        {course && (
                            <Link
                                target="_blank"
                                href={ROUTE_MAP.public.courses.detail(course?.category?.slug ?? '#', course.slug).link}
                                className="rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-primary hover:text-white  hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                <ExternalLink className="inline-block h-4 w-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const CourseAttachment = () => {
        return course.attachment ? (
            <div className="mb-2 flex items-center">
                <span className="text-sm text-gray-600">Attachment: {course.attachment}</span>
            </div>
        ) : null;
    };

    const CourseStatus = () => {
        return (
            <div className="mb-2 flex items-center space-x-1">
                <span>Status: </span>
                <span className={`text-sm ${course.is_published ? 'text-green-500' : 'text-gray-600'}`}>
                    {course.is_published ? 'Publié' : 'Brouillon'}
                </span>
                {/* {course.is_published && <span className="ml-2 text-sm text-green-500">Active</span>} */}
            </div>
        );
    };

    return (
        <TooltipProvider>
            <div className="course-card group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
                {/* Header avec badges et statut */}
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs font-medium text-white ">
                                Formation
                            </Badge>
                            {currentCourse.is_featured && <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">⭐</Badge>}
                            {auth?.user?.is_admin && (
                                <Badge variant="outline" className="text-xs">
                                    #{course.id}
                                </Badge>
                            )}
                        </div>
                        <Badge className={getStatusColor()}>
                            {course.is_published ? (
                                <>
                                    <Eye className="w-3 h-3 mr-1" />
                                    Publié
                                </>
                            ) : (
                                <>
                                    <EyeOff className="w-3 h-3 mr-1" />
                                    Brouillon
                                </>
                            )}
                        </Badge>
                    </div>

                    {/* Titre avec hiérarchie marquée */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h2>
                </div>

                {/* Corps de la carte */}
                <div className="px-6 py-4">
                    {/* Description avec "Voir plus" */}
                    <div className="mb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {showFullDescription ? course.excerpt : truncateDescription(course.excerpt || '')}
                        </p>
                        {course.excerpt && course.excerpt.length > 120 && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1 flex items-center gap-1"
                                    >
                                        {showFullDescription ? (
                                            <>
                                                Voir moins <ChevronUp className="w-3 h-3" />
                                            </>
                                        ) : (
                                            <>
                                                Voir plus <ChevronDown className="w-3 h-3" />
                                            </>
                                        )}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{showFullDescription ? 'Réduire la description' : 'Afficher la description complète'}</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>

                    {/* Informations clés */}
                    <div className="grid grid-cols-1 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span>{durationValue || '-'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <span>{course.location_mode}</span>
                        </div>
                        {course.partners && course.partners.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Building2 className="w-4 h-4 text-purple-500" />
                                <span>{course.partners.length} référence(s)</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                            <CalendarDays className="w-4 h-4 text-orange-500" />
                            <span className="font-medium">Prochaine session : {getNextSession()}</span>
                        </div>
                    </div>
                </div>

                {/* Footer avec prix et actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {/* Prix */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-xl font-bold text-gray-900">{course.price.toLocaleString()} XOF</span>
                            {course.regular_price !== course.price && (
                                <span className="text-sm text-gray-500 line-through">{course.regular_price.toLocaleString()} XOF</span>
                            )}
                        </div>
                        <Link
                            target="_blank"
                            href={ROUTE_MAP.public.courses.detail(course?.category?.slug ?? '#', course.slug).link}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Aperçu
                        </Link>
                    </div>

                    {/* Actions avec tooltips */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            {auth?.user?.is_admin && (
                                <>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedCourseSessionSession && setSelectedCourseSessionSession(course);
                                                    setOpenSessionDrawer && setOpenSessionDrawer(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                            >
                                                <Calendar1 className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Gérer les sessions de formation</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setOpenPartnerDrawer(true)}
                                                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                                            >
                                                <Building2 className="w-4 h-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Associer des références</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={currentCourse.is_featured}
                                                        onCheckedChange={handleToggleFeatured}
                                                        disabled={isTogglingFeatured}
                                                        className="data-[state=checked]:bg-yellow-500"
                                                    />
                                                    <span className="text-xs text-gray-600">★</span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{currentCourse.is_featured ? 'Retirer de la mise en avant' : 'Mettre en avant cette formation'}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                        <Link href={ROUTE_MAP.dashboard.course.edit(course.slug).link}>
                                            <Edit2Icon className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Modifier la formation</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleConfirmDelete()}
                                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                    >
                                        <Trash2Icon className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Supprimer la formation</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <CourseReferenceDrawer 
                open={openPartnerDrawer} 
                setOpen={setOpenPartnerDrawer} 
                course={currentCourse} 
                partners={partners} 
                onSuccess={handleCourseUpdate}
            />
        </TooltipProvider>
    );
};

export default CourseCard;
