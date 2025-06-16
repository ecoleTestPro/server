<?php

namespace Database\Seeders\slice;


class MethodologiesCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [
            $this->buildCourse([
                'title' => 'État de l\'art du test logiciel',
                'slug'  => 'etat-de-l-art-du-test-logiciel',
                'level' => 'METHODES',
                'duration' => 1,
            ]),
            $this->buildCourse([
                'title' => 'Conduite de projet de test',
                'slug'  => 'conduite-de-projet-de-test',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Test en mode agile',
                'slug'  => 'test-en-mode-agile',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Introduction à l’automatisation de test',
                'slug'  => 'introduction-a-l-automatisation-de-test',
                'level' => 'METHODES',
                'duration' => 1,
            ]),
            $this->buildCourse([
                'title' => 'Tests d’accessibilité Web',
                'slug'  => 'tests-d-accessibilite-web',
                'level' => 'METHODES',
                'duration' => 1,
            ]),
            $this->buildCourse([
                'title' => 'Concevoir les tests métier avec MBT',
                'slug'  => 'concevoir-les-tests-metier-avec-mbt',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Ingénierie des exigences - IE',
                'slug'  => 'ingenierie-des-exigences-ie',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Business Analysis - BA',
                'slug'  => 'business-analysis-ba',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Introduction aux méthodologies agile',
                'slug'  => 'introduction-aux-methodologies-agile',
                'level' => 'METHODES',
                'duration' => 1,
            ]),
            $this->buildCourse([
                'title' => 'Fondamentaux ITSM',
                'slug'  => 'fondamentaux-itsm',
                'level' => 'METHODES',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'Communication & Posture Consultants',
                'slug'  => 'communication-et-posture-consultants',
                'level' => 'METHODES',
                'duration' => 1,
            ]),

        ];
    }
}
