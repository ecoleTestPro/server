<?php

namespace App\Http\Controllers\Private;

use App\Enum\MediaTypeEnum;
use App\Enum\NotificationTypeEnum;
use App\Events\NotifyEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Models\Course;
use App\Models\Enrollment;
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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends PrivateAbstractController
{
    public function index(Request $request)
    {
        $data = [];
        $users = [
            'total'        => User::where('is_admin', false)->count(),
            'last_30_days' => User::where('is_admin', false)->where('created_at', '>=', now()->subDays(30))->count(),
        ];

        $admin_users =  [
            'total'        => User::where('is_admin', true)->count(),
        ];

        $courses = [
            'total' => Course::where('is_published', 1)->count(),
        ];

        $enrollments = [
            'total' => Enrollment::count(),
            'last_30_days' => Enrollment::where('created_at', '>=', now()->subDays(30))->count(),
        ];

        $notifications = [
            'unread_count' => NotificationInstanceRepository::unreadCount(),
        ];

        // Fetch enrollment data for the current year, grouped by month
        $currentYear = now()->year;
        $enrollmentData = Enrollment::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        // Prepare data for all 12 months (fill missing months with 0)
        $chartData = [];
        for ($month = 1; $month <= 12; $month++) {
            $chartData[] = isset($enrollmentData[$month]) ? $enrollmentData[$month] : 0;
        }

        // Fetch courses created data for the current year, grouped by month
        $courseData = Course::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();

        $courseChartData = [];
        for ($month = 1; $month <= 12; $month++) {
            $courseChartData[] = isset($courseData[$month]) ? $courseData[$month] : 0;
        }

        $chart_data = [
            'enrollment_area' => [
                'series' => [
                    [
                        'name' => 'Enrollments',
                        'data' => $chartData,
                    ],
                ],
                'categories' => [
                    "$currentYear-01-01T00:00:00.000Z",
                    "$currentYear-02-01T00:00:00.000Z",
                    "$currentYear-03-01T00:00:00.000Z",
                    "$currentYear-04-01T00:00:00.000Z",
                    "$currentYear-05-01T00:00:00.000Z",
                    "$currentYear-06-01T00:00:00.000Z",
                    "$currentYear-07-01T00:00:00.000Z",
                    "$currentYear-08-01T00:00:00.000Z",
                    "$currentYear-09-01T00:00:00.000Z",
                    "$currentYear-10-01T00:00:00.000Z",
                    "$currentYear-11-01T00:00:00.000Z",
                    "$currentYear-12-01T00:00:00.000Z",
                ],
            ],
            'course_area' => [
                'series' => [
                    [
                        'name' => 'Courses',
                        'data' => $courseChartData,
                    ],
                ],
                'categories' => [
                    "$currentYear-01-01T00:00:00.000Z",
                    "$currentYear-02-01T00:00:00.000Z",
                    "$currentYear-03-01T00:00:00.000Z",
                    "$currentYear-04-01T00:00:00.000Z",
                    "$currentYear-05-01T00:00:00.000Z",
                    "$currentYear-06-01T00:00:00.000Z",
                    "$currentYear-07-01T00:00:00.000Z",
                    "$currentYear-08-01T00:00:00.000Z",
                    "$currentYear-09-01T00:00:00.000Z",
                    "$currentYear-10-01T00:00:00.000Z",
                    "$currentYear-11-01T00:00:00.000Z",
                    "$currentYear-12-01T00:00:00.000Z",
                ],
            ],
        ];

        // dd($chart_data);
        


        $data['users'] = $users;
        $data['admin_users'] = $admin_users;
        $data['courses'] = $courses;
        $data['enrollments'] = $enrollments;
        $data['notifications'] = $notifications;
        $data['chart_data'] = $chart_data;
        return Inertia::render('dashboard/dashboard.home', [
            'data' => $data,
        ]);
    }
}
