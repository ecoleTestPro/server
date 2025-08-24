import { JSX } from 'react';
import { CirclePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button/button';
import Drawer from '../ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface IReferenceToolBarProps {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function ReferenceToolBar({ FormComponent, open, setOpen }: IReferenceToolBarProps) {
    const { t } = useTranslation();

    return (
        <div>
            <header className="mb-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {t('References', 'Références')}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ajoutez et gérez vos références clients et partenaires
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    className="cursor-pointer rounded bg-teal-600 hover:bg-teal-700 text-white p-3 transition-colors" 
                                    onClick={() => setOpen && setOpen(true)} 
                                    aria-label={t('Add reference', 'Ajouter une référence')}
                                >
                                    <CirclePlus className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajouter une nouvelle référence client ou partenaire avec logo et informations</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>

            {open && FormComponent && <Drawer title={t('References.add', 'Ajouter une référence')} open={open} setOpen={setOpen && setOpen} component={FormComponent} />}
        </div>
    );
}
