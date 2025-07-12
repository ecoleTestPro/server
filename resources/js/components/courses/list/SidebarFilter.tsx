import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ICourse, ICourseCategory } from '@/types/course';
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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [nextSession, setNextSession] = useState<string>('');
    const [categories, setCategories] = useState<ICourseCategory[]>([]);

    // Extraire les catégories uniques des cours
    useEffect(() => {
        const uniqueCategories = Array.from(
            new Map(courses.flatMap((course) => course.categories || []).map((category) => [category.id, category])).values(),
        );
        setCategories(uniqueCategories);
    }, [courses]);

    // Appliquer les filtres
    useEffect(() => {
        let filteredCourses = [...courses];

        // Filtre par titre
        if (title) {
            filteredCourses = filteredCourses.filter((course) =>
                course.title.toLowerCase().includes(title.toLowerCase()),
            );
        }

        // Filtre par prix
        filteredCourses = filteredCourses.filter(
            (course) => course.price >= priceRange[0] && course.price <= priceRange[1],
        );

        // Filtre par catégorie
        if (selectedCategory) {
            filteredCourses = filteredCourses.filter((course) =>
                course.categories?.some((category) => category.id === Number(selectedCategory)),
            );
        }

        // Filtre par prochaine session
        if (nextSession) {
            filteredCourses = filteredCourses.filter(
                (course) => course.nextSession && course.nextSession.includes(nextSession),
            );
        }

        onFilterChange(filteredCourses);
    }, [title, priceRange, selectedCategory, nextSession, courses, onFilterChange]);

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
        setSelectedCategory(null);
        setNextSession('');
    };

    return (
        <div className="w-64 p-4 bg-white dark:bg-[#1a1f33] rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">{t('FILTER.TITLE', 'Filtres')}</h2>

            {/* Filtre par titre */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">{t('FILTER.TITLE_LABEL', 'Titre du cours')}</label>
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
                    {t('FILTER.PRICE_LABEL', 'Plage de prix (FCFA)')}: {priceRange[0] / 100} - {priceRange[1] / 100}
                </label>
                <div className="flex gap-2">
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

            {/* Filtre par catégorie */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">{t('FILTER.CATEGORY_LABEL', 'Catégorie')}</label>
                <Select onValueChange={setSelectedCategory} value={selectedCategory || ''}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('FILTER.CATEGORY_PLACEHOLDER', 'Sélectionner une catégorie')} />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={(category?.id ?? '##').toString()}>
                                {category.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
