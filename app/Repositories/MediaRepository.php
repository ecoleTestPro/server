<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaRepository extends Repository
{

    /**
     * base method
     *
     * @method model()
     */
    public static function model()
    {
        return Media::class;
    }

    public static function storeByRequest(UploadedFile $file, $path, $type = null): Media
    {
        $src = Storage::disk('public')->put('/' . trim($path, '/'), $file);

        return self::create([
            'extension' => $file->extension(),
            'src' => $src,
            'path' => $path,
            'type' => $type,
        ]);
    }

    // this for local path file update

    public static function storeByPath($filePath, $path, $type = null): Media
    {
        // Read the file content from the provided path
        $fileContents = file_get_contents($filePath);
        $fileName = basename($filePath); // Get the filename

        // Use Storage to put the file content into the specified directory
        $src = Storage::disk('public')->put('/' . trim($path, '/') . '/' . $fileName, $fileContents);

        // Return a new Media record with the stored file details
        return self::create([
            'extension' => pathinfo($filePath, PATHINFO_EXTENSION), // Get the extension from file path
            'src' => $src,
            'path' => $path,
            'type' => $type,
        ]);
    }

    public static function updateByRequest(UploadedFile $file, Media $media, $path, $type = null): Media
    {
        $src = Storage::disk('public')->put('/' . trim($path, '/'), $file);
        if (Storage::disk('public')->exists($media->src)) {
            Storage::disk('public')->delete($media->src);
        }

        self::update($media, [
            'extension' => $file->extension(),
            'src' => $src,
            'path' => $path,
            'type' => $type,
        ]);

        return $media;
    }

    public static function updateOrCreateByRequest(UploadedFile $file, $path, $media = null, $type = null): Media
    {
        $src = Storage::disk('public')->put('/' . trim($path, '/'), $file);
        if ($media && Storage::disk('public')->exists($media->src)) {
            Storage::disk('public')->delete($media->src);
        }

        $media = self::query()->updateOrCreate([
            'id' => $media?->id ?? 0
        ], [
            'extension' => $file->extension(),
            'src' => $src,
            'path' => $path,
            'type' => $type,
        ]);

        return $media;
    }
}
