<?php

namespace App\Services\Notification;

use App\Enum\NotificationTypeEnum;
use App\Events\NotifyEvent;
use App\Models\Course;
use App\Repositories\NotificationInstanceRepository;
use App\Repositories\NotificationRepository;
use Illuminate\Support\Facades\Auth;

class CourseStoreNotificationService
{
    /**
     * Create a new notification for a course when it is stored.
     * 
     * This function will create a notification instance for the course, and then dispatch a NotifyEvent to all the instructors of the courses of the instructor who created this course.
     * 
     * @param Course $course The course that has been stored.
     * 
     * @return void
     */
    public static function notifyCourseStore(Course $course)
    {
        try {
            NotificationInstanceRepository::create([
                'notification_id' => NotificationRepository::query()->where('type', NotificationTypeEnum::NewCourseFromInstructor)->first()->id,
                'recipient_id'    => null,
                'course_id'       => $course->id,
                'metadata'        => json_encode($course),
                'url'             => route('dashboard.course.show', ['id' => $course->id]),
                'content'         => 'New course ' . $course->title . ' has been created by ' . Auth::user()->name,
            ]);

            foreach ($course->instructor->courses as $instructorCourse) {
                NotifyEvent::dispatch(NotificationTypeEnum::NewCourseFromInstructor->value, $course->id, [
                    'course' => $instructorCourse,
                    'course_name' => $course->title,
                ]);
            }
        } catch (\Exception $e) {
            // Handle exception if needed
        }
    }


    public static function notifyCourseUpdate(Course $course)
    {
        try {
            NotificationInstanceRepository::query()->updateOrCreate(
                [
                    'recipient_id' => null,
                    'course_id' => $course->id,
                    'notification_id' => NotificationRepository::query()->where(
                        'type',
                        NotificationTypeEnum::NewCourseFromInstructor
                    )->first()->id,
                ],
                [
                    'metadata' => json_encode($course),
                    'url' => route('dashboard.course.show', ['id' => $course->id]),
                    'content' => 'New course ' . $course->title . ' has been created by ' . Auth::user()->name,
                ]
            );
            NotifyEvent::dispatch(
                NotificationTypeEnum::NewCourseFromInstructor->value,
                $course->id,
                [
                    'course' => $course,
                    'course_name' => $course->title,
                ]
            );
        } catch (\Exception $e) {
            // Handle exception if needed
        }
    }
}
