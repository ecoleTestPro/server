<?php

namespace Database\Seeders\slice;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Repositories\CourseRepository;
use Illuminate\Support\Facades\Log;

abstract class AbstractCourseCategorySeeder
{
    /**
     *  The category to which the courses will be associated.
     *
     * @var Category|null
     */
    protected Category $category;

    /**
     * The courses to be seeded for the current category.
     *
     * @var array
     */
    protected array $courses;

    /**
     * Constructs an array representing a course with the given data.
     *
     * @param array $data An associative array containing course data, which may include:
     *                    - 'title' (string): The title of the course.
     *                    - 'slug' (string): The URL-friendly version of the course title.
     *                    - 'excerpt' (string, optional): A short description of the course.
     *                    - 'is_featured' (bool, optional): Whether the course is featured.
     *                    - 'is_published' (bool, optional): Whether the course is published.
     *                    - 'periodicity_unit' (string, optional): The unit of time for the course periodicity.
     *                    - 'periodicity_value' (int, optional): The value of time for the course periodicity.
     *                    - 'price_includes_tax' (bool, optional): Whether the price includes tax.
     *                    - 'regular_price' (int, optional): The standard price of the course.
     *                    - 'price' (int, optional): The discounted price of the course.
     *                    - 'duration' (int, optional): The duration of the course in days.
     *                    - 'description' (string, optional): A detailed description of the course in JSON format.
     *
     * @return array An associative array containing the constructed course data.
     * @throws \InvalidArgumentException If required fields are missing or invalid.
     */
    protected function buildCourse(array $data): array
    {
        if (empty($data['title']) || empty($data['slug'])) {
            throw new \InvalidArgumentException('Title and slug are required fields.');
        }

        if (!$this->category || !isset($this->category->id)) {
            throw new \InvalidArgumentException('Category is not set or invalid.');
        }

        return [
            'title'              => $data['title'],
            'slug'               => $data['slug'],
            'excerpt'            => $data['excerpt'] ?? '',
            'level'              => $data['level'] ?? '',
            'is_featured'        => $data['is_featured'] ?? false,
            'is_published'       => $data['is_published'] ?? true,
            'location_mode'      => "En présentiel à Abidjan ou classe à distance",
            'attachment'         => 'Livre de référence',
            'periodicity_unit'   => $data['periodicity_unit'] ?? 'DAY',
            'periodicity_value'  => $data['periodicity_value'] ?? 5,
            'price_includes_tax' => $data['price_includes_tax'] ?? false,
            'regular_price'      => $data['regular_price'] ?? 1000000,
            'price'              => $data['price'] ?? 650000,
            'published_at'       => now(),
            'duration'           => $data['duration'] ?? 2,
            'category_id'        => $this->category->id,
            'instructor_id'      => 1,
            'description'        => $data['description'] ?? json_encode(['content' => '']),
        ];
    }

    protected function saveCourse()
    {
        foreach ($this->courses as $key => $course) {
            if (isset($course) && is_array($course)) {
                try {
                    CourseRepository::query()->updateOrCreate($course);
                } catch (\Exception $e) {
                    Log::error('Error while creating course: ' . $e->getMessage());
                }
            }
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->saveCourse();
    }
}
