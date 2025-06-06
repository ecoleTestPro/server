import { useTranslation } from 'react-i18next';
import TestimonialCard from './testimonial-card';

export default function Testimonial() {
    const { t } = useTranslation();
    const testimonials: any[] = [];

    return (
        <div className="bg-white pt-16 sm:pt-24 lg:pt-[120px]">
            <div className="container">
                <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-full mx-auto max-w-[594px] text-center">
                        <div className="area-subtitle">{t('Testimonials', 'Témoignages')}</div>
                        <h2 className="area-title mt-2">
                            {t('Edulab Received More than', 'Edulab a obtenu plus de')}
                            <span className="title-highlight-one">{testimonials.length}</span>
                            {t('Reviews', 'Avis')}
                        </h2>
                    </div>
                </div>
                <div className="swiper testimonial-slider xl:mt-[60px]">
                    <div className="swiper-wrapper">
                        {testimonials &&
                            testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    clean={(text) => text}
                                    show_rating={(rating) => rating}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex-center mt-10 lg:mt-[60px]">
                    <div className="testimonial-pagination swiper-custom-pagination"></div>
                </div>
            </div>
        </div>
    );
}
