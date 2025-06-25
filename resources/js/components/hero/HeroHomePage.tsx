import { CLASS_NAME } from '@/data/styles/style.constant';
import { SharedData } from '@/types';
import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function HeroHomePage() {
    const { data } = usePage<SharedData>().props;
    const [courses, setCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        // Check if data and data.popular_courses are defined before accessing them
        if (data && data.popular_courses) {
            setCourses(data.popular_courses);
        }
    }, [data]);

    const style = {
        formationItem: `text-black col-span-2 md:col-span-1 rounded px-4 py-2 dark:text-neutral-100 ${CLASS_NAME.bgDefault}`,
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
                poster="assets/images/Benefices-de-la-formation-en-entrepreneuriat-scaled-1.jpg" // Fallback image
            >
                <source src="assets/videos/hero-background-2.mp4" type="video/mp4" />
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
                        Obtenez des <span className="animate-pulse-scale animation-primary-text-color  text-green-500">certifications</span> <br />
                        reconnues mondialement
                    </h1>

                    <p className="mb-8 text-white dark:text-white">
                        Boostez votre carrière et propulsez votre entreprise vers le succès avec nos formations certifiantes.
                    </p>
                    {courses.length > 0 && (
                        <div>
                            <h2 className="mb-4 text-3xl font-bold text-white underline dark:text-white">Les formations les plus populaires</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {courses.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={ROUTE_MAP.courseDetail(item.category?.slug ?? '#', item.slug).link}
                                        className={style.formationItem}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
