<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseSessionStoreRequest;
use App\Models\CourseSessionSchedule;
use App\Models\Enrollment;

class CourseSessionScheduleRepository extends Repository
{
    public static function model()
    {
        return CourseSessionSchedule::class;
    }

    // public static function store(CourseSessionStoreRequest $request): Enrollment
    // {
    //     try {
    //         // $course = CourseRepository::findById($request->course_id);
    //         // if (!$course) {
    //         //     throw new \Exception('Formation introuvable.');
    //         // }

    //         // $course_price = $course->price;

    //         // return self::create([
    //         // ]);
    //     } catch (\Exception $e) {
    //         throw new \Exception('Error creating enrollment: ' . $e->getMessage());
    //     }
    // }
}
