<?php

namespace App\Http\Controllers\Public;

use App\Events\SubscriberMailEvent;
use App\Http\Controllers\PublicAbstractController;
use App\Repositories\NewslatterSubscriptionRepository;
use Illuminate\Http\Request;

class NewsletterController extends PublicAbstractController
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newslatter_subscriptions,email',
        ]);

        $subscription = NewslatterSubscriptionRepository::create([
            'email' => $request->email,
        ]);

        event(new SubscriberMailEvent($subscription->email, 'Newsletter Subscription'));

        return response()->json(['success' => true]);
    }
}
