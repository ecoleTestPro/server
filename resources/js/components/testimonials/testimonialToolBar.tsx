import { JSX } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';
import Drawer from '../ui/drawer';

interface ITestimonialToolBarProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function TestimonialToolBar({ FormComponent, open, setOpen }: ITestimonialToolBarProps) {
    const { t } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('Testimonials', 'Témoignages')}</h1>
                    <div className="mt-2 flex justify-end space-x-2">
                        <Button className="cursor-pointer rounded bg-gray-600 p-2" onClick={() => setOpen && setOpen(true)} aria-label={t('Add testimonial', 'Ajouter un témoignage')}>
                            <CirclePlus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {open && FormComponent && (
                <Drawer title={t('Testimonials.add', 'Ajouter un témoignage')} open={open} setOpen={setOpen && setOpen} component={FormComponent} />
            )}
        </div>
    );
}
