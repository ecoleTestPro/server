import { JSX } from 'react';
import { CirclePlus, Briefcase } from 'lucide-react';
import { Button } from '../ui/button/button';
import Drawer from '../ui/drawer';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from 'react-i18next';

interface Props {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    FormComponent?: JSX.Element;
}

export default function JobOfferToolBar({ FormComponent, open, setOpen }: Props) {
    const { t } = useTranslation();
    
    return (
        <div>
            <header className="mb-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-5 w-5 text-teal-600" />
                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {t('Job Offers', "Offres d'emploi")}
                            </h1>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Publiez des opportunités de carrière et gérez vos recrutements
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button 
                                    className="cursor-pointer rounded bg-teal-600 hover:bg-teal-700 text-white p-3 transition-colors" 
                                    onClick={() => setOpen && setOpen(true)} 
                                    aria-label={t('Add offer', "Ajouter une offre d'emploi")}
                                >
                                    <CirclePlus className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Créer une nouvelle offre d'emploi avec description du poste, salaire et critères</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>

            {open && FormComponent && (
                <Drawer 
                    title={t('Job Offer', "Offre d'emploi")} 
                    open={open} 
                    setOpen={setOpen && setOpen} 
                    component={FormComponent} 
                />
            )}
        </div>
    );
}
