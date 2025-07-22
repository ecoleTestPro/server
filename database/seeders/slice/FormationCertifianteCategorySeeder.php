<?php

namespace Database\Seeders\slice;

use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use Illuminate\Database\Seeder;
use Exception;
use Illuminate\Support\Facades\Log;

class FormationCertifianteCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [
            // fondation
            $this->buildCourse([
                'title'       => 'ISTQB Certified Tester Foundation Level',
                'slug'        => 'istqb-certified-tester-foundation-level',
                'level'       => 'Fondation',
                "is_featured" => true,
                'excerpt'     => 'Élaborer et superviser des tests logiciels tout en respectant les méthodes et les divers types de tests du cycle de vie du logiciel.',
                'description' => json_encode([
                    'why_choose'      => 'La certification ISTQB Foundation évalue vos compétences en test logiciel et valide votre maîtrise des concepts clés. Reconnu dans le secteur informatique, ce certificat permet aux professionnels de montrer leur expertise et aide les entreprises à identifier rapidement les compétences recherchées. De plus, elle renforce la crédibilité des prestataires auprès des clients. L’apprenant saura concevoir et gérer des tests logiciels, avec une compréhension des méthodes et types de tests du cycle de vie. Il pourra également obtenir la certification ISTQB "Foundation" v4.0.',
                    'target_audience' => "Professionnels de l'activité de tests de logiciels (maîtrise d'ouvrage, maîtrise d'oeuvre, services et exploitation, utilisateurs finaux) souhaitant s'appuyer sur un référentiel standard et normalisé",
                    'prerequisites'   => "Connaissances de base du cycle de vie des logiciels (systèmes d'information, embarqués, temps réels)",
                    "content"         => '<p class="ql-align-justify"><strong>Le programme</strong></p><p class="ql-align-justify"><strong>1 - Fondamentaux des tests</strong></p><ul><li class="ql-align-justify">Que&nbsp;sont&nbsp;les&nbsp;tests ?</li><li class="ql-align-justify">Pourquoi les tests sont-ils nécessaires ?</li><li class="ql-align-justify">7 principes&nbsp;sur&nbsp;les&nbsp;tests</li><li class="ql-align-justify">Processus de test</li><li class="ql-align-justify">La psychologie des tests</li></ul><p class="ql-align-justify"><strong>2 - Tester pendant le cycle de vie du développement logiciel</strong></p><ul><li class="ql-align-justify">Les&nbsp;modèles de développement&nbsp;logiciel</li><li class="ql-align-justify">Niveaux de test</li><li class="ql-align-justify">Types de test</li><li class="ql-align-justify">Tests de maintenance</li></ul><p class="ql-align-justify"><strong>3 - Tests statiques</strong></p><ul><li class="ql-align-justify">Bases des tests&nbsp;statiques</li><li class="ql-align-justify">Processus de revue</li></ul><p class="ql-align-justify"><strong>4 - Techniques de test</strong></p><ul><li class="ql-align-justify">Catégories de techniques de conception de tests</li><li class="ql-align-justify">Techniques de test&nbsp;boîte&nbsp;noire</li><li class="ql-align-justify">Techniques de test&nbsp;boîte&nbsp;blanche</li><li class="ql-align-justify">Techniques de test basées sur l\'expérience</li></ul><p class="ql-align-justify"><strong>5 - Gestion des tests</strong></p><ul><li class="ql-align-justify">Organisation des tests</li><li class="ql-align-justify">Planification et estimation des tests</li><li class="ql-align-justify">Pilotage et contrôle des tests</li><li class="ql-align-justify">Gestion de configuration</li><li class="ql-align-justify">Risques et tests</li><li class="ql-align-justify">Gestion des défauts</li></ul><p class="ql-align-justify"><strong>6 - Outils de support aux&nbsp;tests</strong></p><ul><li class="ql-align-justify">Introduction&nbsp;aux&nbsp;outils de test</li><li class="ql-align-justify">Utilisation&nbsp;efficace&nbsp;d\'outils</li></ul><p><br></p>',
                    "course_strengths" => '<ul><li class="ql-align-justify"><strong>Officiellement accréditée par l\'ISTQB</strong>, cette formation respecte les normes et standards internationaux, ce qui confère une valeur ajoutée au parcours professionnel des participants</li><li class="ql-align-justify"><strong>Approche pratique</strong> : La formation combine théorie et pratique, offrant aux participants des exercices et simulations qui renforcent leur compréhension des concepts.</li><li class="ql-align-justify"><strong>Formateurs expérimentés</strong> : Les formateurs sont des experts du domaine certifié et accrédité par l\'ISTQB, apportant des connaissances et des expériences pratiques qui enrichissent le contenu de la formation.</li><li class="ql-align-justify"><strong>Soutien à la certification</strong> : La formation prépare spécifiquement les participants à l\'examen de certification avec environ 100 questions proposées., avec des ressources adaptées et des conseils sur les meilleures stratégies pour réussir.</li><li class="ql-align-justify"><strong>Réseautage professionnel</strong> : Les participants ont l\'opportunité d\'échanger avec d\'autres professionnels du secteur, favorisant le partage de connaissances et l\'élargissement de leur réseau.</li><li class="ql-align-justify"><strong>Examen inclus dans le prix de la formation :</strong> Le passage de l\'examen est compris dans le coût de la formation.</li><li class="ql-align-justify"><br></li></ul>',
                    "exam" => '<ul><li class="ql-align-justify"><strong>Type de questions</strong>&nbsp;: 40 questions à choix multiples</li><li class="ql-align-justify"><strong>Langue</strong>&nbsp;: En français</li><li class="ql-align-justify"><strong>Durée</strong>&nbsp;: 60 minutes pour l\'examen en français (les personnes dont le français n\'est pas la langue maternelle peuvent bénéficier de 25% de temps supplémentaire)</li><li class="ql-align-justify"><strong>Seuil de réussite</strong>&nbsp;: 26/40</li><li class="ql-align-justify"><strong>Options d\'examen : En ligne ou au centre à Abidjan :</strong> L\'examen peut être réalisé après la formation en ligne, soit depuis votre domicile, soit dans notre centre de test situé à Abidjan.</li></ul><p class="ql-align-justify">Les instructions concernant votre inscription à l\'examen seront fournies dans l\'e-mail contenant votre bon d\'accès.</p>'
                ])
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Foundation Level « Agile Tester »',
                'slug' => 'istqb-certified-tester-foundation-level-agile-tester',
                'level' => 'Fondation',
                'excerpt' => 'Cette formation vous permettra d\'acquérir les compétences nécessaires pour devenir un testeur Agile certifié.',
                'is_featured' => true,
            ]),
            $this->buildCourse([
                'title' => 'A4Q Certified Selenium Tester Foundation',
                'slug'  => 'a4q-certified-selenium-tester-foundation',
                'level' => 'Fondation', 
                'duration' => 3,
                'excerpt' => 'Le titulaire de la certification Selenium Foundation A4Q est capable de concevoir, exécuter et automatiser des tests sur des applications web. Cette formation vous enseignera comment identifier et tester divers éléments d\'une page web, en mettant particulièrement l\'accent sur les interfaces graphiques (GUI) à l\'aide de Selenium WebDriver. Les exemples fournis seront en Python.',
                'description' => json_encode([
                    'why_choose'            => 'a certification A4Q Selenium Foundation valide vos compétences en automatisation des tests avec Selenium. Elle est reconnue dans l\'industrie et permet de démontrer votre expertise dans l\'utilisation de cet outil, renforçant ainsi votre profil professionnel et votre valeur sur le marché du travail.',
                    'content'                => '<p class="ql-align-justify"><strong>Le programme</strong></p><p class="ql-align-justify"><strong>1 - Fondamentaux des tests</strong></p><ul><li class="ql-align-justify">Que&nbsp;sont&nbsp;les&nbsp;tests ?</li><li class="ql-align-justify">Pourquoi les tests sont-ils nécessaires ?</li><li class="ql-align-justify">7 principes&nbsp;sur&nbsp;les&nbsp;tests</li><li class="ql-align-justify">Processus de test</li><li class="ql-align-justify">La psychologie des tests</li></ul><p class="ql-align-justify"><strong>2 - Tester pendant le cycle de vie du développement logiciel</strong></p><ul><li class="ql-align-justify">Les&nbsp;modèles de développement&nbsp;logiciel</li><li class="ql-align-justify">Niveaux de test</li><li class="ql-align-justify">Types de test</li><li class="ql-align-justify">Tests de maintenance</li></ul><p class="ql-align-justify"><strong>3 - Tests statiques</strong></p><ul><li class="ql-align-justify">Bases des tests&nbsp;statiques</li><li class="ql-align-justify">Processus de revue</li></ul><p class="ql-align-justify"><strong>4 - Techniques de test</strong></p><ul><li class="ql-align-justify">Catégories de techniques de conception de tests</li><li class="ql-align-justify">Techniques de test&nbsp;boîte&nbsp;noire</li><li class="ql-align-justify">Techniques de test&nbsp;boîte&nbsp;blanche</li><li class="ql-align-justify">Techniques de test basées sur l\'expérience</li></ul><p class="ql-align-justify"><strong>5 - Gestion des tests</strong></p><ul><li class="ql-align-justify">Organisation des tests</li><li class="ql-align-justify">Planification et estimation des tests</li><li class="ql-align-justify">Pilotage et contrôle des tests</li><li class="ql-align-justify">Gestion de configuration</li><li class="ql-align-justify">Risques et tests</li><li class="ql-align-justify">Gestion des défauts</li></ul><p class="ql-align-justify"><strong>6 - Outils de support aux&nbsp;tests</strong></p><ul><li class="ql-align-justify">Introduction&nbsp;aux&nbsp;outils de test</li><li class="ql-align-justify">Utilisation&nbsp;efficace&nbsp;d\'outils</li></ul><p class="ql-align-justify"><strong>7 - Passage de l\'examen de certification ISTQB Foundation</strong></p><ul><li class="ql-align-justify">Conseils et révisions en vue de l\'examen</li><li class="ql-align-justify">Examen blanc&nbsp;avec&nbsp;correction&nbsp;commentée</li><li class="ql-align-justify">La certification "ISTQB Foundation" peut être passée le dernier jour de la formation en ligne ou à une date ultérieure. L\'examen dure 60 minutes et se compose de 40 questions à choix multiples. Pour obtenir la certification, il est requis d\'atteindre un score minimum de 65 %.</li></ul>',
                    "evaluation"             => 'Pendant la formation, le formateur suit l\'évolution des participants en utilisant divers outils, incluant des quiz à choix multiples, des simulations pratiques et des exercices pratiques. En outre, un test de positionnement est effectué avant et après la formation pour évaluer les compétences développées par chaque participant.',
                    "pedagogical_objectives" => '<ul><li class="ql-align-justify"><strong>Compréhension des concepts de test logiciel</strong> : Permettre aux participants de saisir les principes de base du testing logiciel, y compris les types de tests et le cycle de vie du développement logiciel.</li><li class="ql-align-justify"><strong>Acquisition de compétences pratiques</strong> : Fournir des connaissances sur les techniques de test, la conception de tests et la mise en œuvre de stratégies de test dans des projets réels.</li><li class="ql-align-justify"><strong>Préparation à la certification</strong> : Préparer les participants à réussir l\'examen de certification ISTQB Foundation, en consolidant leur compréhension des sujets clés.</li><li class="ql-align-justify"><strong>Amélioration de la collaboration</strong> : Favoriser une meilleure communication et collaboration entre les équipes de développement et de test, en établissant un langage commun.</li><li class="ql-align-justify"><strong>Introduction aux meilleures pratiques</strong> : Présenter des méthodologies et des pratiques reconnues qui peuvent être appliquées dans le testing logiciel.</li><li class="ql-align-justify"><strong>Renforcement de la carrière professionnelle</strong> : Aider les professionnels à valider leurs compétences en test logiciel, augmentant ainsi leur employabilité et leur crédibilité dans le secteur.</li><li class="ql-align-justify"><br></li></ul>'
                ]),
                'is_featured' => true,
            ]),

            // avancé
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Advanced Level « Test Analyst »',
                'slug' => 'istqb-certified-tester-advanced-level-test-analyst',
                'level' => 'Avancé',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Advanced Level « Technical Test Analyst »',
                'slug' => 'istqb-certified-tester-advanced-level-technical-test-analyst',
                'level' => 'Avancé',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Advanced Level « Test Manager »',
                'slug' => 'istqb-certified-tester-advanced-level-test-manager',
                'level' => 'Avancé',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Advanced Level « Test Automation Engineer »',
                'slug' => 'istqb-certified-tester-advanced-level-test-automation-engineer',
                'level' => 'Avancé',
            ]),


            // Spécialiste
            // Spécialiste
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Specialist « AI Testing »',
                'slug' => 'istqb-certified-tester-specialist-ai-testing',
                'level' => 'Spécialiste',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Specialist « Mobile Application Testing »',
                'slug' => 'istqb-certified-tester-specialist-mobile-application-testing',
                'level' => 'Spécialiste',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Specialist « Performance Testing »',
                'slug' => 'istqb-certified-tester-specialist-performance-testing',
                'level' => 'Spécialiste',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Specialist « Acceptance Testing »',
                'slug' => 'istqb-certified-tester-specialist-acceptance-testing',
                'level' => 'Spécialiste',
            ]),
            $this->buildCourse([
                'title' => 'ISTQB Certified Tester Specialist « Automotive Software Tester »',
                'slug' => 'istqb-certified-tester-specialist-automotive-software-tester',
                'level' => 'Spécialiste',
            ]),
        ];
    }
}
