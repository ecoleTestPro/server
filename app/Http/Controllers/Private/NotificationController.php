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
}
