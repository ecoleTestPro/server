import { ICourseCategory } from '@/types/course';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronRight, Folder, FolderOpen, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button/button';
import { DataTable } from '../ui/dataTable';
import CategoryActionBtn from './categoryActionBtn';

interface CategoryDataTableProps {
    categories: ICourseCategory[];
    onEditRow?: (row: ICourseCategory) => void;
    onDeleteRow?: (row: ICourseCategory) => void;
    onAddSubcategoryRow?: (row: ICourseCategory) => void;
}

interface FlattenedCategory extends ICourseCategory {
    level: number;
    hasChildren: boolean;
    parentTitle?: string;
    isExpanded?: boolean;
    isVisible?: boolean;
}

export default function CategoryDataTable({ categories, onEditRow, onDeleteRow, onAddSubcategoryRow }: CategoryDataTableProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

    // Fonction pour nettoyer et structurer les catégories
    const cleanAndStructureCategories = (rawCategories: ICourseCategory[]): ICourseCategory[] => {
        if (!rawCategories || rawCategories.length === 0) {
            return [];
        }

        // Créer une map pour dédupliquer par ID
        const categoryMap = new Map<number, ICourseCategory>();

        rawCategories.forEach((cat) => {
            if (cat.id) {
                const existing = categoryMap.get(cat.id);
                if (!existing) {
                    categoryMap.set(cat.id, cat);
                } else {
                    // Garder celui qui a le plus de données (avec children par exemple)
                    if (cat.children && cat.children.length > 0 && (!existing.children || existing.children.length === 0)) {
                        categoryMap.set(cat.id, cat);
                    }
                }
            }
        });

        // Convertir en tableau et filtrer les catégories racines
        const uniqueCategories = Array.from(categoryMap.values());

        // Ne garder que les catégories racines (qui n'ont pas de parent_id ou parent_id = null/0)
        // ou qui ne sont pas déjà incluses comme enfants d'une autre catégorie
        const allChildIds = new Set<number>();
        uniqueCategories.forEach((cat) => {
            if (cat.children) {
                cat.children.forEach((child) => {
                    if (child.id) allChildIds.add(child.id);
                });
            }
        });

        const rootCategories = uniqueCategories.filter(
            (cat) => (!cat.parent_id || cat.parent_id === null || cat.parent_id === 0) && (!cat.id || !allChildIds.has(cat.id)),
        );

        return rootCategories;
    };

    // Fonction pour aplatir l'arbre hiérarchique
    const flattenCategories = (categories: ICourseCategory[], level = 0, parentTitle?: string): FlattenedCategory[] => {
        const flattened: FlattenedCategory[] = [];

        categories.forEach((category) => {
            const hasChildren = Boolean(category.children && category.children.length > 0);
            const isExpanded = category.id ? expandedCategories.has(category.id) : false;

            flattened.push({
                ...category,
                level,
                hasChildren,
                parentTitle,
                isExpanded,
                isVisible: true,
            });

            // Ajouter les enfants si la catégorie est étendue
            if (hasChildren && isExpanded && category.children) {
                const childrenFlattened = flattenCategories(category.children, level + 1, category.title);
                flattened.push(...childrenFlattened);
            }
        });

        return flattened;
    };

    // Mémoriser les catégories nettoyées
    const cleanedCategories = useMemo(() => {
        return cleanAndStructureCategories(categories);
    }, [categories]);

    // Données aplaties pour le tableau
    const flattenedData = useMemo(() => {
        return flattenCategories(cleanedCategories);
    }, [cleanedCategories, expandedCategories]);

    // Fonction pour basculer l'expansion d'une catégorie
    const toggleExpansion = (categoryId: number) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    // Définition des colonnes avec support hiérarchique
    const columns: ColumnDef<FlattenedCategory>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const category = row.original;
                const title = category.title;
                const imageUrl = category?.image?.src || null;
                const level = category.level;
                const hasChildren = category.hasChildren;
                const isExpanded = category.isExpanded;

                // Calcul de l'indentation
                const indentationStyle = {
                    paddingLeft: `${level * 24}px`,
                };

                return (
                    <div className="flex items-center gap-2" style={indentationStyle}>
                        {/* Bouton expand/collapse pour les catégories parent */}
                        {hasChildren ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => category.id && toggleExpansion(category.id)}
                                className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
                            </Button>
                        ) : (
                            <div className="h-6 w-6" /> // Espace pour l'alignement
                        )}

                        {/* Icône de dossier/tag */}
                        {hasChildren ? (
                            isExpanded ? (
                                <FolderOpen className="h-4 w-4 text-blue-500" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-500" />
                            )
                        ) : (
                            <Tag className="h-4 w-4 text-gray-400" />
                        )}

                        {/* Image si disponible */}
                        {imageUrl && <img src={imageUrl} alt={title} className="h-8 w-8 rounded object-cover border border-gray-200" />}

                        {/* Titre avec style selon le niveau */}
                        <div className="flex flex-col gap-1">
                            <span
                                className={`${
                                    level === 0
                                        ? 'font-semibold text-gray-900 dark:text-gray-100 text-base'
                                        : 'font-medium text-gray-700 dark:text-gray-300 text-sm'
                                }`}
                            >
                                {title}
                            </span>

                            {/* Badge pour les sous-catégories */}
                            {level > 0 && category.parentTitle && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Sous-catégorie de: <span className="font-medium">{category.parentTitle}</span>
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => <CategoryActionBtn row={row} onEdit={onEditRow} onDelete={onDeleteRow} onAddSubcategory={onAddSubcategoryRow} />,
        },
    ];

    return (
        <div className="space-y-4 w-full">
            {/* Header avec statistiques */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Folder className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">
                            {cleanedCategories.length} catégorie{cleanedCategories.length > 1 ? 's' : ''} principale
                            {cleanedCategories.length > 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {flattenedData.length - cleanedCategories.length} sous-catégorie
                            {flattenedData.length - cleanedCategories.length > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Actions globales */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            // Étendre toutes les catégories
                            const allIds = new Set<number>();
                            const collectIds = (cats: ICourseCategory[]) => {
                                cats.forEach((cat) => {
                                    if (cat.id && cat.children && cat.children.length > 0) {
                                        allIds.add(cat.id);
                                        collectIds(cat.children);
                                    }
                                });
                            };
                            collectIds(cleanedCategories);
                            setExpandedCategories(allIds);
                        }}
                    >
                        Tout étendre
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setExpandedCategories(new Set())}>
                        Tout réduire
                    </Button>
                </div>
            </div>

            {/* Tableau des données */}
            <DataTable columns={columns} data={flattenedData} filterColumn="title" />
        </div>
    );
}
