<?php

namespace App\Repositories;

use Abedin\Maker\Repositories\Repository;
use App\Models\NewsletterSubscriber;

class NewsletterSubscriberRepository extends Repository
{
    public static function model()
    {
        return NewsletterSubscriber::class;
    }
}
