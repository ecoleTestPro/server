<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationInstanceResource;
use App\Repositories\NotificationInstanceRepository;
use Illuminate\Http\Request;

class NotificationController extends PrivateAbstractController
{
    public function index(Request $request)
    {
        $notifications = NotificationInstanceRepository::query()
            ->where(function ($query) {
                $userId = auth()->id();
                $query->whereNull('recipient_id');
                if ($userId) {
                    $query->orWhere('recipient_id', $userId);
                }
            })
            ->latest()
            ->limit(10)
            ->get();

        return response()->json([
            'notifications' => NotificationInstanceResource::collection($notifications),
        ]);
    }

    /**
     * Get all notifications for the authenticated user
     */
    public function all(Request $request)
    {
        $notifications = NotificationInstanceRepository::query()
            ->where(function ($query) {
                $userId = auth()->id();
                $query->whereNull('recipient_id');
                if ($userId) {
                    $query->orWhere('recipient_id', $userId);
                }
            })
            ->latest()
            ->paginate(20);

        return response()->json([
            'notifications' => NotificationInstanceResource::collection($notifications),
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ]
        ]);
    }

    /**
     * Mark a specific notification as read
     */
    public function markAsRead(Request $request, $id)
    {
        try {
            $userId = auth()->id();
            $notification = NotificationInstanceRepository::query()
                ->where('id', $id)
                ->where(function ($query) use ($userId) {
                    $query->whereNull('recipient_id')
                        ->orWhere('recipient_id', $userId);
                })
                ->firstOrFail();

            NotificationInstanceRepository::update($notification, ['is_read' => true]);

            return response()->json([
                'message' => 'Notification marked as read',
                'notification' => new NotificationInstanceResource($notification->fresh())
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Notification not found or access denied'
            ], 404);
        }
    }

    /**
     * Mark all notifications as read for the authenticated user
     */
    public function markAllAsRead(Request $request)
    {
        try {
            $userId = auth()->id();

            $updated = NotificationInstanceRepository::query()
                ->where(function ($query) use ($userId) {
                    $query->whereNull('recipient_id')
                        ->orWhere('recipient_id', $userId);
                })
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json([
                'message' => "Marked {$updated} notifications as read",
                'updated_count' => $updated
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error marking notifications as read'
            ], 500);
        }
    }

    /**
     * Delete a specific notification
     */
    public function delete(Request $request, $id)
    {
        try {
            $userId = auth()->id();
            $notification = NotificationInstanceRepository::query()
                ->where('id', $id)
                ->where(function ($query) use ($userId) {
                    $query->whereNull('recipient_id')
                        ->orWhere('recipient_id', $userId);
                })
                ->firstOrFail();

            NotificationInstanceRepository::delete($notification);

            return response()->json([
                'message' => 'Notification deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Notification not found or access denied'
            ], 404);
        }
    }

    /**
     * Clear all notifications for the authenticated user
     */
    public function clearAll(Request $request)
    {
        try {
            $userId = auth()->id();

            $deletedCount = NotificationInstanceRepository::query()
                ->where(function ($query) use ($userId) {
                    $query->whereNull('recipient_id')
                        ->orWhere('recipient_id', $userId);
                })
                ->count();

            NotificationInstanceRepository::query()
                ->where(function ($query) use ($userId) {
                    $query->whereNull('recipient_id')
                        ->orWhere('recipient_id', $userId);
                })
                ->delete();

            return response()->json([
                'message' => "Cleared {$deletedCount} notifications",
                'deleted_count' => $deletedCount
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error clearing notifications'
            ], 500);
        }
    }
}
