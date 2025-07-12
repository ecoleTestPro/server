<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\NewsletterTemplate;

class NewsletterTemplateRepository extends Repository
{
    public static function model()
    {
        return NewsletterTemplate::class;
    }
}
