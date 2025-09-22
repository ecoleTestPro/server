import { CirclePlus } from 'lucide-react';
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';
import Drawer from '../ui/drawer';

interface Props {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function TemplateToolBar({ FormComponent, open, setOpen }: Props) {
    const { t } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{t('Templates')}</h1>
                    <div className="mt-2 flex justify-end space-x-2">
                        <Button
                            className="cursor-pointer rounded bg-gray-600 p-2"
                            onClick={() => setOpen && setOpen(true)}
                            aria-label={t('Add template', 'Ajouter')}
                        >
                            <CirclePlus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {open && FormComponent && (
                <Drawer title={t('Add template', 'Ajouter')} open={open} setOpen={setOpen && setOpen} component={FormComponent} />
            )}
        </div>
    );
}
