<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use PHPUnit\Event\Code\Test;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            InstructorSeeder::class,

            NotificationSeeder::class,

            CategorySeeder::class,
            CourseSeeder::class,
            CourseSessionSeeder::class,
            CourseSessionScheduleSeeder::class,
            // GuestSeeder::class,

            EnrollmentSeeder::class,

            BlogCategorySeeder::class,
            BlogSeeder::class,
            // Other seeders can be added here

            TestimonialSeeder::class,
            FaqSeeder::class,
            JobOfferSeeder::class,
        ]);
    }
}
