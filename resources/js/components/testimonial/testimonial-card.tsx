import React from 'react';
import { useTranslation } from 'react-i18next';

interface TestimonialCardProps {
    show_rating: (rating: number) => React.ReactNode;
    clean: (text: string) => React.ReactNode;
    testimonial: any;
}

export default function TestimonialCard({ show_rating, clean, testimonial }: TestimonialCardProps) {
    const { t } = useTranslation();
    return (
        <div className="swiper-slide">
            <div className="group/testimonial flex h-full flex-col items-center xl:flex-row rtl:xl:flex-row-reverse">
                <div className="flex-center rounded-50 border-primary size-24 shrink-0 translate-y-12 overflow-hidden border p-1.5 xl:translate-x-12 xl:translate-y-0">
                    <img
                        data-src="{{ $profileImageSrc }}"
                        alt="Testimonial image"
                        className="rounded-50 custom-transition size-full object-cover group-hover/testimonial:scale-110"
                    />
                </div>
                <div className="bg-primary-50 h-full grow rounded-2xl p-[80px_30px_30px] xl:p-[50px_30px_50px_80px]">
                    <div className="text-secondary flex items-center gap-0.5">{show_rating(testimonial.rating ?? 0)}</div>
                    <div className="area-description mt-5 line-clamp-3">{clean(testimonial.comments ?? '')}</div>
                    <div className="mt-10 flex justify-between">
                        <div className="shrink-0 grow">
                            <h6 className="area-title text-lg !leading-none">{testimonial.name}</h6>
                            <p className="area-description mt-1.5 !leading-none">{testimonial.designation}</p>
                        </div>
                        <img
                            data-src="{{ asset('lms/frontend/assets/images/icons/quote.svg') }}"
                            alt="Quote icon"
                            className="shrink-0 animate-bounce"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
