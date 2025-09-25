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

    public static function queryBase()
    {
        try {
            return static::query()
                ->with([
                    'category',
                    'course_sessions',
                    // 'nextSession',
                    'instructor.user',
                    'media',
                    'video',
                    'logo',
                    'organizationLogo'
                ]);
        } catch (\Exception $e) {
            throw new \Exception('Error initializing course query: ' . $e->getMessage());
        }
    }

    public static function findById($id)
    {
        try {
            $course = static::queryBase()
                ->where('id', $id)
                ->firstOrFail();

            if ($course && isset($course->description)) {
                $course->description = json_decode($course->description, true);
            }

            return $course;
        } catch (\Exception $e) {
            throw new \Exception('Error fetching course by ID: ' . $e->getMessage());
        }
    }

    public static function findAll($search = null)
    {
        try {
            return static::queryBase()
                ->when($search, function ($query) use ($search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhereHas('instructor.user', function ($query) use ($search) {
                            $query->where('name', 'like', '%' . $search . '%');
                        });
                })
                ->latest('id')
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses: ' . $e->getMessage());
            return [];
        }
    }

    public static function findAllBySearchText($searchText, $limit = 10)
    {
        try {
            return static::queryBase()
                ->where('title', 'like', '%' . $searchText . '%')
                ->orWhereHas('instructor.user', function ($query) use ($searchText) {
                    $query->where('name', 'like', '%' . $searchText . '%');
                })
                ->latest('id')
                ->take($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses by search text: ' . $e->getMessage());
        }
    }


    /**
     * Get featured courses
     *
     * @return \Illuminate\Support\Collection
     */
    public static function getFeaturedCourses($limit = 6)
    {
        try {
            return static::query()
                ->where('is_featured', true)
                ->with(['category', 'instructor', 'media', 'video'])
                ->latest('id')
                ->limit($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching featured courses: ' . $e->getMessage());
            return [];
        }
    }

    public static function getPopularCourses($limit = 6)
    {
        try {
            return static::query()
                ->with(['category', 'instructor', 'media', 'video'])
                ->latest('view_count')
                ->limit($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching popular courses: ' . $e->getMessage());
            return [];
        }
    }

    public static function incrementViewCount(Course $course): void
    {
        $course->increment('view_count');
    }

    /**
     * Get all courses by category id that have sessions.
     *
     * @param int $categoryId
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function findAllByCategoryId($categoryId, $limit = 10)
    {
        try {
            return static::queryBase()
                ->where('category_id', $categoryId)
                ->whereHas('course_sessions') // Only courses with sessions
                ->latest('id')
                ->take($limit)
                ->get();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses by category: ' . $e->getMessage());
        }
    }

    /**
     * Get all courses by category id that have sessions, sorted by nearest session date.
     *
     * @param int $categoryId
     * @param int $limit
     * @return \Illuminate\Support\Collection
     */
    public static function findAllByCategoryIdWithSessions($categoryId, $limit = 10)
    {
        try {
            return static::queryBase()
                ->where('category_id', $categoryId)
                ->whereHas('course_sessions', function($query) {
                    // Filtrer seulement les sessions futures ou en cours
                    $query->where('start_date', '>=', now()->subDays(7));
                })
                ->with(['course_sessions' => function($query) {
                    $query->where('start_date', '>=', now()->subDays(7))
                          ->orderBy('start_date', 'asc');
                }])
                ->get()
                ->sortBy(function($course) {
                    // Trier par la date de la prochaine session
                    $nextSession = $course->course_sessions->first();
                    return $nextSession ? $nextSession->start_date : now()->addYears(10);
                })
                ->take($limit)
                ->values();
        } catch (\Exception $e) {
            throw new \Exception('Error fetching courses with sessions by category: ' . $e->getMessage());
        }
    }

    /**
     * Retrieve a course by its slug.
     *
     * @param string $slug The slug of the course.
     * @return \App\Models\Course
     * @throws \Exception If the course cannot be found by slug.
     */
    public static function findBySlug($slug): ?Course
    {
        try {
            $course = static::queryBase()
                ->where('slug', $slug)
                ->firstOrFail();

            if ($course && isset($course->description)) {
                $course->description = json_decode($course->description, true);
            }

            return $course;
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
                ->with(['category', 'instructor', 'media', 'video'])
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

        $logo = $request->hasFile('logo') ? MediaRepository::storeByRequest(
            $request->file('logo'),
            'course/logo',
            MediaTypeEnum::IMAGE
        ) : null;

        $organizationLogo = $request->hasFile('organization_logo') ? MediaRepository::storeByRequest(
            $request->file('organization_logo'),
            'course/organization-logo',
            MediaTypeEnum::IMAGE
        ) : null;

        $video = $request->hasFile('video') ? MediaRepository::storeByRequest(
            $request->file('video'),
            'course/video',
            MediaTypeEnum::VIDEO
        ) : null;

        $galleryIds = [];
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $media = MediaRepository::storeByRequest(
                    $file,
                    'course/gallery',
                    self::getFileType($file)
                );
                $galleryIds[] = $media->id;
            }
        }

        // fix instructor_id
        $instructor = InstructorRepository::getDefaultInstructor();

        $is_published = (bool) $request->is_published;

        $course = self::create([
            'category_id'          => $request->category_id,
            'title'                => $request->title,
            'slug'                 => str($request->title)->slug(),
            'excerpt'              => $request->excerpt,
            'media_id'             => $media ? $media->id : null,
            'logo_id'              => $logo ? $logo->id : null,
            'organization_logo_id' => $organizationLogo ? $organizationLogo->id : null,
            'video_id'             => $video ? $video->id : null,
            'reference_tag'        => $request->reference_tag,
            'location_mode'        => $request->location_mode ?? 'En présentiel ou à distance',
            'periodicity_unit'     => $request->periodicity_unit,
            'periodicity_value'    => $request->periodicity_value,
            'duration'             => $request->duration,
            'attachment'           => $request->attachment,
            'lectures'             => $request->lectures,
            'description'          => $request->description ?? "", // json_encode($request->description)
            'regular_price'        => $request->regular_price,
            'price'                => $request->price,
            'instructor_id'        => $instructor ? $instructor->id : null, // $request->instructor_id,
            'is_published'         => $is_published,
            'published_at'         => $request->is_active ? now() : null
            //'is_active'     => $isActive,
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

        if ($galleryIds) {
            $course->gallery()->attach($galleryIds);
        }

        if ($request->partner_ids) {
            $course->partners()->sync($request->partner_ids);
        }

        return $course;
    }

    public static function updateByRequest(CourseUpdateRequest $request, Course $course)
    {
        try {
            $isActive = false;

            if (isset($request->is_active)) {
                $isActive = $request->is_active === "on" ?? true;
            }

            $media = $course->media;
            if ($request->hasFile('media')) {
                $media = MediaRepository::updateOrCreateByRequest(
                    $request->file('media'),
                    'course/thumbnail',
                    $media,
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

            $logo = $course->logo;
            if ($request->hasFile('logo')) {
                $logo = MediaRepository::updateOrCreateByRequest(
                    $request->file('logo'),
                    'course/logo',
                    $logo,
                    MediaTypeEnum::IMAGE
                );
            }

            $organizationLogo = $course->organizationLogo;
            if ($request->hasFile('organization_logo')) {
                $organizationLogo = MediaRepository::updateOrCreateByRequest(
                    $request->file('organization_logo'),
                    'course/organization-logo',
                    $organizationLogo,
                    MediaTypeEnum::IMAGE
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

            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $file) {
                    $media = MediaRepository::storeByRequest(
                        $file,
                        'course/gallery',
                        self::getFileType($file)
                    );
                    $course->gallery()->attach($media->id);
                }
            }

            if ($request->partner_ids) {
                $course->partners()->sync($request->partner_ids);
            }

            return self::update($course, [
                'category_id'          => $request->category_id ?? $course->category_id,
                'title'                => $request->title ?? $course->title,
                'slug'                 => str($request->title)->slug(),
                'excerpt'              => $request->excerpt,
                'media_id'             => $media ? $media->id : $course->media_id,
                'logo_id'              => $logo ? $logo->id : $course->logo_id,
                'organization_logo_id' => $organizationLogo ? $organizationLogo->id : $course->organization_logo_id,
                'video_id'             => $video ? $video->id : null,
                'reference_tag'        => $request->reference_tag ?? $course->reference_tag,
                'location_mode'        => $request->location_mode ?? $course->location_mode ?? 'En présentiel ou à distance',
                'periodicity_unit'     => $request->periodicity_unit ?? $course->periodicity_unit,
                'periodicity_value'    => $request->periodicity_value ?? $course->periodicity_value,
                'duration'             => $request->duration ?? $course->duration,
                'attachment'           => $request->attachment ?? $course->attachment,
                'lectures'             => $request->lectures ?? $course->lectures,
                'description'          => $request->description ?? $course->description,
                'regular_price'        => $request->regular_price ?? null,
                'price'                => $request->price,
                'instructor_id'        => $request->instructor_id ?? $course->instructor_id,
                'is_active'            => $isActive,
                'is_featured'          => filter_var($request->is_featured, FILTER_VALIDATE_BOOLEAN),
                'published_at'         => $request->is_active == 'on' ? now() : null
            ]);
        } catch (\Exception $e) {
            throw new \Exception('Error updating course: ' . $e->getMessage());
        }
    }

    private static function getFileType($file)
    {
        switch ($file->getClientMimeType()) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/jpg':
            case 'image/gif':
            case 'image/svg+xml':
                $mediaType = MediaTypeEnum::IMAGE;
                break;
            case 'video/mp4':
            case 'video/mpeg':
                $mediaType = MediaTypeEnum::VIDEO;
                break;
            default:
                $mediaType = MediaTypeEnum::IMAGE;
                break;
        }

        return $mediaType;
    }
}
