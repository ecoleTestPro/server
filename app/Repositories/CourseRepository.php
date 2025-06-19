<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Enum\MediaTypeEnum;
use App\Http\Requests\CourseStoreRequest;
use App\Http\Requests\CourseUpdateRequest;
use App\Models\Course;

class CourseRepository extends Repository
{
    public static function model()
    {
        return Course::class;
    }

    public static function findAll($user, $search = null)
    {
        try {
            $query = static::query();

            if ($user && $user->hasRole('admin')) {
                $query = $query
                    ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                        $query->where('instructor_id', $user->instructor?->id);
                    });
            }

            return $query
                ->when($search, function ($query) use ($search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhereHas('instructor.user', function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                        });
                })
                ->latest('id')
                ->withTrashed()
                ->paginate(10)
                ->withQueryString();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses: ' . $e->getMessage());
            return [];
        }
    }


    /**
     * Get featured courses
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getFeaturedCourses()
    {
        try {
            return static::query()
                ->where('is_featured', true)
                ->latest('id')
                ->limit(6)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching featured courses: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Get all courses by category id.
     *
     * @param int $categoryId
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function findAllByCategoryId($categoryId, $limit = 10)
    {
        try {

            return static::query()
                // ->whereNull('parent_id')
                ->where('category_id', $categoryId)
                ->latest('id')
                // ->with('image')
                ->take($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses by category: ' . $e->getMessage());
        }
    }

    public static function findBySlug($slug)
    {
        try {
            return static::query()
                ->where('slug', $slug)
                ->with(['category', 'instructor.user', 'media', 'video'])
                ->firstOrFail();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching course by slug: ' . $e->getMessage());
        }
    }

    /**
     * Get all courses by category slug.
     *
     * @param string $categorySlug
     * @return \Illuminate\Support\Collection
     */
    public static function findAllByCategorySlug($categorySlug, $limit = 10)
    {
        try {

            return static::query()
                ->whereHas('category', function ($query) use ($categorySlug) {
                    $query->where('slug', $categorySlug);
                })
                ->latest('id')
                // ->with('image')
                ->take($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses by category: ' . $e->getMessage());
        }
    }

    public static function storeByRequest(CourseStoreRequest $request)
    {
        $isActive = false;

        if (isset($request->is_active)) {
            $isActive = $request->is_active === "on" ?? true;
        }

        $media = $request->hasFile('media') ? MediaRepository::storeByRequest(
            $request->file('media'),
            'course/thumbnail',
            MediaTypeEnum::IMAGE
        ) : null;

        $video = $request->hasFile('video') ? MediaRepository::storeByRequest(
            $request->file('video'),
            'course/video',
            MediaTypeEnum::VIDEO
        ) : null;

        // fix instructor_id
        $instructor = InstructorRepository::getDefaultInstructor();

        $course = self::create([
            'category_id'   => $request->category_id,
            'title'         => $request->title,
            'media_id'      => $media ? $media->id : null,
            'video_id'      => $video ? $video->id : null,
            'description'   => $request->description ?? "", // json_encode($request->description)
            'regular_price' => $request->regular_price,
            'price'         => $request->price,
            'instructor_id' => $instructor ? $instructor->id : null, // $request->instructor_id,
            'is_active'     => $isActive,
            'published_at'  => $request->is_active ? now() : null
        ]);

        foreach ($request->chapters ?? [] as $requestChapter) {
            $chapter = ChapterRepository::create([
                'title' => $requestChapter['title'],
                'serial_number' => $requestChapter['serial_number'],
                'course_id' => $course->id
            ]);

            foreach ($requestChapter['contents'] as $requestContent) {
                $contentMedia = isset($requestContent['media']) ? MediaRepository::storeByRequest(
                    $requestContent['media'],
                    'course/chapter/content/media',
                    MediaTypeEnum::IMAGE
                ) : null;

                ContentRepository::create([
                    'chapter_id' => $chapter->id,
                    'media_id' => $contentMedia ? $contentMedia->id : null,
                    'title' => $requestContent['title'],
                    'type' => $requestContent['type'],
                    'serial_number' => $requestContent['serial_number']
                ]);
            }
        }

        return $course;
    }

    public static function updateByRequest(CourseUpdateRequest $request, Course $course)
    {

        $isActive = false;

        if (isset($request->is_active)) {
            $isActive = $request->is_active === "on" ?? true;
        }

        $media = $course->media;
        if ($request->hasFile('media')) {
            $media = MediaRepository::updateByRequest(
                $request->file('media'),
                $media,
                'course/thumbnail',
                MediaTypeEnum::IMAGE
            );
        }

        $video = $course->video;
        if ($request->hasFile('video')) {
            $video = MediaRepository::updateOrCreateByRequest(
                $request->file('video'),
                'course/video',
                $video,
                MediaTypeEnum::VIDEO
            );
        }

        if ($course->video) {
            $video = $request->hasFile('video') ? MediaRepository::updateByRequest(
                $request->file('video'),
                $course->video,
                'course/video',
                MediaTypeEnum::VIDEO
            ) : $course->video;
        } else {
            $video = $request->hasFile('video') ? MediaRepository::storeByRequest(
                $request->file('video'),
                'course/video',
                MediaTypeEnum::VIDEO
            ) : null;
        }

        return self::update($course, [
            'category_id' => $request->category_id ?? $course->category_id,
            'title' => $request->title ?? $course->title,
            'media_id' => $media ? $media->id : $course->media->id,
            'video_id' => $video ? $video->id : null,
            'description' => json_encode($request->description) ?? $course->description,
            'regular_price' => $request->regular_price ?? null,
            'price' => $request->price,
            'instructor_id' => $request->instructor_id ?? $course->instructor_id,
            'is_active' => $isActive,
            'published_at' => $request->is_active == 'on' ? now() : null
        ]);
    }
}
