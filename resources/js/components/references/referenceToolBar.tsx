import { CirclePlus, HelpCircle } from 'lucide-react';
import { JSX } from 'react';
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
                        <div className="flex space-x-1">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{t('References', 'Références')}</h1>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <HelpCircle className="h-5 w-5" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        Gérez vos partenaires et références clients. Ajoutez des logos, liens web et organisez par tags pour faciliter
                                        la navigation.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 w-2/3">
                            Cette section vous permet de gérer votre portfolio de références et partenaires. Vous pouvez ajouter des logos, Ces
                            informations seront affichées sur votre site web pour renforcer votre crédibilité. Les tags vous aident d'associer une
                            page ou une formation a une ou plusieurs références afin qu'elles s'affiche sur la page dédiée.
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

            {open && FormComponent && (
                <Drawer title={t('References.add', 'Ajouter une référence')} open={open} setOpen={setOpen && setOpen} component={FormComponent} />
            )}
        </div>
    );
}
