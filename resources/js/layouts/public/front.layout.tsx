import { Head } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

// import { Icons } from '@/components/icons';
import Footer from '../../components/layouts/footer/footer';
import Header from '../../components/layouts/header/header';
import FooterTwo from '@/components/layouts/footer/footerTwo';

interface DefaultLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function DefaultLayout({ children, title, description }: PropsWithChildren<DefaultLayoutProps>) {
    return (
        <div className="">
            <Head title={title || ''}></Head>
            <Header />
            {children}
            <Footer />
            {/* <FooterTwo /> */}
        </div>
    );
}
