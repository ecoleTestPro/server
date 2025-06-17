import { CLASS_NAME } from '@/data/styles/style.constant';
import { useState } from 'react';

export const FAQ: { question: string; answer: string }[] = [
    {
        question: "Qu'est ce que TestPro?",
        answer: "TestPro est un leader dans la formation certifiante en test logiciel et en ingénierie des exigences, offrant des certifications reconnues comme ISTQB, IQBBA et IREB. L'école TestPro s'engage à former des professionnels pour répondre aux besoins croissants du marché technologique en Afrique et à l'international.",
    },
    {
        question: 'Quels services offrez-vous?',
        answer: `
          <div>Nous offrons plusieurs services, notamment :</div> <br />
          <ul>
            <li> • Des formations certifiantes en tests logiciels et en ingénierie des exigences</li>
            <li> • La mise à disposition de testeurs professionnels pour accompagner les entreprises dans leurs projets.</li>
            <li> • Des services d’externalisation des tests réalisés dans nos locaux, en mode régie, pour une gestion collective des ressources tout au long du cycle de vie du développement logiciel.</li>
          </ul>
      `,
    },
    {
        question: "A qui s'adressent nos formations?",
        answer: "Nos formations s'adressent aux professionnels souhaitant se spécialiser en tests logiciels et ingénierie des exigences, ainsi qu'aux entreprises souhaitant renforcer les compétences de leurs équipes face aux défis du marché technologique.",
    },
    {
        question: ' Pourquoi choisir TestPro pour vos besoins en test logiciel ?',
        answer: `
          Nous nous engageons à offrir :

          Une expertise pointue et reconnue dans le domaine des tests logiciels.
          Une approche personnalisée pour chaque projet.
          Une contribution à l’innovation et à l’excellence technologique.
        `,
    },
    {
        question: 'Où se trouvent vos locaux et vos formations sont-elles disponibles en ligne ?',
        answer: `Nos locaux sont situés en Côte d’Ivoire, et nous proposons également des formations en ligne pour permettre à nos apprenants d’apprendre à leur rythme, où qu’ils soient.
        `,
    },

    {
        question: 'Comment puis-je m’inscrire ou bénéficier de vos services ?',
        answer: `
        Pour vous inscrire ou solliciter nos services, vous pouvez :
        <ul>
          <li>Remplir le formulaire sur notre site web.</li>
          <li>Nous contacter par téléphone ou par email via la rubrique "Contact".</li>
          <li>Vous rendre directement dans nos locaux pour une assistance personnalisée.</li>
        </ul>
      `,
    },
];

const Faq: React.FC = () => {
    // Initialize openIndex to 0 to open the first item by default
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section className={CLASS_NAME.section}>
            <div className={CLASS_NAME.sectionContentPadding}>
                <div className="container mx-auto px-[12px] 2xl:max-w-[1320px]">
                    <div className="mx-auto mb-[15px] text-center md:mb-[25px]">
                        <div className="relative mt-[10px] mb-[20px] inline-block">
                            <span className="absolute top-[4.5px] h-[5px] w-[5px] -rotate-[6.536deg] bg-purple-600 ltr:-left-[3.6px] rtl:-right-[3.6px]"></span>
                            <span className="absolute -top-[9.5px] h-[5px] w-[5px] -rotate-[6.536deg] bg-purple-600 ltr:right-0 rtl:left-0"></span>
                            <span className="relative inline-block -rotate-[6.536deg] border border-purple-600 px-[17.2px] py-[5.5px] text-purple-600">
                                FAQ&apos;s
                                <span className="absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] bg-purple-600 ltr:-left-[3.5px] rtl:-right-[3.5px]"></span>
                                <span className="absolute -bottom-[2.5px] h-[5px] w-[5px] -rotate-[6.536deg] bg-purple-600 ltr:-right-[3.5px] rtl:-left-[3.5px]"></span>
                            </span>
                        </div>
                        <h2 className="!mb-0 !text-[24px] !leading-[1.2] -tracking-[.5px] md:!text-[28px] md:-tracking-[.6px] lg:!text-[34px] lg:-tracking-[.8px] xl:!text-[36px] xl:-tracking-[1px]">
                            Vous avez des questions ?
                        </h2>
                    </div>

                    <div className="toc-accordion mx-auto md:max-w-[738px]" id="tablesOfContentAccordion">
                        {FAQ.map((faq, index) => (
                            <div
                                key={index}
                                className="toc-accordion-item mb-[15px] rounded-md bg-white text-black last:mb-0 dark:bg-[#0c1427] dark:text-white"
                            >
                                <button
                                    className={`toc-accordion-button open lg:text-md relative block w-full cursor-pointer px-[20px] py-[13px] text-base font-medium md:px-[25px] md:text-[15px] ltr:text-left rtl:text-right ${
                                        openIndex === index + 1 ? 'open' : ''
                                    }`}
                                    type="button"
                                    onClick={() => toggleAccordion(index + 1)}
                                >
                                    {faq.question}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="absolute top-1/2 size-5 -translate-y-1/2 transform transition-transform duration-300 ease-in-out ltr:right-[20px] md:ltr:right-[25px] rtl:left-[20px] md:rtl:left-[25px]"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                <div
                                    className={`toc-accordion-collapse px-[20px] pb-[20px] md:px-[25px] ${openIndex === index + 1 ? 'open' : 'hidden'}`}
                                >
                                    <div
                                        className="leading-[1.7] text-gray-500 dark:text-gray-400"
                                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
