import { ICourseCategory } from '@/types/course';

export interface IHeroBreadcrumbItems {
    label: string;
    href: string;
}

interface HeroProps {
    category: ICourseCategory;
}

const HeroCategory = ({ category }: HeroProps) => {
    return (
        <section>
            <div className="container mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ratione dignissimos expedita vitae iusto magnam? Necessitatibus
                quasi esse explicabo, accusantium labore, beatae at sequi aspernatur voluptatem atque officia sed itaque.
            </div>
        </section>
    );
};

export default HeroCategory;
