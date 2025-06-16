<?php

namespace Database\Seeders\slice;


class IngenierieDesExigencesCategorySeeder extends AbstractCourseCategorySeeder
{
    public function __construct($category = null)
    {
        $this->category = $category;

        $this->courses = [
            $this->buildCourse([
                'title' => 'IQBBA Certified Professional for Requirements Engineering Foundation Level for Business Analyst',
                'slug'  => 'iqbba-certified-professional-for-requirements-engineering-foundation-level-for-business-analyst',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'IREB Certified Professional for Requirements Engineering Foundation Level',
                'slug'  => 'ireb-certified-professional-for-requirements-engineering-foundation-level',
                'duration' => 3,
            ]),
            $this->buildCourse([
                'title' => 'IREB Certified Professional for Requirements Engineering Agile Practitioner',
                'slug'  => 'ireb-certified-professional-for-requirements-engineering-agile-practitioner',
                'duration' => 2,
            ]),
        ];
    }
}
