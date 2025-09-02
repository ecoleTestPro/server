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
        try {
            $created = [];
            $validatedData = $request->validated();

            foreach ($validatedData['sessions'] as $sessionData) {
                // Ensure course_id is present and valid
                if (!isset($sessionData['course_id'])) {
                    throw new \Exception('course_id is missing from session data');
                }
                // dd($sessionData);

                $storeRequest = new \App\Http\Requests\CourseSessionStoreRequest([
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
                $created[] = CourseSessionRepository::store($storeRequest)->toArray();
            }

            return response()->json(['sessions' => $created], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create course sessions: ' . $e->getMessage()], 500);
        }
    }

    public function update(\Illuminate\Http\Request $request, $session): JsonResponse
    {
        try {
            $sessionModel = \App\Models\CourseSession::findOrFail($session);
            
            $sessionModel->update([
                'location'       => $request->location ?? null,
                'country'        => $request->country ?? null,
                'city'           => $request->city ?? null,
                'longitude'      => $request->longitude ?? null,
                'latitude'       => $request->latitude ?? null,
                'timezone'       => $request->timezone ?? null,
                'language'       => $request->language ?? null,
                'start_date'     => $request->start_date,
                'end_date'       => $request->end_date ?? null,
                'price'          => $request->price ?? 0,
                'price_discount' => $request->price_discount ?? 0,
                'tva'            => $request->tva ?? 0,
            ]);

            return response()->json(['session' => $sessionModel], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update course session: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($session): JsonResponse
    {
        try {
            $sessionModel = \App\Models\CourseSession::findOrFail($session);
            $sessionModel->delete();

            return response()->json(['message' => 'Session deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete course session: ' . $e->getMessage()], 500);
        }
    }

    public function destroyMultiple(\Illuminate\Http\Request $request): JsonResponse
    {
        try {
            $sessionIds = $request->input('session_ids', []);
            
            if (empty($sessionIds)) {
                return response()->json(['error' => 'No session IDs provided'], 400);
            }

            // Vérifier que les IDs sont valides
            if (!is_array($sessionIds)) {
                return response()->json(['error' => 'session_ids must be an array'], 400);
            }

            // Vérifier que les sessions existent avant de les supprimer
            $existingSessions = \App\Models\CourseSession::whereIn('id', $sessionIds)->get();
            
            if ($existingSessions->isEmpty()) {
                return response()->json(['error' => 'No sessions found with provided IDs'], 404);
            }

            if ($existingSessions->count() !== count($sessionIds)) {
                return response()->json(['error' => 'Some session IDs were not found'], 404);
            }

            // Supprimer les sessions
            $deletedCount = \App\Models\CourseSession::whereIn('id', $sessionIds)->delete();

            return response()->json([
                'message' => 'Sessions deleted successfully',
                'deleted_count' => $deletedCount
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Failed to delete course sessions', [
                'error' => $e->getMessage(),
                'session_ids' => $request->input('session_ids', []),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json(['error' => 'Failed to delete course sessions: ' . $e->getMessage()], 500);
        }
    }
}
