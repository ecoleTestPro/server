<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\PublicAbstractController;
use App\Repositories\CourseSessionRepository;
use Inertia\Inertia;

class SessionsTimelineController extends PublicAbstractController
{
    public function index()
    {
        // Récupérer toutes les sessions avec leurs formations associées
        $sessions = CourseSessionRepository::query()
            ->with(['course.category'])
            ->orderBy('start_date', 'asc')
            ->get();

        $data = $this->getDefaultData();
        $data['sessions'] = $sessions;

        return Inertia::render('public/sessions-timeline', [
            'data' => $data,
            'sessions' => $sessions,
        ]);
    }
}