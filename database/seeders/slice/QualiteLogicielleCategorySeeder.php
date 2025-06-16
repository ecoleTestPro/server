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
            ]),
            $this->buildCourse([
                'title' => 'TMAP High-performance quality engineering Certification',
                'slug'  => 'tmap-high-performance-quality-engineering-certification',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'TMAP Organizing built-in quality at scale Certification',
                'slug'  => 'tmap-organizing-built-in-quality-at-scale-certification',
                'duration' => 3,
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
