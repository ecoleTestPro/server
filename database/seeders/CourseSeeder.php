<?php

namespace Database\Seeders;

use App\Repositories\CourseRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class CourseSeeder extends Seeder
{

    public function run()
    {
        try {
        } catch (\Exception $e) {
            Log::error('CourseSeeder failed: ' . $e->getMessage());
        }
    }
}
