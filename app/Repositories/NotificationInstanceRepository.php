<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\NotificationInstance;
use App\Events\NotificationCreated;

class NotificationInstanceRepository extends Repository
{
    public static function model()
    {
        return NotificationInstance::class;
    }

    /**
     * Return the count of unread notifications.
     *
     * @return int
     */
    public static function unreadCount()
    {
        return self::query()->where('is_read', false)->count();
    }

    /**
     * Create a notification and broadcast it
     *
     * @param array $data
     * @return NotificationInstance
     */
    public static function createAndBroadcast(array $data): NotificationInstance
    {
        $notification = self::create($data);

        // Déclencher l'événement de broadcast
        event(new NotificationCreated($notification, $data['recipient_id'] ?? null));

        return $notification;
    }
}
