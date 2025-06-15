import { CLASS_NAME } from '@/data/styles/style.constant';
import { ICourse } from '@/types/course';

const course: ICourse[] = [
    {
        id: 1,
        image: '',
        title: 'PSPO I Formation certifiante - Scrum Product Owner',
        excerpt: '',
        description: '',
        duration: '',
        lectures: '',
        price: 0,
        regular_price: 0,
        author: '',
        is_featured: false,
        is_published: false,
        price_includes_tax: false,
        location_mode: '',
    },
    {
        id: 2, // Corrected duplicate ID
        image: '',
        title: 'PSM I Formation certifiante - Scrum Master',
        excerpt: '',
        description: '',
        duration: '',
        lectures: '',
        price: 0,
        regular_price: 0,
        author: '',
        is_featured: false,
        is_published: false,
        price_includes_tax: false,
        location_mode: '',
    },
    {
        id: 3, // Corrected duplicate ID
        image: '',
        title: 'PSM I Formation certifiante - Scrum Master - CI',
        excerpt: '',
        description: '',
        duration: '',
        lectures: '',
        price: 0,
        regular_price: 0,
        author: '',
        is_featured: false,
        is_published: false,
        price_includes_tax: false,
        location_mode: '',
    },
    {
        id: 4, // Corrected duplicate ID
        image: '',
        title: 'IQBBA Certified Professional for Requirements Engineering Foundation Level for Business Analyst',
        excerpt: '',
        description: '',
        duration: '',
        lectures: '',
        price: 0,
        regular_price: 0,
        author: '',
        is_featured: false,
        is_published: false,
        price_includes_tax: false,
        location_mode: '',
    },
];

export default function HeroHomePage() {
    const style = {
        formationItem: `text-black rounded px-4 py-2 dark:text-neutral-100 ${CLASS_NAME.bgDefault}`,
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
                    <h2 className="mb-4 text-3xl font-bold text-white underline dark:text-white">Nos formations garanties</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {course.map((item, index) => (
                            <a key={item.id} href="#" className={style.formationItem}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
 