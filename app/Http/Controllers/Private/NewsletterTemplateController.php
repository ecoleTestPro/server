<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsletterTemplateStoreRequest;
use App\Models\NewsletterTemplate;
use App\Repositories\NewsletterTemplateRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterTemplateController extends Controller
{
    public function index()
    {
        $templates = NewsletterTemplateRepository::query()->latest('id')->get();
        return Inertia::render('dashboard/newsletter-templates/index', [
            'data' => [
                'templates' => $templates,
            ],
        ]);
    }

    public function store(NewsletterTemplateStoreRequest $request)
    {
        NewsletterTemplateRepository::create($request->only(['name', 'subject', 'content']));
        return to_route('dashboard.newsletter-templates.index')->with('success', 'Template created');
    }

    public function destroy(NewsletterTemplate $newsletterTemplate)
    {
        $newsletterTemplate->delete();
        return to_route('dashboard.newsletter-templates.index')->with('success', 'Template deleted');
    }
}
