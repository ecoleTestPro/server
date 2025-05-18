import { type PropsWithChildren } from 'react';
import Footer from './footer';
import Header from './header';

interface DefaultLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function DefaultLayout({ children, title, description }: PropsWithChildren<DefaultLayoutProps>) {
    return (
        <div className="">
            <Header />
            <Footer />
        </div>
    );
}
