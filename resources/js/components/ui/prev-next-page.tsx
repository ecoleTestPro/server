import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CLASS_NAME } from '@/data/styles/style.constant';
import { motionVariants } from '@/utils/motion.util';
import { Link } from '@inertiajs/react';


export interface IPrevNextPageItem {
        title: string;
        href: string;
        description?: string;
        image?: string;
        bgColor?: string;
}

export interface IPrevNextPage {
    prev: IPrevNextPageItem,
    next: IPrevNextPageItem
}

interface PrevNextPageProps {
    pages: IPrevNextPage;
}


export default function PrevNextPage({ pages }: PrevNextPageProps) {
    const { t } = useTranslation();


    if (!pages) {
        return null;
    }

    const renderLink = (page: IPrevNextPageItem, previous : boolean = false)    =>{
        return <>
        {page.href == "#" ? (<span className="text-gray-500">{page.title || t('PAGES.NEXT_PREV.PREV', 'Précédent')}</span>) : 
                <Link href={page.href} className="text-green-500 hover:underline flex items-center gap-2">
                {previous&& 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>}

                    {page.title || t('PAGES.NEXT_PREV.PREV', 'Précédent')}

                    {!previous && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>}


                    {page.description && <span className="sr-only">{page.description}</span>}
                </Link>
    }
            </>
    }


    return <motion.section
        className={`body-font ${CLASS_NAME.bgAlt1} border`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={motionVariants.sectionVariants}
    >
        <div className="mx-auto container p-[20px]">
            <motion.div
                className="flex"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={motionVariants.sectionVariants}
            >

                <div className="container">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {pages.prev &&  renderLink(pages.prev, true)}
                        </div>


                        <div className="flex items-center gap-2">
                            {pages.next && renderLink(pages.next)}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </motion.section>
}
