import { CLASS_NAME } from '@/data/styles/style.constant';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroHomePage() {
    const { data } = usePage<SharedData>().props;
    const [featuredCourses, setFeaturedCourses] = useState<ICourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const response = await axios.get(route('api.courses.featured'), {
                    params: { limit: 6 }, // Limiter à 4 formations pour le hero
                });

                if (response.data.success) {
                    setFeaturedCourses(response.data.courses);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des formations mises en avant:', error);
                // Fallback sur les formations populaires si disponibles
                if (data && data.popular_courses) {
                    setFeaturedCourses(data.popular_courses.slice(0, 6));
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedCourses();
    }, [data]);

    const style = {
        formationItem: `group relative overflow-hidden text-black col-span-2 md:col-span-1 rounded-lg px-4 py-3 dark:text-neutral-100 ${CLASS_NAME.bgDefault} hover:bg-white/90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`,
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center p-6 text-white md:min-h-6 md:p-[100px]">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                poster="/assets/images/Benefices-de-la-formation-en-entrepreneuriat-scaled-1.jpg" // Fallback image
            >
                <source src="/assets/videos/hero-background-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay for text readability */}
            <div
                className="absolute inset-0 bg-black/50"
                style={{
                    backgroundBlendMode: 'overlay',
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 container flex flex-col items-center justify-start md:flex-row">
                <div className="w-full p-6 text-center md:w-2/3 md:text-left">
                    <h1 className="animate-slide-up mb-4 text-4xl font-bold text-white dark:text-white">
                        Obtenez des <span className="animate-pulse-scale animation-primary-text-color text-green-500">certifications</span> <br />
                        reconnues mondialement
                    </h1>

                    <p className="mb-8 text-white dark:text-white">
                        Boostez votre carrière et propulsez votre entreprise vers le succès avec nos formations certifiantes.
                    </p>

                    {/* Section des formations mises en avant */}
                    {!isLoading && featuredCourses.length > 0 && (
                        <div className="mt-8">
                            <div className="flex items-center mb-6">
                                <h2 className="text-lg font-bold text-white dark:text-white">Formations mises en avant</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {featuredCourses.map((course, index) => (
                                    <Link
                                        key={course.id}
                                        href={ROUTE_MAP.public.courses.detail(course.category?.slug ?? '#', course.slug).link}
                                        className={style.formationItem}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className=" text-base line-clamp-2">{course.title}</h3>
                                                {false && course.category && (
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{course.category.title}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* État de chargement */}
                    {isLoading && (
                        <div className="mt-8 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-6 animate-pulse">
                                        <div className="h-4 bg-white/30 rounded mb-2"></div>
                                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fallback si aucune formation featured */}
                    {!isLoading && featuredCourses.length === 0 && (
                        <div className="mt-8 text-center">
                            <p className="text-white/80 mb-4">Aucune formation mise en avant pour le moment</p>
                            <Link
                                href={ROUTE_MAP.public.courses.list.link}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Découvrir nos formations
                                <TrendingUp className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
