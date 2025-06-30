<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseEnrollmentStoreRequest;
use App\Models\Enrollment;

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
}
