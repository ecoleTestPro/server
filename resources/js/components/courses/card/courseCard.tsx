import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { IPartner } from '@/types/partner';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Calendar1, CirclePlus, Edit2Icon, ExternalLink, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import './CourseCard.css'; // Link to CSS file

interface CourseCardProps {
    course: ICourse;
    onDelete?: (course: ICourse) => void;
    setOpenSessionDrawer?: (open: boolean) => void;
    setSelectedCourseSessionSession?: (course: ICourse | null) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete, setOpenSessionDrawer, setSelectedCourseSessionSession }) => {
    const { auth, data } = usePage<SharedData>().props;

    const [openPartnerDrawer, setOpenPartnerDrawer] = useState(false);
    const [partners, setPartners] = useState<IPartner[]>([]);
    const [selectedPartners, setSelectedPartners] = useState<number[]>(course.partners ? course.partners.map((p) => p.id!) : []);

    useEffect(() => {
        if ((data as any)?.partners) {
            setPartners((data as any).partners as IPartner[]);
        }
    }, [data]);

    const handleUpdatePartners = async () => {
        try {
            await axios.post(route('dashboard.course.update', course.slug), {
                _method: 'PUT',
                partner_ids: selectedPartners,
            });
            toast.success('Partenaires associés');
            setOpenPartnerDrawer(false);
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
        }
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
            return includesTax ? `${price.toLocaleString()} ${currency} (Tax Incl.)` : `${price.toLocaleString()} ${currency} (Excl. Tax)`;
        };

        return (
            <div>
                <div className="mb-2 flex items-center">
                    <div className="mr-2">
                        {course.regular_price > course.price && (
                            <span className="mr-2 text-gray-500 line-through">{course.regular_price.toLocaleString()} XOF</span>
                        )}
                        <span className="text-lg font-semibold">{formatPrice(course.price, course.price_includes_tax)}</span>
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
                                >
                                    <CirclePlus className="w-4 h-4" />
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
            <div className="mb-2 flex items-center">
                <span className="text-sm text-gray-600">Status: {course.is_published ? 'Published' : 'Draft'}</span>
                {course.is_published && <span className="ml-2 text-sm text-green-500">Active</span>}
            </div>
        );
    };

    return (
        <>
            <div className="course-card w-full rounded-lg bg-white shadow-md dark:bg-gray-800">
                <div className="course-card-header px-4 pt-2">
                    <CourseHeader />
                    <CourseTitle />
                </div>
                <div className="course-card-body p-4">
                    <div className="course-card-content">
                        <CourseDescription />
                        <CourseAttachment />
                        <CourseStatus />
                    </div>
                </div>
                <div className="course-card-footer bg-green rounded-lg p-4">
                    <CourseDuration />
                    <CourseFooter />
                </div>
            </div>
            <Drawer
                title="Associer des partenaires"
                open={openPartnerDrawer}
                setOpen={setOpenPartnerDrawer}
                component={
                    <div className="space-y-2">
                        {partners.map((p) => (
                            <label key={p.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedPartners.includes(p.id!)}
                                    onChange={(e) => {
                                        let updated = [...selectedPartners];
                                        if (e.target.checked) {
                                            updated.push(p.id!);
                                        } else {
                                            updated = updated.filter((id) => id !== p.id);
                                        }
                                        setSelectedPartners(updated);
                                    }}
                                />
                                <span>{p.name}</span>
                            </label>
                        ))}
                        <Button className="mt-2" onClick={handleUpdatePartners}>
                            Enregistrer
                        </Button>
                    </div>
                }
            />
        </>
    );
};

export default CourseCard;
