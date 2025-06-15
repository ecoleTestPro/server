function AboutUsCard() {
    return (
        <section className="body-font text-gray-600 dark:text-white dark:bg-[#0a0e19]">
            <div className="py-[40px] md:py-[50px] lg:py-[60px] xl:py-[80px]">
                <div className="relative z-[1] container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="grid grid-cols-1 items-center gap-[25px] lg:grid-cols-2">
                        <div className="relative">
                            <div className="rounded-[7px] border border-white/[.10] bg-white/[.54] p-[15px] backdrop-blur-[5.400000095367432px] md:max-w-[600px] md:p-[25px] lg:max-w-[400px] xl:max-w-[510px] xl:px-[34px] xl:py-[27px] dark:border-black/[.10] dark:bg-black/[.54]">
                                <img
                                    src="assets/images/Formation-en-ligne-.jpeg"
                                    className="inline-block"
                                    alt="order-summary-image"
                                    width={540}
                                    height={'auto'}
                                />
                            </div>
                            <div className="absolute top-1/2 -mt-[15px] max-w-[120px] -translate-y-1/2 rounded-[4.294px] drop-shadow-xl md:-mt-[17px] md:max-w-[200px] lg:max-w-[219px] ltr:right-0 ltr:lg:right-[30px] rtl:left-0 rtl:lg:left-[30px]">
                                <img
                                    src="assets/images/card-icon-1.png"
                                    className="inline-block rounded-[4.294px]"
                                    alt="courses-sales-image"
                                    width={100}
                                    height={195}
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="!mb-[15px] !text-[24px] !leading-[1.2] !-tracking-[.5px] md:!text-[28px] md:!-tracking-[.6px] lg:!text-[34px] lg:!-tracking-[.8px] xl:!text-[36px] xl:!-tracking-[1px]">
                                Des formations pour un succès durable !
                            </h2>

                            <div>
                                <p className="!mb-[15px] !text-[15px] !leading-[1.5] md:!text-[17px]">
                                    Dans un environnement numérique en pleine évolution, la qualité des logiciels et des systèmes est essentielle.
                                    Nous invitons les entreprises à certifier leurs employés dans les domaines ISTQB, IREB et IQBBA, qui portent sur
                                    le test de logiciels et l'ingénierie des exigences. Ces formations certifiantes, proposées par l'École TestPro,
                                    permettent à vos collaborateurs d'acquérir des compétences précieuses, contribuant ainsi à leur carrière tout en
                                    renforçant la performance de votre entreprise.
                                </p>
                                <p className="!mb-[15px] !text-[15px] !leading-[1.5] md:!text-[17px]">
                                    Un système bien testé et des exigences de qualité sont des piliers pour garantir la satisfaction des clients et la
                                    réussite commerciale. En investissant dans la formation de vos équipes, vous améliorez non seulement leur
                                    expertise, mais vous assurez également un développement harmonieux de votre organisation. Ne laissez pas passer
                                    cette opportunité d’accélérer la croissance de vos employés et d’élever votre entreprise au niveau supérieur.
                                    Rejoignez l'École TestPro et bâtissons ensemble l'avenir de votre entreprise !
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -top-[60px] -z-[1] blur-[150px] ltr:left-[65px] rtl:right-[65px]">
                        <img src="/images/front-pages/shape1.png" alt="shape1" width={530} height={530} />
                    </div>
                    <div className="absolute -bottom-[30px] -z-[1] blur-[125px] ltr:right-[20px] rtl:left-[20px]">
                        <img src="/images/front-pages/shape2.png" alt="shape1" width={447} height={453} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsCard;
