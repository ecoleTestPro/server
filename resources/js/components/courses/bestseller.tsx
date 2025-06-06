function Bestseller() {
    const courses = [
        {
            id: 1,
            image: 'https://dummyimage.com/720x400',
            category: 'CATEGORY',
            title: 'The Catalyzer',
            description: 'Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.',
            views: '1.2K',
            comments: 6,
            link: '#',
        },
        {
            id: 2,
            image: 'https://dummyimage.com/720x400/ff7f7f/333333',
            category: 'BUSINESS',
            title: 'Business Booster',
            description: 'Boost your business skills with our expert-led courses and practical workshops.',
            views: '980',
            comments: 3,
            link: '#',
        },
        {
            id: 3,
            image: 'https://dummyimage.com/720x400/7f7fff/333333',
            category: 'TECH',
            title: 'Tech Explorer',
            description: 'Explore the latest in technology and innovation with hands-on learning.',
            views: '2.1K',
            comments: 12,
            link: '#',
        },
    ];

    return (
        <section className="body-font text-gray-600">
            <div className="container mx-auto px-5 py-24">
                <div className="-m-4 flex flex-wrap">
                    {courses.map((course) => (
                        <div className="p-4 md:w-1/3" key={course.id}>
                            <div className="border-opacity-60 h-[200px] overflow-hidden rounded-lg border-2 border-gray-200">
                                {/* <img className="w-full object-cover object-center md:h-36 lg:h-48" src={course.image} alt={course.title} /> */}
                                <div className="p-6">
                                    <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400">{course.category}</h2>
                                    <h1 className="title-font mb-3 text-lg font-medium text-gray-900">{course.title}</h1>
                                    <p className="mb-3 leading-relaxed">{course.description}</p>
                                </div>
                            </div>
                            <div className="bg-primary flex flex-wrap items-center p-5 dark:bg-neutral-100">
                                <a className="inline-flex items-center text-white dark:text-primary md:mb-2 lg:mb-0" href={course.link}>
                                    Learn More
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Bestseller;
