<?php

namespace App\Http\Controllers;

use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;

abstract class PublicAbstractController extends Controller
{
    /**
     * Indicates whether to include courses in the category tree.
     *
     * @var bool
     */
    protected bool $includeCourses = false;

    /**
     * Get the course categories with their respective courses in a recursive tree structure.
     *
     * @param bool $includeCourses Whether to include courses in the category tree.
     * @return array An associative array representing the category tree with courses.
     */
    protected function courseWithCategoryTree($includeCourses = false)
    {
        return CategoryRepository::getRecursiveTree($includeCourses);
    }

    /**
     * Get the default data including categories with their respective courses.
     *
     * @return array An associative array containing categories with their courses.
     */
    protected function getDefaultData()
    {
        return [
            'categories_with_courses' => $this->courseWithCategoryTree(true),
            'asset_path'              => asset(''),
        ];
    }
}
