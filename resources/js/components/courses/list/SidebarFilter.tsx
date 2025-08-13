import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { ICourse } from '@/types/course';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarFilterProps {
    courses: ICourse[];
    onFilterChange: (filteredCourses: ICourse[]) => void;
}

export default function SidebarFilter({ courses, onFilterChange }: SidebarFilterProps) {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000000]); // Plage de prix initiale
    const [nextSession, setNextSession] = useState<string>('');

    // Appliquer les filtres
    useEffect(() => {
        let filteredCourses = [...courses];

        // Filtre par titre
        if (title.trim()) {
            filteredCourses = filteredCourses.filter((course) =>
                course.title.toLowerCase().includes(title.toLowerCase()),
            );
        }

        // Filtre par prix
        filteredCourses = filteredCourses.filter(
            (course) => course.price >= priceRange[0] && course.price <= priceRange[1],
        );

        // Filtre par prochaine session
        if (nextSession.trim()) {
            filteredCourses = filteredCourses.filter((course) => {
                if (!course.course_sessions || course.course_sessions.length === 0) return false;
                
                const now = new Date();
                const upcomingSession = course.course_sessions
                    .filter((session) => new Date(session.start_date) > now)
                    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0];
                
                if (!upcomingSession) return false;
                
                const sessionDate = upcomingSession.start_date;
                return sessionDate.toLowerCase().includes(nextSession.toLowerCase());
            });
        }

        onFilterChange(filteredCourses);
    }, [title, priceRange, nextSession, courses, onFilterChange]);

    // Gestion des changements de la plage de prix
    const handlePriceChange = (index: number, value: string) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = Number(value);
        setPriceRange(newPriceRange as [number, number]);
    };

    // Réinitialiser les filtres
    const resetFilters = () => {
        setTitle('');
        setPriceRange([0, 1000000]);
        setNextSession('');
    };

    return (
        <div className="w-64 p-4 bg-white dark:bg-[#1a1f33] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">{t('FILTER.TITLE', 'Filtres')}</h2>

            {/* Filtre par titre */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">{t('FILTER.TITLE_LABEL', 'Titre')}</label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t('FILTER.TITLE_PLACEHOLDER', 'Rechercher un titre')}
                    className="w-full"
                />
            </div>

            {/* Filtre par prix */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">
                    {t('FILTER.PRICE_LABEL', 'Plage de prix (FCFA)')}: {priceRange[0]*100 / 100} - {priceRange[1]*100 / 100}
                </label>
                <div className="gird grid-cols-1 gap-2">
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        step="10000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
            </div>

            {/* Filtre par prochaine session */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">{t('FILTER.SESSION_LABEL', 'Prochaine session')}</label>
                <Input
                    type="text"
                    value={nextSession}
                    onChange={(e) => setNextSession(e.target.value)}
                    placeholder={t('FILTER.SESSION_PLACEHOLDER', 'ex: 23.06.25')}
                    className="w-full"
                />
            </div>

            {/* Bouton de réinitialisation */}
            <Button onClick={resetFilters} className="w-full bg-red-500 hover:bg-red-600 text-white">
                {t('FILTER.RESET', 'Réinitialiser')}
            </Button>
        </div>
    );
}
