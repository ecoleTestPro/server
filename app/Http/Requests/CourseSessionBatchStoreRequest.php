<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Repositories\CourseSessionRepository;
use App\Models\CourseSession;

class CourseSessionBatchStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sessions'                  => 'required|array|min:1',
            'sessions.*.start_date'     => 'required|date',
            'sessions.*.end_date'       => 'nullable|date|after_or_equal:sessions.*.start_date',
            'sessions.*.location'       => 'nullable|string',
            'sessions.*.price'          => 'nullable|numeric',
            'sessions.*.price_discount' => 'nullable|numeric',
            'sessions.*.tva'            => 'nullable|numeric',
            'sessions.*.course_id'      => 'required|exists:courses,id',
        ];
    }

    /**
     * Create CourseSession instances using CourseSessionRepository
     * 
     * @return array Array of created CourseSession instances
     * @throws \Exception
     */
    public function createCourseSessions(): array
    {
        $createdSessions = [];
        
        foreach ($this->validated('sessions') as $sessionData) {
            try {
                $session = CourseSessionRepository::create([
                    'course_id'      => $sessionData['course_id'],
                    'location'       => $sessionData['location'] ?? null,
                    'country'        => $sessionData['country'] ?? null,
                    'city'           => $sessionData['city'] ?? null,
                    'longitude'      => $sessionData['longitude'] ?? null,
                    'latitude'       => $sessionData['latitude'] ?? null,
                    'timezone'       => $sessionData['timezone'] ?? null,
                    'language'       => $sessionData['language'] ?? null,
                    'start_date'     => $sessionData['start_date'],
                    'end_date'       => $sessionData['end_date'] ?? null,
                    'price'          => $sessionData['price'] ?? null,
                    'price_discount' => $sessionData['price_discount'] ?? null,
                    'tva'            => $sessionData['tva'] ?? null,
                ]);
                
                $createdSessions[] = $session;
            } catch (\Exception $e) {
                throw new \Exception("Error creating course session: " . $e->getMessage());
            }
        }
        
        return $createdSessions;
    }


}
