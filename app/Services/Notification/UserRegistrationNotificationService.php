<?php

namespace App\Services\Notification;

use App\Enum\NotificationTypeEnum;
use App\Models\User;
use App\Repositories\NotificationInstanceRepository;
use App\Repositories\NotificationRepository;

class UserRegistrationNotificationService
{
    public static function notifyUserRegistered(User $user)
    {
        try {
            $notification = NotificationRepository::query()
                ->where('type', NotificationTypeEnum::NewUserRegistered->value)
                ->first();

            if (!$notification) {
                return;
            }

            $contentText = str_replace('{user_name}', $user->name, $notification->content);

            NotificationInstanceRepository::create([
                'notification_id' => $notification->id,
                'recipient_id'    => null,
                'course_id'       => null,
                'metadata'        => json_encode($user),
                'content'         => $contentText,
            ]);
        } catch (\Exception $e) {
            // Fail silently
        }
    }
}
