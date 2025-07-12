import { BtnLinkCustom } from '@/components/ui/button/Btnlink';
import { ROUTE_MAP } from '@/utils/route.util';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CalendarMenu() {
    const { t } = useTranslation();

    return (
        <BtnLinkCustom
            icon={<Calendar className="size-6" />}
            href={ROUTE_MAP.public.calendar.link}
            title={t('sessions.calendar', 'Calendrier des sessions')}
        />
    );
}
