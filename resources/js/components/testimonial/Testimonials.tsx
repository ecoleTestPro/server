'use client';

import { CLASS_NAME } from '@/data/styles/style.constant';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';
import TitleBadgeOne from '../ui/badge-one';

import { ITestimonial } from '@/types/testimonial';

const DEFAULT_TESTIMONIALS: ITestimonial[] = [
    {
        name: 'Sophie Lefèvre',
        designation: 'Chef de Projet IT',
        description:
            "La formation ITIL® proposée ici m'a permis d'optimiser la coordination de nos projets IT. Les exemples concrets et les outils fournis ont fait toute la différence dans mon quotidien professionnel.",
        rating: 4,
        is_active: true,
        media: { src: '/assets/images/front-pages/user3.jpg' } as any,
    },
    {
        name: 'Thomas Girard',
        designation: 'Consultant en IA',
        description:
            "Les modules d'intelligence artificielle sont d'une grande qualité. Ils m'ont aidé à mieux comprendre les applications pratiques et à conseiller mes clients avec confiance. Un excellent investissement !",
        rating: 4.5,
        is_active: true,
        media: { src: '/assets/images/front-pages/user4.jpg' } as any,
    },
    {
        name: 'Claire Moreau',
        designation: 'Marketing Digital',
        description:
            'Les formations Adobe ont transformé ma manière de créer des campagnes visuelles. Le site est intuitif, et les ressources sont adaptées à tous les niveaux. Un vrai plus pour ma carrière !',
        rating: 5,
        is_active: true,
        media: { src: '/assets/images/front-pages/user5.jpg' } as any,
    },
];

const Testimonials: React.FC = () => {
    const { data } = usePage<SharedData>().props;
    const testimonials: ITestimonial[] = (data as any)?.testimonials ?? DEFAULT_TESTIMONIALS;

    return (
        <section className={`${CLASS_NAME.section} bg-gradient-to-br from-gray-900 to-gray-800`}>
            <div className={`${CLASS_NAME.sectionContentPadding} ${CLASS_NAME.bgAlt1} py-12 md:py-16`}>
                <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="mx-auto mb-[35px] text-center md:mb-[50px] md:max-w-[650px] lg:mb-[65px] lg:max-w-[810px] xl:mb-[90px] xl:max-w-[785px]">
                        <TitleBadgeOne title="Témoignages" />
                        <h2 className="!mb-0 !text-[24px] !leading-[1.2] font-bold -tracking-[.5px] dark:text-white md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                            Nos clients témoignent
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="rounded-[10px] border border-gray-100/50 bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl p-5 dark:border-gray-800/50 dark:bg-[#0c1427]/90"
                            >
                                <div className="mb-[12px] flex items-center gap-[4px] text-[16px] leading-none text-[#fe7a36] md:mb-[20px] md:text-[19px]">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <i
                                            key={i}
                                            className={`ri-star${
                                                i < Math.floor(testimonial.rating) ? '-fill' : i < testimonial.rating ? '-half-fill' : '-line'
                                            }`}
                                        ></i>
                                    ))}
                                </div>

                                <div className="relative h-[120px] overflow-hidden overflow-y-auto md:h-[140px]">
                                    <p
                                        className="text-[14px] leading-[1.6] font-medium text-gray-800 transition-all duration-300 md:text-[16px] dark:text-gray-200"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            paddingRight: '10px',
                                        }}
                                    >
                                        {testimonial.description}
                                    </p>
                                </div>

                                <div className="mt-[15px] flex items-center gap-[12px] md:mt-[20px] md:gap-[15px]">
                                    {false && (
                                        <img
                                            src={testimonial.media?.src ?? '/media/blank-user.png'}
                                            alt={testimonial.name}
                                            className="rounded-full border-2 border-[#fe7a36] object-cover"
                                            width={50}
                                            height={50}
                                        />
                                    )}
                                    <div>
                                        <h5 className="!mb-[3px] !text-[15px] !font-semibold text-gray-900 md:!text-[16px] dark:text-gray-100">
                                            {testimonial.name}
                                        </h5>
                                        <span className="block text-gray-600 dark:text-gray-400">{testimonial.designation}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
