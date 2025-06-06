import { CLASS_NAME } from '@/data/styles/style.constant';

export default function HeroHomePage() {
    const style = {
        formationItem: 'text-black rounded bg-white px-4 py-2 dark:text-neutral-100',
    };

    return (
        <section className={`py-20 text-white dark:text-neutral-100 ${CLASS_NAME['bg-primary']}`}>
            <div className="container mx-auto flex flex-col items-center md:flex-row">
                <div className="w-full p-6 md:w-1/2">
                    <h1 className="mb-4 text-4xl font-bold">Des formations pour un succès durable</h1>
                    <p className="mb-8">
                        Faites évoluer votre carrière et contribuez activement au développement et au succès de votre entreprise grâce à l'acquisition
                        de nouvelles compétences.
                    </p>
                    <h2 className="mb-4 text-3xl font-bold underline">Nos formations garanties</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="#" className={style.formationItem}>
                            Microsoft
                        </a>
                        <a href="#" className={style.formationItem}>
                            Gestion de projets et de services
                        </a>
                        <a href="#" className={style.formationItem}>
                            IT Providers & Technologies
                        </a>
                        <a href="#" className={style.formationItem}>
                            Sécurité
                        </a>
                        <a href="#" className={style.formationItem}>
                            Intelligence Artificielle (IA)
                        </a>
                        <a href="#" className={style.formationItem}>
                            Software Engineering
                        </a>
                        <a href="#" className={style.formationItem}>
                            Business Applications
                        </a>
                        <a href="#" className={style.formationItem}>
                            Digital Media & Design
                        </a>
                    </div>
                    <a href="#" className="text-dark-900 mt-4 underline dark:text-neutral-100">
                        Toutes nos formations garanties
                    </a>
                </div>
                <div className="w-full p-6 md:w-1/2">
                    <img
                        src="https://a.storyblok.com/f/92421/2800x1396/8f3ad2a0ca/home-image-digifokus_gruen_022025_v3.webp"
                        alt="Woman smiling"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
