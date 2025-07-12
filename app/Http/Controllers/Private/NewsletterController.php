<?php

namespace App\Http\Controllers\Private;

use App\Events\SubscriberMailEvent;
use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/newsletter/index');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'content' => 'required|string',
        ]);

        $emails = NewsletterSubscriber::pluck('email');

        foreach ($emails as $email) {
            SubscriberMailEvent::dispatch($email, $validated['subject'], $validated['content']);
        }

        return back()->with('success', 'Newsletter envoyée');
    }
}
