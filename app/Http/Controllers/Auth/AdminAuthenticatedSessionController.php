<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginAdminRequest;
use App\Models\User;
use App\Repositories\GuestRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthenticatedSessionController extends Controller
{
    /**
     * The middleware to be applied to the controller.
     */
    protected $middleware = [
        ['middleware' => ['auth', 'role:admin'], 'except' => ['create', 'login']],
    ];

    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render(
            'auth/admin/loginAdmin',
            [
                'canResetPassword' => Route::has('password.request'),
                'status' => $request->session()->get('status'),
            ]
        );
    }

    /**
     * Handle an incoming authentication request.
     */
    public function login(LoginAdminRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Sync guest with user and delete guest.
     */
    private function syncGuest(string $guestId, User $user): void
    {
        $guest = GuestRepository::query()->where('unique_id', '=', $guestId)->first();

        if (!$guest) {
            return;
        }

        $user->favouriteCourses()->attach($guest->favouriteCourses->pluck('id'));
        $user->favouriteInstructors()->attach($guest->favouriteInstructors->pluck('id'));

        $guest->delete();
    }
}
