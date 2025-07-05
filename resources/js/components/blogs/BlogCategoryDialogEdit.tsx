import { IBlogCategory } from '@/types/blogs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { BlogCategoryForm } from './BlogCategoryForm';

interface BlogCategoryDialogEditProps {
    category: IBlogCategory | null;
    categories?: IBlogCategory[];
    open: boolean;
    onCancel: () => void;
}

export function BlogCategoryDialogEdit({ open, category, onCancel, categories }: BlogCategoryDialogEditProps) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{category ? 'Modifier la catégorie' : 'Créer une catégorie'}</DialogTitle>
                    <DialogDescription>
                        <BlogCategoryForm category={category} categories={categories} onCancel={onCancel} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
