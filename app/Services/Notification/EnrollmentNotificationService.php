<?php

namespace App\Services\Notification;

use App\Enum\NotificationTypeEnum;
use App\Models\Enrollment;
use App\Repositories\NotificationInstanceRepository;
use App\Repositories\NotificationRepository;

class EnrollmentNotificationService
{
    private static $repository;

    public static function notifyEnrollmentStore(Enrollment $enrollment)
    {
        try {
            $notification = NotificationRepository::query()->where('type', NotificationTypeEnum::NewEnrollmentNotification->value)->first();
            if (!$notification) {
                // throw new \Exception('Notification not found for type: ' . NotificationTypeEnum::NewEnrollmentNotification->value);
            }
            $contentText = str_replace('{course_title}', $enrollment->course->title, $notification->content);
            // dd($contentText);


            NotificationInstanceRepository::create([
                'notification_id' => $notification->id,
                'recipient_id'    => null,
                'course_id'       => $enrollment->course->id,
                'metadata'        => json_encode($enrollment->course),
                'url'             => '/admin/enrollment/list', // TODO: Update with the correct URL
                'content'         => "Salut, Mr. " . $enrollment->user->name . ' votre inscription au cours ' . $enrollment->course->title . ' a bien été enregistrée.',
            ]);

            // Send notification to user
            NotificationInstanceRepository::create([
                'notification_id' => $notification->id,
                'recipient_id'    => $enrollment->user->id,
                'course_id'       => $enrollment->course->id,
                'metadata'        => json_encode($enrollment->course),
                'content'         => $contentText ?? "",
            ]);
        } catch (\Exception $e) {
            // throw new \Exception('Error creating notification for enrollment: ' . $e->getMessage());
        }
    }
}
