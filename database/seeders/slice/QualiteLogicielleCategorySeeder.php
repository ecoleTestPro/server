<?php

namespace Database\Seeders\slice;


class QualiteLogicielleCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [
            $this->buildCourse([
                'title' => 'TMAP Quality for cross-functional teams Certification',
                'slug'  => 'tmap-quality-cross-functional-teams-certification',
                'duration' => 3,
                'is_featured' => true,
                'excerpt' => 'Cette formation vous permettra d’acquérir les compétences nécessaires pour devenir un professionnel de la qualité dans les équipes interfonctionnelles.',
            ]),
            $this->buildCourse([
                'title' => 'TMAP High-performance quality engineering Certification',
                'slug'  => 'tmap-high-performance-quality-engineering-certification',
                'duration' => 3,
                // 'is_featured' => true,
                'excerpt' => 'Cette formation vous permettra d’acquérir les compétences nécessaires pour devenir un professionnel de l’ingénierie de la qualité à haute performance.',
            ]),
            $this->buildCourse([
                'title' => 'TMAP Organizing built-in quality at scale Certification',
                'slug'  => 'tmap-organizing-built-in-quality-at-scale-certification',
                'duration' => 3,
                'is_featured' => true,
                'excerpt' => 'Cette formation vous permettra d’acquérir les compétences nécessaires pour organiser la qualité intégrée à grande échelle. Pour les professionnels de la qualité qui souhaitent améliorer la qualité des produits et services à grande échelle.',
            ]),
            $this->buildCourse([
                'title' => 'TMAP Quality Engineering for SAP Certification',
                'slug'  => 'tmap-quality-engineering-for-sap-certification',
                'duration' => 2,
            ]),
            $this->buildCourse([
                'title' => 'TMMi Professional Certified "Test Maturity Model Integration"',
                'slug'  => 'tmmi-professional-certified-test-maturity-model-integration',
                'duration' => 3,
            ]),

        ];
    }
}
