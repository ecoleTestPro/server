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
                'excerpt' => 'Cette certification est destinée aux testeurs qui souhaitent acquérir des compétences en automatisation des tests avec Selenium.',
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
