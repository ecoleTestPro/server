<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Http\Requests\CourseSessionStoreRequest;
use App\Models\CourseSession;

class CourseSessionRepository extends Repository
{
    public static function model()
    {
        return CourseSession::class;
    }

    public static function store(CourseSessionStoreRequest $request): CourseSession
    {
        try {
            $course = CourseRepository::findById($request->course_id);
            if (!$course) {
                throw new \Exception('Formation introuvable.');
            }

            $course_price = $course->price;

            return self::create([
                'course_id'      => $request->course_id,
                'location'       => $request->location ?? null,
                'country'        => $request->country ?? null,
                'city'           => $request->city ?? null,
                'longitude'      => $request->longitude ?? null,
                'latitude'       => $request->latitude ?? null,
                'timezone'       => $request->timezone ?? null,
                'language'       => $request->language ?? null,
                'start_date'     => $request->start_date,
                'end_date'       => $request->end_date ?? null,
                'price'          => $request->price ?? null,
                'price_discount' => $request->price_discount ?? null,
                'tva'            => $request->tva ?? null,
                'mode'           => $request->mode ?? null,
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Error creating enrollment: ' . $e->getMessage());
        }
    }
}
