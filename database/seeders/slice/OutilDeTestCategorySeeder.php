<?php

namespace Database\Seeders\slice;


class OutilDeTestCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [
            $this->buildCourse([
                'title' => 'Industrialisation des tests avec Squash TM / Mantis BT',
                'slug'  => 'industrialisation-tests-squash-tm-mantis-bt',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Industrialisation des tests avec Microfocus ALM',
                'slug'  => 'industrialisation-tests-microfocus-alm',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Test en mode agile avec JIRA/Xray',
                'slug'  => 'test-mode-agile-jira-xray',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Révolutionnez Vos Projets avec Scrum et Jira : Formation Pratique',
                'slug'  => 'gestion-projet-agile-scrum-jira',
                'level' => 'OUTILS',
                'duration' => 3,
                'excerpt' => 'La formation pratique combine théorie Scrum et nombreux cas concrets sur Jira pour maîtriser la gestion de projet Agile.',
                'description' => json_encode([
                    'content' => "La formation sur mesure en gestion de projet Agile avec Scrum est destinée aux équipes et organisations souhaitant améliorer leurs pratiques Agiles. Elle combine théorie et cas pratiques utilisant l'outil Jira pour une expérience d'apprentissage dynamique. Les participants apprendront les fondamentaux de Scrum à travers des exercices en groupe et des discussions interactives, favorisant une meilleure compréhension et collaboration."
                ]),
            ]),
            $this->buildCourse([
                'title' => 'Automatisation des tests avec Selenium Webdriver',
                'slug'  => 'automatisation-tests-selenium-webdriver',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Automatisation des tests avec RobotFramework',
                'slug'  => 'automatisation-tests-robotframework',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Automatisation des tests avec Cypress',
                'slug'  => 'automatisation-tests-cypress',
                'level' => 'OUTILS',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'Test automatisé (BDD/ATDD) avec Cucumber',
                'slug'  => 'test-automatise-bdd-atdd-cucumber',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Test manuel des Webservices manuel avec Postman',
                'slug'  => 'test-manuel-webservices-postman',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Test automatisé des Webservices avec Postman',
                'slug'  => 'test-automatise-webservices-postman',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Scrum Master',
                'slug'  => 'scrum-master',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Product Owner',
                'slug'  => 'product-owner',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'ITIL',
                'slug'  => 'itil',
                'level' => 'OUTILS',
                'duration' => 2,
            ]),


        ];
    }
}
