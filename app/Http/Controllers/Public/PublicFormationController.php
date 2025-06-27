<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\json;

class PublicFormationController extends PublicAbstractController
{

    private $default_data = [];

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }

    public function search(Request $request)
    {
        try {
            $searchTerm = $request->input('search', '');
            $data = [];
            $data['courses'] = CourseRepository::findAllBySearchText($searchTerm);

            return response()->json([
                'search_result' => $data,
                'searchTerm' => $searchTerm,
            ]);
        } catch (Exception $e) {
            Log::error("Error in search: {$e->getMessage()}");
            return response()->json(['error' => 'Une erreur est survenue lors de la recherche.'], 500);
        }
    }

    public function courses()
    {
        $data = $this->default_data;
        $data['category'] = CategoryRepository::findAll();
        $data['courses']['list'] = CourseRepository::findAll();
        // dd($data['courses']);

        // dd($featuredCourses);

        return Inertia::render('public/courses/courses.page', [
            'data' => $data,
        ]);
    }

    /**
     * Affiche la liste des cours appartenant à une catégorie.
     * 
     * @param string $category_slug Slug de la catégorie
     * 
     * @return \Inertia\Response
     */
    public function courseCategory($category_slug)
    {
        try {
            $data = $this->default_data;
            $category = CategoryRepository::findBySlug($category_slug);
            // dd($category);
            if (!$category) {
                return redirect()->route('courses')->withErrors('Introuvable');
            }

            if ($category) {
                $category->children = CategoryRepository::getRecursiveTree(true, $category->id);
                $data['category'] = $category;
            }

            return Inertia::render('public/courses/course-category.page', [
                'data' => $data,
            ]);
        } catch (Exception $e) {
            Log::error("Error in courseCategory: {$e->getMessage()}");
            return redirect()->route('courses')->withErrors('Une erreur est survenue lors de la récupération des données.');
        }
    }

    public function courseDetail($categorySlug, $courseSlug)
    {
        try {
            $course = CourseRepository::findBySlug($courseSlug);
            // dd($course);
            if (!$course) {
                return redirect()->route('courses')->withErrors('Introuvable');
            }

            $data = $this->default_data;
            $category = CategoryRepository::findBySlug($categorySlug);

            $data['category'] = $category;
            $data['course'] = $course;

            return Inertia::render('public/courses/course-detail.page', [
                'data' => $data,
            ]);
        } catch (Exception $e) {
            dd($e);
            Log::error("Error in courseCategory: {$e->getMessage()}");
            return redirect()->route('courses')->withErrors('Une erreur est survenue lors de la récupération des données.');
        }
    }
}
