<?php

namespace Database\Factories;

use App\Repositories\CouponRepository;
use App\Repositories\CourseRepository;
use App\Repositories\UserRepository;
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
        $course = CourseRepository::getAll()->random();
        // $course->load('course_sessions');
        $session = $course->course_sessions->random();
       

        return [
            'user_id'                   => UserRepository::getAll()->random()->id,
            'course_id'                 => $course->id,
            'course_session_id'         => $session->id,
            'mode'                      => fake()->randomElement(['online', 'in-person', 'hybrid']),
            'progress'                  => 0.00,
            'is_certificate_downloaded' => fake()->boolean(),
        ];
    }
}
