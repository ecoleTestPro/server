<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrivateController extends Controller
{
    protected $middleware = [
        'auth',
        'verified',
    ];
    /**
     * Constructor to apply middleware to the controller.
     */
    public function __construct()
    {
        // $this->middleware($this->middleware);
    }

    /**
     * Show the dashboard page.
     *
     * @param Request $request The incoming request.
     * @return \Inertia\Response The Inertia response for the dashboard page.
     */
    public function index(Request $request)
    {
        return Inertia::render('dashboard/index');
    }
}
