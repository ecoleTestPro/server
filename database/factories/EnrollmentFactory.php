<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $courses = \App\Models\Course::has('course_sessions')
            ->with('course_sessions')
            ->get();

        if ($courses->isEmpty()) {
            throw new \Exception('No courses with sessions available');
        }

        $course = $courses->random();
        $session = $course->course_sessions->random();
       

        return [
            'user_id'                   => \App\Models\User::inRandomOrder()->first()->id,
            'course_id'                 => $course->id,
            'course_session_id'         => $session->id,
            'mode'                      => fake()->randomElement(['online', 'in-person', 'hybrid']), 
            'is_certificate_downloaded' => fake()->boolean(),
        ];
    }
}
