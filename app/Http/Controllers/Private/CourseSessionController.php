<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseSessionBatchStoreRequest;
use App\Repositories\CourseSessionRepository;
use Illuminate\Http\JsonResponse;

class CourseSessionController extends Controller
{
    public function store(CourseSessionBatchStoreRequest $request): JsonResponse
    {
        $created = [];
        foreach ($request->validated('sessions') as $sessionData) {
            $created[] = CourseSessionRepository::create([
                'course_id' => $request->validated('course_id'),
                'location' => $sessionData['location'] ?? null,
                'country' => $sessionData['country'] ?? null,
                'city' => $sessionData['city'] ?? null,
                'longitude' => $sessionData['longitude'] ?? null,
                'latitude' => $sessionData['latitude'] ?? null,
                'timezone' => $sessionData['timezone'] ?? null,
                'language' => $sessionData['language'] ?? null,
                'start_date' => $sessionData['start_date'],
                'end_date' => $sessionData['end_date'] ?? null,
                'price' => $sessionData['price'] ?? 0,
                'price_discount' => $sessionData['price_discount'] ?? 0,
                'tva' => $sessionData['tva'] ?? 0,
            ]);
        }

        return response()->json(['sessions' => $created], 201);
    }
}
