<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Repositories\BlogCategoryRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // BlogCategory::factory()
        //     ->count(10)
        //     ->create();

        $categories = [
            ['name' => 'Actualité', "slug" => "actualite", 'status' => true],
            ['name' => 'Tests', "slug" => "tests", 'status' => true],
        ];

        foreach ($categories as $category) {
            BlogCategoryRepository::create($category);
        }
    }
}
