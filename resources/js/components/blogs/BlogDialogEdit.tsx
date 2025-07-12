import { BlogForm } from '@/components/blogs/BlogForm';
import { IBlog } from '@/types/blogs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

interface BlogDialogEditProps {
    blog: IBlog | null;
    open: boolean;
    onCancel: () => void;
}

export function BlogDialogEdit({ open, blog, onCancel }: BlogDialogEditProps) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{blog ? 'Modifier le blog' : 'Créer un blog'}</DialogTitle>
                    <DialogDescription>
                        <BlogForm blog={blog} onCancel={onCancel} />
                    </DialogDescription>
                </DialogHeader>
                {/* <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button" onClick={onCancel} disabled={loading}>
                            {cancelLabel}
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" type="button" onClick={onConfirm} disabled={loading} autoFocus>
                        {loading ? 'Suppression...' : confirmLabel}
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}
