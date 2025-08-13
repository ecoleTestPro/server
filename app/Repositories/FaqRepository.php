<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\Faq;

class FaqRepository extends Repository
{
    public static function model()
    {
        return Faq::class;
    }

    public static function storeByRequest($request)
    {
        return self::create([
            'question'  => $request->question,
            'answer'    => $request->answer,
            'is_active' => $request->has('is_active') ? true : false,
        ]);
    }

    public static function updateByRequest($request, Faq $faq)
    {
        return self::update($faq, [
            'id'        => $faq->id,
            'question'  => $request->question ?? $faq->question,
            'answer'    => $request->answer ?? $faq->answer,
            'is_active' => $request->has('is_active') ? true : $faq->is_active,
        ]);
    }
}
