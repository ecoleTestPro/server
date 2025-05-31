<?php

namespace App\Http\Controllers\Private;

use App\Enum\MediaTypeEnum;
use App\Enum\NotificationTypeEnum;
use App\Events\NotifyEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Models\Course;
use App\Models\User;
use App\Repositories\CategoryRepository;
use App\Repositories\ContentRepository;
use App\Repositories\CourseRepository;
use App\Repositories\InstructorRepository;
use App\Repositories\NotificationInstanceRepository;
use App\Repositories\NotificationRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
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
        $user = auth()->user();

        $categories = CategoryRepository::findAll();
        // dd($categories   );

        $course = CourseRepository::findAll($user, $search);

        $data = [
            'courses'    => $course,
            'categories' => $categories,
        ];

        return Inertia::render('dashboard/courses/index', [
            'data' => $data,
        ]);
    }

    public function create()
    {
        $categories = CategoryRepository::findAll();
        // dd($categories   );

        $course = CourseRepository::findAll(auth()->user());

        $data = [
            'courses'    => $course,
            'categories' => $categories,
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
            'course' => $course,
            "enrollments" => $totalEnrollments,
            "transactions" => $transactions,
            'reviews' => $course->reviews,
            'students' => $students,
            'countClass' => $countClass,
            'durationCount' => $contents->sum('duration'),
            'videoCount' => $contents->where('type', MediaTypeEnum::VIDEO)->count(),
            'imageCount' => $contents->where('type', MediaTypeEnum::IMAGE)->count(),
            'audioCount' => $contents->where('type', MediaTypeEnum::AUDIO)->count(),
            'freeContentCount' => $contents->where('is_free', true)->count(),
            "chapters" => $chapters,
        ]);
    }

    public function store(CourseStoreRequest $request)
    {

        $course = CourseRepository::storeByRequest($request);

        if ($course->is_active) {

            NotificationInstanceRepository::create([
                'notification_id' => NotificationRepository::query()->where('type', NotificationTypeEnum::NewCourseFromInstructor)->first()->id,
                'recipient_id' => null,
                'course_id' => $course->id,
                'metadata' => json_encode($course),
                'url' => '/admin/course/show/' . $course->id,
                'content' => 'New course ' . $course->title . ' has been created by ' . Auth::user()->name,
            ]);

            foreach ($course->instructor->courses as $instructorCourse) {
                NotifyEvent::dispatch(NotificationTypeEnum::NewCourseFromInstructor->value, $course->id, [
                    'course' => $instructorCourse,
                    'course_name' => $course->title,
                ]);
            }
        }

        return back()->with('success', 'Course created');
        // return to_route('course.index')->with('success', 'Course created');
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

    public function update(CourseUpdateRequest $request, Course $course)
    {
        CourseRepository::updateByRequest($request, $course);
        if (isset($request->is_active)) {

            NotificationInstanceRepository::query()->updateOrCreate([
                'recipient_id' => null,
                'course_id' => $course->id,
                'notification_id' => NotificationRepository::query()->where('type', NotificationTypeEnum::NewCourseFromInstructor)->first()->id,
            ], [
                'metadata' => json_encode($course),
                'url' => '/admin/course/show/' . $course->id,
                'content' => 'New course ' . $course->title . ' has been created by ' . Auth::user()->name,
            ]);
            NotifyEvent::dispatch(NotificationTypeEnum::NewCourseFromInstructor->value, $course->id, [
                'course' => $course,
                'course_name' => $course->title,
            ]);
        }

        return to_route('course.index')->withSuccess('Course updated');
    }

    public function delete(Course $course)
    {

        $course->delete();

        return redirect()->route('course.index')->withSuccess('Course deleted');
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
}
