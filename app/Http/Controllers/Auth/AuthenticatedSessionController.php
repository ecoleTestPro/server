<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Repositories\FcmDeviceTokenRepository;
use App\Repositories\GuestRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Services\ResponseService;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('home'));
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required_without:phone',
            'phone' => 'required_without:email',
            'password' => 'required',
        ]);

        try {
            if (!$token = JWTAuth::attempt($validatedData)) {
                return redirect()->back()->withErrors([
                    'email' => 'Invalid credentials',
                ]);
            }
        } catch (JWTException $e) {
            return redirect()->back()->withErrors([
                'email' => 'Could not create token',
            ]);
        }

        /** @var User */
        $user = JWTAuth::user(); // Fetch the authenticated user

        if ($user->is_admin || $user->hasRole('admin') || $user->instructor) {
            return redirect()->back()->withErrors([
                'email' => 'You are not a student, please sign up as a student',
            ]);
        }

        // Ajoute cette vérification juste ici
        if (method_exists($user, 'hasVerifiedEmail') && !$user->hasVerifiedEmail()) {
            // Déconnecte l'utilisateur si besoin
            Auth::logout();
            // Redirige vers la page de vérification d'email
            return redirect()->route('verification.notice');
        }

        if ($request->fcm_token) {
            FcmDeviceTokenRepository::create([
                'user_id' => $user->id,
                'token'   => $request->fcm_token,
            ]);
        }

        if ($request->guest_id) {
            $this->syncGuest($request->guest_id, $user);
        }

        if ($request->fcm_token) {
            FcmDeviceTokenRepository::create([
                'user_id' => $user->id,
                'token'   => $request->fcm_token,
            ]);
        }

        if ($request->guest_id) {
            $this->syncGuest($request->guest_id, $user);
        }

        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->intended(route('home'));
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
