import { ICourse } from '@/types/course';
import { ROUTE_MAP } from '@/utils/route.util';
import { formatPrice } from '@/utils/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export interface IHeroBreadcrumbItems {
    label: string;
    href: string;
}

interface HeroProps {
    course: ICourse;
}
const HeroCourse = ({ course }: HeroProps) => {
    const { t } = useTranslation();

    const getPrice = (course: ICourse) => {
        let price = `<span>${formatPrice(course.price)}</span>`;
        if (course.regular_price) {
            price = `${formatPrice(course.price)} - <span class="line-through text-gray-400">${formatPrice(course.regular_price)}</span>`;
        }

        return price;
    };

    return (
        <section>
            <div className="container mx-auto">{course.excerpt && <p className="text-lg text-gray-700 md:text-xl mb-4">{course.excerpt}</p>}</div>
            <ul>
                <li>
                    {t('COURSE.DURATION', 'Durée')} : {course.periodicity?.value}
                </li>

                <li>
                    {t('COURSE.PRICE', 'Prix')} : <span dangerouslySetInnerHTML={{ __html: getPrice(course) }} />
                </li>

                {course.category && course.category.title && (
                    <li>
                        {t('COURSE.CATEGORY', 'Catégorie')} :{' '}
                        <Link href={ROUTE_MAP.courseCategory(course.category?.slug).link}>{course.category?.title}</Link>
                    </li>
                )}

                {course.attachment && (
                    <li>
                        {t('COURSE.ATTACHMENT', 'Documents')} :{' '}
                        <Link href={'#'} target="_blank" rel="noopener noreferrer">
                            {course.attachment}
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    );
};

export default HeroCourse;
