<?php

namespace Database\Seeders;

use App\Models\Enrollment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (\App\Models\Course::has('course_sessions')->count() === 0) {
            $this->command->warn('Skipping EnrollmentSeeder: no course sessions available.');
            return;
        }

        if (\App\Models\User::count() === 0) {
            $this->command->warn('Skipping EnrollmentSeeder: no users available.');
            return;
        }

        Enrollment::factory()
            ->count(100)
            ->create();
    }
}
