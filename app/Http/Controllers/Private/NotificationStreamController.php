<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Repositories\NotificationInstanceRepository;
use App\Http\Resources\NotificationInstanceResource;
use Illuminate\Http\Request;

class NotificationStreamController extends Controller
{
    /**
     * Get current notification count for polling
     */
    public function count(Request $request)
    {
        $userId = auth()->id();

        $unreadCount = NotificationInstanceRepository::query()
            ->where(function ($query) use ($userId) {
                $query->whereNull('recipient_id')
                      ->orWhere('recipient_id', $userId);
            })
            ->where('is_read', false)
            ->count();

        return response()->json([
            'unread_count' => $unreadCount
        ]);
    }

    /**
     * Check for new notifications since a given timestamp
     */
    public function checkNew(Request $request)
    {
        $userId = auth()->id();
        $lastCheck = $request->get('last_check', now()->subMinutes(5));

        $newNotifications = NotificationInstanceRepository::query()
            ->where(function ($query) use ($userId) {
                $query->whereNull('recipient_id')
                      ->orWhere('recipient_id', $userId);
            })
            ->where('created_at', '>', $lastCheck)
            ->latest('id')
            ->limit(10)
            ->get();

        return response()->json([
            'notifications' => NotificationInstanceResource::collection($newNotifications),
            'unread_count' => $this->getUnreadCount($userId),
            'has_new' => $newNotifications->count() > 0,
            'last_check' => now()->toISOString()
        ]);
    }

    /**
     * Get unread notification count for a user
     */
    private function getUnreadCount($userId): int
    {
        return NotificationInstanceRepository::query()
            ->where(function ($query) use ($userId) {
                $query->whereNull('recipient_id')
                      ->orWhere('recipient_id', $userId);
            })
            ->where('is_read', false)
            ->count();
    }
}
