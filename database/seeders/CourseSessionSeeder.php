<?php

namespace Database\Seeders;

use App\Models\CourseSession;
use App\Models\Enrollment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CourseSession::factory()
            ->count(200)
            ->create();
    }
}
