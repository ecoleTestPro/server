<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\NotificationInstance;

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
}
