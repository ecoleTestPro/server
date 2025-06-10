import { Head } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

// import { Icons } from '@/components/icons';
import Header from '@/components/layouts/header/header';
import HeaderTwo from '@/components/layouts/header/headerTwo';
import Footer from '../../components/layouts/footer/footer';

interface DefaultLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function DefaultLayout({ children, title, description }: PropsWithChildren<DefaultLayoutProps>) {
    return (
        <div className="">
            <Head title={title || ''}></Head>
            {/* <Header /> */}
            <HeaderTwo />
            {children}
            <Footer />
            {/* <FooterTwo /> */}
        </div>
    );
}
