function AboutUsCard() {
    return (
        <section className="body-font text-gray-600">
            <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
                <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24">
                    <h1 className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
                        Before they sold out
                        <br className="hidden lg:inline-block" />
                        readymade gluten
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        Nous relevons vos défis professionnels avec des formations continues animées par des expert∙e∙s qualifié∙e∙s. Depuis plus de
                        45 ans, en tant que partenaire leader de formation en suisse romande, nous vous accompagnons dans le développement de vos
                        compétences digitales.
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex rounded border-0 bg-green-500 px-6 py-2 text-lg text-white hover:bg-green-600 focus:outline-none">
                            Button
                        </button>
                        <button className="ml-4 inline-flex rounded border-0 bg-gray-100 px-6 py-2 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none">
                            Button
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsCard;
