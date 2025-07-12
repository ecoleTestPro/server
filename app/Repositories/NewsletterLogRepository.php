<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\NewsletterLog;

class NewsletterLogRepository extends Repository
{
    public static function model()
    {
        return NewsletterLog::class;
    }
}
