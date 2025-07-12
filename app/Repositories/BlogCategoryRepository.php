<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Enum\MediaTypeEnum;
use App\Http\Requests\BlogCategoryStoreRequest;
use App\Http\Requests\StudentRegisterRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\BlogCategory;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class BlogCategoryRepository extends Repository
{
    public static function model()
    {
        return BlogCategory::class;
    }

    public static function storeByRequest(BlogCategoryStoreRequest $request) {}
}
