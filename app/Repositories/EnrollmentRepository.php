<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseEnrollmentStoreRequest;
use App\Models\Enrollment;
use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;
use Illuminate\Support\Facades\Auth;

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

            // Déterminer l'ID utilisateur (utilisateur connecté ou null)
            $userId = $request->user_id ?: Auth::id();
            
            $enrollmentData = [
                'user_id'           => $userId,
                'course_id'         => $request->course_id,
                'course_session_id' => $request->course_session_id,
                'mode'              => $request->mode,
                'is_certificate_downloaded' => false,
            ];

            // Si l'utilisateur n'est pas connecté, stocker ses informations
            if (!$userId) {
                $enrollmentData['user_fullname'] = $request->name;
                $enrollmentData['user_email'] = $request->email;
                $enrollmentData['user_phone'] = $request->phone;
            } else {
                // Si l'utilisateur est connecté, on peut aussi stocker ses infos pour référence
                $enrollmentData['user_fullname'] = $request->name ?: Auth::user()->name;
                $enrollmentData['user_email'] = $request->email ?: Auth::user()->email;
                $enrollmentData['user_phone'] = $request->phone ?: Auth::user()->phone;
            }

            return self::create($enrollmentData);
        } catch (\Exception $e) {
            throw new \Exception('Error creating enrollment: ' . $e->getMessage());
        }
    }
}
