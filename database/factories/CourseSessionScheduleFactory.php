<?php

namespace Database\Factories;

use App\Repositories\CourseRepository;
use App\Repositories\CourseSessionRepository;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CourseSessionScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        try {
            $course_session = CourseSessionRepository::getAll()->random();
            $course = CourseRepository::findById($course_session->course_id);

            $startDate = Carbon::parse($course_session->start_date)->addHours(rand(3, 5));
            $endDate = $this->faker->dateTimeBetween($startDate, Carbon::instance($startDate)->addHours(4));

            return [
                'course_session_id' => $course_session->id,
                'start_time'        => $startDate,
                'end_time'          => $endDate,
                'date'              => $startDate->format('Y-m-d'),
                'title'             => $course->title,
                'description'       => $this->faker->paragraph(),
            ];
        } catch (\Exception $e) {
            throw new \Exception("Error generating CourseSessionSchedule: " . $e->getMessage());
        }
    }
}
