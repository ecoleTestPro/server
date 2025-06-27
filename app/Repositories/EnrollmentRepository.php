<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseEnrollmentStoreRequest;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\UserContentView;

class EnrollmentRepository extends Repository
{
    public static function model()
    {
        return Enrollment::class;
    }

    public static function store(CourseEnrollmentStoreRequest $request): Enrollment
    {
        try {
            $course = CourseRepository::findById($request->course_id);
            if (!$course) {
                throw new \Exception('Formation introuvable.');
            }

            $course_price = $course->price;
            $discount_amount = $request->discount_amount ?? 0;

            return self::create([
                'user_id'                   => $request->user_id,
                'course_id'                 => $request->course_id,
                'mode'                      => $request->mode,
                'course_price'              => $course_price,
                'discount_amount'           => $discount_amount,
                'last_activity'             => now(),
                'is_certificate_downloaded' => false,
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Error creating enrollment: ' . $e->getMessage());
        }
    }

    /*
        public static function updateProgress(Course $course, User $user)
        {
            $totalContents = $course->chapters->flatMap->contents->pluck('id')->unique()->count();

            $viewedContents = UserContentView::where('user_id', $user->id)
                ->whereIn('content_id', $course->chapters->flatMap->contents->pluck('id')->unique())
                ->pluck('content_id')
                ->unique()
                ->count();

            $progress = $totalContents > 0 ? min(($viewedContents / $totalContents) * 100, 100) : 0;

            $enrollment = EnrollmentRepository::query()
                ->where('course_id', '=', $course->id)
                ->where('user_id', '=', $user->id)
                ->first();
            // EnrollmentRepository::update($enrollment, ['course_progress' => round($progress, 2), 'last_activity' => now()]);
            if ($enrollment) {
                EnrollmentRepository::update($enrollment, [
                    'course_progress' => round($progress, 2),
                    'last_activity' => now()
                ]);
            }
        }
    */
}
