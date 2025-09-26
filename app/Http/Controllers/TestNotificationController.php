<?php

namespace App\Http\Controllers;

use App\Repositories\NotificationInstanceRepository;
use Illuminate\Http\Request;

class TestNotificationController extends Controller
{
    /**
     * Create a test notification for the current user
     */
    public function createTestNotification(Request $request)
    {
        $userId = auth()->id();

        $notification = NotificationInstanceRepository::createAndBroadcast([
            'notification_id' => 1, // Vous pouvez créer une notification par défaut
            'recipient_id' => $userId,
            'heading' => 'Test de notification en temps réel',
            'content' => 'Ceci est un test de notification créé à ' . now()->format('H:i:s'),
            'is_read' => false,
            'metadata' => json_encode([
                'type' => 'test',
                'created_by' => 'system'
            ])
        ]);

        return response()->json([
            'message' => 'Test notification created successfully',
            'notification' => $notification
        ]);
    }

    /**
     * Create a general test notification for all users
     */
    public function createGeneralTestNotification(Request $request)
    {
        $notification = NotificationInstanceRepository::createAndBroadcast([
            'notification_id' => 1,
            'recipient_id' => null, // Pour tous les utilisateurs
            'heading' => 'Notification générale',
            'content' => 'Notification pour tous les utilisateurs créée à ' . now()->format('H:i:s'),
            'is_read' => false,
            'metadata' => json_encode([
                'type' => 'general',
                'created_by' => 'admin'
            ])
        ]);

        return response()->json([
            'message' => 'General test notification created successfully',
            'notification' => $notification
        ]);
    }
}
