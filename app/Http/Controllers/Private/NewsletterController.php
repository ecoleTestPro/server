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
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $emails = Newsletter::pluck('email');

        if ($emails->isEmpty()) {
            return response()->json(['message' => 'Aucun abonné trouvé'], 400);
        }

        $successCount = 0;
        $failureCount = 0;

        foreach ($emails as $email) {
            $log = NewsletterLog::create([
                'email' => $email,
                'subject' => $validated['subject'],
                'content' => $validated['content'],
                'is_sent' => false,
            ]);

            try {
                Mail::to($email)->send(new Newslatter($validated['subject'], $validated['content']));
                $log->update([
                    'is_sent' => true,
                    'sent_at' => now(),
                ]);
                $successCount++;
            } catch (\Exception $e) {
                $log->update([
                    'is_sent' => false,
                    'error' => $e->getMessage(),
                ]);
                $failureCount++;
            }
        }

        $message = "Newsletter envoyée: {$successCount} succès";
        if ($failureCount > 0) {
            $message .= ", {$failureCount} échecs";
        }

        return response()->json([
            'message' => $message,
            'stats' => [
                'success' => $successCount,
                'failed' => $failureCount,
                'total' => $emails->count()
            ]
        ]);
    }

    public function logs(Request $request)
    {
        $search = $request->search ? strtolower($request->search) : null;
        
        $logs = NewsletterLog::query()
            ->when($search, fn($query) => $query->where('email', 'like', "%{$search}%")
                ->orWhere('subject', 'like', "%{$search}%"))
            ->latest('id')
            ->paginate(20)
            ->withQueryString();

        return response()->json($logs);
    }

    public function analytics()
    {
        $totalSent = NewsletterLog::where('is_sent', true)->count();
        $totalFailed = NewsletterLog::where('is_sent', false)->whereNotNull('error')->count();
        $totalPending = NewsletterLog::whereNull('is_sent')->count();
        $totalSubscribers = Newsletter::count();

        $recentLogs = NewsletterLog::with([])
            ->latest('id')
            ->take(10)
            ->get();

        return response()->json([
            'stats' => [
                'total_sent' => $totalSent,
                'total_failed' => $totalFailed,
                'total_pending' => $totalPending,
                'total_subscribers' => $totalSubscribers,
            ],
            'recent_logs' => $recentLogs,
        ]);
    }
}
