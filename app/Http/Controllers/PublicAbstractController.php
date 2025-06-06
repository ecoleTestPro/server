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

    protected function defaultData()
    {
        return [
            'categoriesWithCourses' => $this->courseWithCategoryTree(),
        ];
    }
}
