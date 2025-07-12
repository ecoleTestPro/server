<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => "Qu'est ce que TestPro?",
                'answer' => "TestPro est un leader dans la formation certifiante en test logiciel et en ingénierie des exigences, offrant des certifications reconnues comme ISTQB, IQBBA et IREB. L'école TestPro s'engage à former des professionnels pour répondre aux besoins croissants du marché technologique en Afrique et à l'international.",
            ],
            [
                'question' => 'Quels services offrez-vous?',
                'answer' => "<div>Nous offrons plusieurs services, notamment :</div> <br /><ul><li> • Des formations certifiantes en tests logiciels et en ingénierie des exigences</li><li> • La mise à disposition de testeurs professionnels pour accompagner les entreprises dans leurs projets.</li><li> • Des services d’externalisation des tests réalisés dans nos locaux, en mode régie, pour une gestion collective des ressources tout au long du cycle de vie du développement logiciel.</li></ul>",
            ],
            [
                'question' => "A qui s'adressent nos formations?",
                'answer' => "Nos formations s'adressent aux professionnels souhaitant se spécialiser en tests logiciels et ingénierie des exigences, ainsi qu'aux entreprises souhaitant renforcer les compétences de leurs équipes face aux défis du marché technologique.",
            ],
            [
                'question' => ' Pourquoi choisir TestPro pour vos besoins en test logiciel ?',
                'answer' => "Nous nous engageons à offrir :\n\nUne expertise pointue et reconnue dans le domaine des tests logiciels.\nUne approche personnalisée pour chaque projet.\nUne contribution à l’innovation et à l’excellence technologique.",
            ],
            [
                'question' => 'Où se trouvent vos locaux et vos formations sont-elles disponibles en ligne ?',
                'answer' => 'Nos locaux sont situés en Côte d’Ivoire, et nous proposons également des formations en ligne pour permettre à nos apprenants d’apprendre à leur rythme, où qu’ils soient.',
            ],
            [
                'question' => 'Comment puis-je m’inscrire ou bénéficier de vos services ?',
                'answer' => 'Pour vous inscrire ou solliciter nos services, vous pouvez :<ul><li>Remplir le formulaire sur notre site web.</li><li>Nous contacter par téléphone ou par email via la rubrique "Contact".</li><li>Vous rendre directement dans nos locaux pour une assistance personnalisée.</li></ul>',
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
