<?php

namespace Database\Seeders;

use App\Models\CourseSessionSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSessionScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CourseSessionSchedule::factory()
            ->count(500)
            ->create();
    }
}
