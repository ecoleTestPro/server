<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Mail\Newslatter;
use App\Models\NewsletterLog;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class NewsletterLogController extends Controller
{
    public function index()
    {
        $logs = NewsletterLog::latest('id')->paginate(20);
        return Inertia::render('dashboard/newsletter-logs/index', [
            'data' => [
                'logs' => $logs,
            ],
        ]);
    }

    public function resend(NewsletterLog $newsletterLog)
    {
        try {
            Mail::to($newsletterLog->email)->send(new Newslatter($newsletterLog->subject, $newsletterLog->content));
            $newsletterLog->update([
                'is_sent' => true,
                'sent_at' => now(),
                'error' => null,
            ]);
        } catch (\Exception $e) {
            $newsletterLog->update([
                'error' => $e->getMessage(),
            ]);
        }

        return back()->with('success', 'Mail sent');
    }
}
