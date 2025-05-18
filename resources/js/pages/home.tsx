import HeroHomePage from '@/components/hero/HeroHomePage';
import DefaultLayout from '@/layouts/public/front.layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <DefaultLayout title="Welcome" description="Welcome">
            <HeroHomePage />
        </DefaultLayout>
    );
}
