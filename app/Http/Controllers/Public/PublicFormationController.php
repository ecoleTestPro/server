<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;
use App\Repositories\PartnerRepository;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicFormationController extends PublicAbstractController
{

    private $default_data = [];

    public function __construct()
    {
        $this->default_data = $this->getDefaultData();
    }

    /**
     * Recherche des formations par mot-clé.
     *
     * @param Request $request Requ te HTTP contenant le param tre "search" qui contient le mot-cl  de recherche
     * @return \Illuminate\Http\JsonResponse
     */
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

    /**
     * Display search results page.
     */
    public function searchPage(Request $request)
    {
        try {
            $searchTerm = $request->input('search', '');
            $data = $this->default_data;
            if ($searchTerm !== '') {
                $data['courses'] = CourseRepository::findAllBySearchText($searchTerm, 50);
            } else {
                $data['courses'] = [];
            }

            return Inertia::render('public/search.page', [
                'data' => $data,
                'searchTerm' => $searchTerm,
            ]);
        } catch (Exception $e) {
            Log::error("Error in searchPage: {$e->getMessage()}");
            return redirect()->route('home')->withErrors('Une erreur est survenue lors de la recherche.');
        }
    }

    /**
     * Affiche la liste des formations.
     * 
     * @return \Inertia\Response
     */
    public function courses()
    {
        $data = $this->default_data;
        
        // Récupérer toutes les catégories avec leurs cours
        $data['categories_with_courses'] = CategoryRepository::getRecursiveTree(true);
        
        // Récupérer toutes les formations
        $data['courses']['list'] = CourseRepository::findAll();

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

    /**
     * Affiche le détail d'une formation.
     *
     * @param string $categorySlug Slug de la catégorie
     * @param string $courseSlug Slug de la formation
     *
     * @return \Inertia\Response
     */
    public function courseDetail($categorySlug, $courseSlug)
    {
        try {
            $course = CourseRepository::findBySlug($courseSlug);
            // dd($course);
            if (!$course) {
                return redirect()->route('courses')->withErrors('Introuvable');
            }

            // Increment view count for the course
            CourseRepository::incrementViewCount($course);

            // set data for the view
            $data = $this->default_data;
            $data['category'] = CategoryRepository::findBySlug($categorySlug);
            $data['course'] = $course;
            $data['references'] = [];
            if ($course && $course->reference_tag) {
                $data['references'] = PartnerRepository::getActiveReferences($course->reference_tag);
            }

            // Get related courses
            $data['related_courses'] = CourseRepository::getRelatedCourses($course);

            return Inertia::render('public/courses/course-detail.page', [
                'data' => $data,
            ]);
        } catch (Exception $e) {
            // dd($e);
            Log::error("Error in courseCategory: {$e->getMessage()}");
            return redirect()->route('courses')->withErrors('Une erreur est survenue lors de la récupération des données.');
        }
    }

    public function calendar()
    {
        $data = $this->default_data;
        return Inertia::render('public/courses/calendar.page', [
            'data' => $data,
        ]);
    }

    /**
     * API endpoint pour récupérer les formations mises en avant (featured)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFeaturedCourses(Request $request)
    {
        try {
            $limit = $request->input('limit', 6);
            $featuredCourses = CourseRepository::getFeaturedCourses($limit);

            return response()->json([
                'success' => true,
                'courses' => $featuredCourses,
                'count' => $featuredCourses->count()
            ]);
        } catch (Exception $e) {
            Log::error("Error in getFeaturedCourses: {$e->getMessage()}");
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des formations mises en avant.',
                'courses' => []
            ], 500);
        }
    }
}
