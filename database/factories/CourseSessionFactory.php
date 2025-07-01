<?php

namespace Database\Factories;

use App\Repositories\CourseRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = CourseRepository::getAll()->random();

        // Generate start_date at least 2 days from now
        $startDate = $this->faker->dateTimeBetween('+1 days', '+2 days');

        // Generate end_date after start_date (e.g., between 1 and 7 days after start_date)
        // $endDate = $this->faker->dateTimeBetween(
        //     $startDate->modify('+3 days')->format('Y-m-d H:i:s'),
        //     $startDate->modify('+6 days')->format('Y-m-d H:i:s')
        // );

        $endDate = Carbon::instance($startDate)->addDays($this->faker->numberBetween(1, 7))->format('Y-m-d H:i:s');

        return [
            'course_id'      => $course->id,
            'location'       => "Abidjan, Cote d'Ivoire", // fake()->city(),
            'country'        => "Cote d'Ivoire", // fake()->country(),
            'city'           => "Abidjan", // fake()->city(),
            'longitude'      => "-4.0083", // fake()->longitude(),
            'latitude'       => "5.3453", // fake()->latitude(),
            'timezone'       => "Africa/Abidjan", // fake()->timezone(),
            'language'       => "fr", // fake()->language(),
            'start_date'     => $startDate,
            'end_date'       => $endDate,
            'price'          => $course->regular_price,
            'price_discount' => $course->price,
            'tva'            => 18, // Assuming a fixed TVA rate of 18%
            // 'mode'           => $this->faker->randomElement(['online', 'in-person', 'hybrid']),
        ];
    }
}
