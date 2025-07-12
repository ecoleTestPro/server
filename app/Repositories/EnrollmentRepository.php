<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseEnrollmentStoreRequest;
use App\Models\Enrollment;
use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;

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

            $session = CourseSessionRepository::getById($request->course_session_id);
            if (!$session || $session->course_id !== $course->id) {
                throw new \Exception('Session de formation invalide.');
            }

            return self::create([
                'user_id'           => $request->user_id,
                'course_id'         => $request->course_id,
                'course_session_id' => $request->course_session_id,
                'mode'              => $request->mode,
                'last_activity'     => now(),
                'is_certificate_downloaded' => false,
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Error creating enrollment: ' . $e->getMessage());
        }
    }
}
