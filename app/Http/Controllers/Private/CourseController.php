<?php

namespace App\Http\Controllers\Private;

use App\Enum\MediaTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Http\Requests\CoursePartnerSyncRequest;
use App\Models\Course;
use App\Models\Partner;
use App\Repositories\CategoryRepository;
use App\Repositories\ContentRepository;
use App\Repositories\CourseRepository;
use App\Repositories\InstructorRepository;
use App\Repositories\PartnerRepository;
use App\Services\Notification\CourseStoreNotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{


    /**
     * Retrieve all courses.
     *
     * This method returns all courses in JSON format. If there is an error,
     * a JSON response with an error message is returned with a 500 status code.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing all courses or an error message.
     */
    public function allCourses()
    {
        try {
            $courses = CourseRepository::findAll();
            return response()->json([
                'courses' => $courses,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error fetching courses: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display a listing of the courses.
     *
     * This method handles the display of courses based on the user's role and any search criteria.
     * If the user is not an admin, only courses where the user is the instructor are displayed.
     * Additionally, courses can be filtered by a search term that matches the course title or instructor name.
     * The courses are paginated and include trashed records.
     *
     * @param Request $request The incoming request containing potential search parameters.
     * @return \Inertia\Response The Inertia response for the courses index page.
     */
    public function index(Request $request)
    {
        $search = $request->cat_search ? strtolower($request->cat_search) : null;

        $categories = CategoryRepository::findAll();
        $courses = CourseRepository::findAll($search);
        $partners = PartnerRepository::query()->where('is_active', true)->get();

        $data = [
            'courses'    => ["list" => $courses],
            'categories' => $categories,
            'partners'   => $partners,
        ];

        return Inertia::render('dashboard/courses/index', [
            'data' => $data,
        ]);
    }

    public function create(string|null $slug = null)
    {
        // $categories = CategoryRepository::findAll();
        $categories = CategoryRepository::getRecursiveTree(false);
        $partners = PartnerRepository::query()->where('is_active', true)->get();
        // dd($categories);
        $course = null;
        if ($slug) {
            $course = CourseRepository::findBySlug($slug);
        }

        $data = [
            'course'                  => $course,
            'categories_with_courses' => $categories,
            'partners'               => $partners,
        ];

        return Inertia::render('dashboard/courses/course-create', [
            'data' => $data,
        ]);
    }
    public function show(Course $course)
    {
        $totalEnrollments = $course?->enrollments->count();
        // $totalPrice = $course?->enrollments->sum('course_price');
        $transactions = $course->transactions()->where('is_paid', true)->sum('payment_amount');
        $students = $course->enrollments()->withTrashed()->paginate(15);
        $countClass = $course?->chapters()->count();
        $chapterIds = $course?->chapters()->pluck('id')->toArray();
        $contents = ContentRepository::query()->whereIn('chapter_id', $chapterIds)->get();
        $chapters = $course?->chapters()->get();

        return view('course.overview', [
            'course'           => $course,
            "enrollments"      => $totalEnrollments,
            "transactions"     => $transactions,
            'reviews'          => $course->reviews,
            'students'         => $students,
            'countClass'       => $countClass,
            'durationCount'    => $contents->sum('duration'),
            'videoCount'       => $contents->where('type', MediaTypeEnum::VIDEO)->count(),
            'imageCount'       => $contents->where('type', MediaTypeEnum::IMAGE)->count(),
            'audioCount'       => $contents->where('type', MediaTypeEnum::AUDIO)->count(),
            'freeContentCount' => $contents->where('is_free', true)->count(),
            "chapters"         => $chapters,
        ]);
    }

    public function store(CourseStoreRequest $request)
    {
        try {
            $course = CourseRepository::storeByRequest($request);

            if ($course->is_published) {
                CourseStoreNotificationService::notifyCourseStore($course);
            }

            return response()->json([
                'message' => 'Course created successfully',
                'course'  => $course,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating course: ' . $e->getMessage(),
                'status'  => 500,
            ], 500);
        }
    }

    public function edit(Course $course)
    {
        $user = auth()->user;
        $instructors = InstructorRepository::query()
            ->when(!$user->hasRole('admin') || !$user->is_admin, function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->withTrashed()
            ->latest('id')
            ->get();

        return view('course.edit', [
            'course' => $course,
            'categories' => CategoryRepository::query()->get(),
            'instructors' => $instructors,
        ]);
    }

    public function update(CourseUpdateRequest $request, string $slug)
    {
        try {
            $course = CourseRepository::findBySlug($slug);
            if (!$course) {
                return response()->json([
                    'message' => 'Course not found',
                    'status'  => 404,
                ], 404);
            }

            CourseRepository::updateByRequest($request, $course);
            if (isset($request->is_active)) {
                CourseStoreNotificationService::notifyCourseUpdate($course);
            }

            return response()->json([
                'message' => 'Course updated successfully',
                'course'  => $course,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating course: ' . $e->getMessage(),
                'status'  => 500,
                'trace'   => $e->getTrace(),
            ], 500);
        }
    }

    public function getCoursePartners(string $slug)
    {
        try {
            $course = CourseRepository::findBySlug($slug);
            if (!$course) {
                return response()->json([
                    'message' => 'Course not found',
                    'status'  => 404,
                ], 404);
            }

            // Charger les partenaires associés avec leurs médias
            $course->load(['partners.media']);

            return response()->json([
                'partners' => $course->partners,
                'reference_tag' => $course->reference_tag,
                'course_id' => $course->id,
                'course_title' => $course->title
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching course partners: ' . $e->getMessage(),
                'status'  => 500,
            ], 500);
        }
    }

    public function syncPartners(CoursePartnerSyncRequest $request, string $slug)
    {
        try {
            $course = CourseRepository::findBySlug($slug);
            if (!$course) {
                return response()->json([
                    'message' => 'Course not found',
                    'status'  => 404,
                ], 404);
            }

            $tag = $request->reference_tag ?? "";
            $partnerModel = new Partner();
            $partnerModel->saveTagFromCourse($course, $tag, $request->partner_ids);
            $course->load('partners');

            return response()->json([
                'message'  => 'Partners synced',
                'partners' => $course->partners,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error syncing partners: ' . $e->getMessage(),
                'status'  => 500,
            ], 500);
        }
    }

    /**
     * Delete a course.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * Get the enrollment count for a course
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEnrollmentCount(int $id)
    {
        try {
            $count = \App\Models\Enrollment::where('course_id', $id)->count();
            return response()->json([
                'count' => $count,
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'count' => 0,
                'status' => 500,
                'message' => 'Error fetching enrollment count'
            ]);
        }
    }

    public function delete(int $id)
    {
        try {
            $course = CourseRepository::query()->findOrFail($id);
            
            // Check if there are any enrollments for this course
            $enrollmentCount = \App\Models\Enrollment::where('course_id', $id)->count();
            
            if ($enrollmentCount > 0) {
                return response()->json([
                    'message' => "Cette formation ne peut pas être supprimée car {$enrollmentCount} utilisateur(s) y sont inscrits. Veuillez d'abord gérer les inscriptions existantes.",
                    'status' => 409, // Conflict status
                    'hasEnrollments' => true,
                    'enrollmentCount' => $enrollmentCount
                ]);
            }
            
            $course->delete();
            return response()->json([
                'message' => 'Course deleted successfully',
                'status' => 200,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting course: ' . $e->getMessage(),
                'status' => 500,
            ]);
        }
    }

    public function restore(int $id)
    {
        CourseRepository::query()->onlyTrashed()->find($id)->restore();

        return redirect()->route('course.index')->withSuccess('Course restored');
    }

    public function freeCourse(Course $course)
    {
        $course->is_free = !$course->is_free;
        $course->updated_at = now();

        $course->save();

        return to_route('course.index')->withSuccess('Course updated');
    }

    public function toggleFeatured($id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->is_featured = !$course->is_featured;
            $course->save();

            return response()->json([
                'message' => $course->is_featured ? 'Formation mise en avant' : 'Formation retirée de la mise en avant',
                'is_featured' => $course->is_featured,
                'course' => $course
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour: ' . $e->getMessage(),
            ], 500);
        }
    }
}
