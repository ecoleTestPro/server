import { JSX } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';
import Drawer from '../ui/drawer';

interface IFaqToolBarProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function FaqToolBar({ FormComponent, open, setOpen }: IFaqToolBarProps) {
    const { t } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('FAQs')}</h1>
                    <div className="mt-2 flex justify-end space-x-2">
                        <Button className="cursor-pointer rounded bg-gray-600 p-2" onClick={() => setOpen && setOpen(true)} aria-label={t('Add faq', 'Ajouter une FAQ')}>
                            <CirclePlus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {open && FormComponent && (
                <Drawer title={t('FAQs.add', 'Ajouter une FAQ')} open={open} setOpen={setOpen && setOpen} component={FormComponent} />
            )}
        </div>
    );
}
