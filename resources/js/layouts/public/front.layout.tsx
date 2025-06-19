import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState, type PropsWithChildren } from 'react';

// import { Icons } from '@/components/icons';
import Footer from '@/components/layouts/footer/footer';
import Header from '@/components/layouts/header/header';
import PageLoading from '@/components/ui/page-loading';
import { SharedData } from '@/types';
import toast, { Toaster } from 'react-hot-toast';

interface DefaultLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function DefaultLayout({ children, title, description }: PropsWithChildren<DefaultLayoutProps>) {
    const { auth, data } = usePage<SharedData>().props;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | false>(false);
    // const [errors, setErrors] = useState<string | false>(false);

    useEffect(() => {
        setLoading(true);


        // toast.success('Page loaded successfully!');

        if (error) {
            toast.error(error);
        }

        if (!data) {
            setError('No data found');
        }

        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [data]);

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center p-[15px]">
                <PageLoading />
            </section>
        );
    }

    const TopAlert = () => {
        if (error) {
            return (
                <div className="bg-red-500 text-white p-4 rounded">
                    <p>Error: {error}</p>
                </div>
            );
        }

        return null;

        return (
            <div className="bg-green-500 text-white p-4 rounded">
                <p>Data loaded successfully!</p>
            </div>
        );
    };

    return (
        <div className="">
            <Head title={title || ''}></Head>
            <TopAlert />
            <Header />
            <div className="">{children}</div>

            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <Footer />
        </div>
    );
}
