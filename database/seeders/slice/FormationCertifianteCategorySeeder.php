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
                'excerpt'     => 'Le niveau Fondation est le premier niveau de certification ISTQB. Il est destiné à toute personne souhaitant acquérir les bases du test logiciel.',
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
                'excerpt' => 'Le titulaire de la certification Selenium Foundation A4Q est capable de concevoir, exécuter et automatiser des tests sur des applications web.',
                'description' => json_encode([
                    'content' => "Formation - A4Q Certified Selenium Tester Foundation\nLe titulaire de la certification Selenium Foundation A4Q est capable de concevoir, exécuter et automatiser des tests sur des applications web. Cette formation vous enseignera comment identifier et tester divers éléments d'une page web, en mettant particulièrement l'accent sur les interfaces graphiques (GUI) à l'aide de Selenium WebDriver. Les exemples fournis seront en Python.\nDétails de la formation : Formation en présentiel à Abidjan ou classe à distance ; Durée : 3 jours ; Tarif : 650 000 XOF Hors Taxe, Bon pour l'examen inclus ; Documents : Livre de référence.\nPourquoi choisir la certification A4Q Selenium Foundation : La certification A4Q Selenium Foundation valide vos compétences en automatisation des tests avec Selenium. Elle est reconnue dans l'industrie et permet de démontrer votre expertise dans l'utilisation de cet outil, renforçant ainsi votre profil professionnel et votre valeur sur le marché du travail."
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
