import { Button } from '@/components/ui/button/button';
import Drawer from '@/components/ui/drawer';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { IPartner } from '@/types/partner';
import { ROUTE_MAP } from '@/utils/route.util';
import { getMediaUrl } from '@/utils/utils';
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
    const [partnerTags, setPartnerTags] = useState<string>('');
    const [selectedPartners, setSelectedPartners] = useState<number[]>(course.partners ? course.partners.map((p) => p.id!) : []);
    const [partnerFilter, setPartnerFilter] = useState('');

    useEffect(() => {
        if ((data as any)?.partners) {
            setPartners((data as any).partners as IPartner[]);
        }

        if (course.reference_tag) {
            setPartnerTags(course.reference_tag);
        }
    }, [data]);

    const handleUpdatePartners = async () => {
        try {
            if (!selectedPartners || selectedPartners.length === 0) {
                toast.error('Veuillez sélectionner au moins un partenaire.');
                return;
            } else if (!partnerTags) {
                toast.error('Veuillez entrer un tag de référence.');
                return;
            }

            await axios
                .post(route('dashboard.course.partners.sync', course.slug), {
                    partner_ids: selectedPartners,
                    reference_tag: partnerTags,
                })
                .then((response) => {
                    toast.success('Partenaires associés');
                    setOpenPartnerDrawer(false);
                })
                .catch((error) => {
                    toast.error('Erreur lors de la mise à jour des partenaires');
                });
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
                        <input
                            type="text"
                            className="w-full rounded border p-2"
                            placeholder="Rechercher..."
                            value={partnerFilter}
                            onChange={(e) => setPartnerFilter(e.target.value)}
                        />

                        <div className="flex items-center justify-between my-2">
                            <a
                                className="hover:underline cursor-pointer"
                                onClick={() => setSelectedPartners(partners.map((p) => p.id).filter((id): id is number => id !== undefined))}
                            >
                                Tous sélectionner
                            </a>
                            <a className="hover:underline cursor-pointer" onClick={() => setSelectedPartners([])}>
                                Tous désélectionner
                            </a>
                        </div>

                        <div className="max-h-[50vh] overflow-y-scroll">
                            {partners
                                .filter((p) => p.name.toLowerCase().includes(partnerFilter.toLowerCase()))
                                .map((p) => (
                                    <div className="p-0">
                                        <label key={p.id} className="grid grid-cols-3 items-center border-b border-gray-200 space-x-2">
                                            <div className="col-span-2">
                                                <div className="flex space-x-1">
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
                                                </div>
                                            </div>
                                            <div className="flex justify-end border-l pl-2">
                                                <img src={getMediaUrl(p.media)} alt={p.name} className="h-20 w-[auto] rounded-full" />
                                            </div>
                                        </label>
                                    </div>
                                ))}
                        </div>

                        <div>
                            <input
                                required
                                type="text"
                                value={partnerTags}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setPartnerTags(value);
                                }}
                                placeholder="Tag"
                                className="w-full rounded border p-2"
                            />
                        </div>
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
