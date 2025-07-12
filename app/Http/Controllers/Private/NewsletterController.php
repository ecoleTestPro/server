<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsletterStoreRequest;
use App\Mail\Newslatter;
use App\Models\Newsletter;
use App\Models\NewsletterLog;
use App\Models\NewsletterTemplate;
use App\Repositories\NewsletterRepository;
use App\Repositories\NewsletterTemplateRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class NewsletterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;

        $newsletters = NewsletterRepository::query()
            ->when($search, fn($query) => $query->where('email', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('dashboard/newsletters/index', [
            'data' => [
                'newsletters' => $newsletters,
            ],
        ]);
    }

    public function store(NewsletterStoreRequest $request)
    {
        NewsletterRepository::storeByRequest($request);
        return to_route('dashboard.newsletters.index')->with('success', 'Newsletter created');
    }

    public function destroy(Newsletter $newsletter)
    {
        $newsletter->delete();
        return to_route('dashboard.newsletters.index')->with('success', 'Newsletter deleted');
    }

    public function compose()
    {
        $templates = NewsletterTemplateRepository::query()->get();
        return Inertia::render('dashboard/newsletter/index', [
            'data' => [
                'templates' => $templates,
            ],
        ]);
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string',
            'content' => 'required|string',
        ]);

        $emails = Newsletter::pluck('email');

        foreach ($emails as $email) {
            $log = NewsletterLog::create([
                'email' => $email,
                'subject' => $validated['subject'],
                'content' => $validated['content'],
            ]);

            try {
                Mail::to($email)->send(new Newslatter($validated['subject'], $validated['content']));
                $log->update([
                    'is_sent' => true,
                    'sent_at' => now(),
                ]);
            } catch (\Exception $e) {
                $log->update([
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return back()->with('success', 'Newsletter envoyée');
    }
}
