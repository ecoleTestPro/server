<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Repositories\EnrollmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;

        $enrollments = EnrollmentRepository::query()
            ->when($search, function ($query) use ($search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('course', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            })
            ->with(['user', 'course', 'course_session'])
            ->withTrashed()
            ->latest('id')
            ->paginate(99999)
            ->withQueryString();

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

        $chartData = [];
        for ($month = 1; $month <= 12; $month++) {
            $chartData[] = $enrollmentData[$month] ?? 0;
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
        ];

        $data = [
            'enrollments' => $enrollments,
            'chart_data' => $chart_data,
        ];

        return Inertia::render('dashboard/enrollments/index', [
            'data' => $data,
        ]);
    }

    public function destroy(Enrollment $enrollment)
    {
        $enrollment->delete();
        return back()->withSuccess('Enrollment deleted successfully.');
    }
}
