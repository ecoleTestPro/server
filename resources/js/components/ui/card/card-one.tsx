import { motionVariants } from '@/utils/motion.util';
import { motion } from 'framer-motion';

export interface StaticFeatureItem {
    title: string;
    description: string;
    image?: string;
    bgColor: string;
    cta?: {
        label: string;
        href: string;
    };
}

interface CardOneProps {
    feature: StaticFeatureItem;
    gridClass?: string;
}

export default function CardOne({ feature, gridClass }: CardOneProps) {
    return (
            
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={motionVariants.cardDivVariants} className={`hover:bg-primary-100 rounded-2xl bg-white/[.54] p-[15px] text-center hover:backdrop-blur-[5.400000095367432px] md:p-[25px] lg:p-[30px] ltr:lg:text-left rtl:lg:text-right dark:bg-[#15203c`}>
            {feature.image && (
                <div
                    className={`bg-primary-100 mx-auto mb-[20px] flex h-[80px] w-[80px] items-center justify-center rounded-[10px] md:h-[85px] md:w-[85px] md:rounded-[17px] lg:mx-0 lg:mb-[22px]`}
                >
                    <img
                        alt="Real-Time Updates"
                        loading="lazy"
                        width="50"
                        height="50"
                        decoding="async"
                        data-nimg="1"
                        className="inline-block"
                        src={feature.image}
                    />
                </div>
            )}

            <h3 className="!mb-[10px] !text-lg !leading-[1.2] !font-semibold md:!mb-[12px] md:!text-[20px] lg:!text-[22px] xl:!mb-[13px] xl:!text-[24px]">
                {feature.title}
            </h3>

            <p className="leading-[1.6]">{feature.description}</p>

            {feature.cta && (
                <a
                    href={feature.cta.href}
                    className="mt-[20px] inline-block rounded-[5px] bg-primary-500 px-[15px] py-[10px] text-center text-white hover:bg-primary-600"
                >
                    {feature.cta.label}
                </a>
            )}

        </motion.div>

    )
}
