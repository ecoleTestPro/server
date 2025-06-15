<?php

namespace App\Http\Controllers;

use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;

abstract class PublicAbstractController extends Controller
{
    protected function courseWithCategoryTree()
    {
        $categories = CategoryRepository::parents();
        // dd($categories);

        foreach ($categories as $category) {
            $category->courses = CourseRepository::findAllByCategoryId($category->id);
        }

        return $categories;
    }

    /**
     * Get the default data including categories with their respective courses.
     *
     * @return array An associative array containing categories with their courses.
     */

    protected function getDefaultData()
    {
        return [
            'categoriesWithCourses' => $this->courseWithCategoryTree(),
        ];
    }
}
