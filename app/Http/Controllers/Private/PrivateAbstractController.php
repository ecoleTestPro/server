<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;

abstract class PrivateAbstractController extends Controller
{

    /**
     * Get the default data including categories with their respective courses.
     *
     * @return array An associative array containing categories with their courses.
     */
    protected function getDefaultData()
    {
        return [
            // 'categories_with_courses' => $this->courseWithCategoryTree(true),
            // 'asset_path'              => asset(''),
        ];
    }
}
