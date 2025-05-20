<?php

namespace App\Http\Controllers\Auth;

use App\Events\MailSendEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\StudentRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\AccountActivationRepository;
use App\Repositories\FcmDeviceTokenRepository;
use App\Repositories\GuestRepository;
use App\Repositories\UserRepository;
use App\Services\ResponseService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }


    /**
     * Handle an incoming registration request.
     *
     * @param StudentRegisterRequest $request The incoming request containing student registration data.
     * @return Response A redirect response to the user profile page, or an error response on failure.
     */
    public function store(StudentRegisterRequest $request)
    {
        $newUser = UserRepository::storeByStudentRequest($request);

        try {
            $token = JWTAuth::fromUser($newUser);
        } catch (JWTException $e) {
            return ResponseService::error('Could not create token', 500);
        }

        if ($request->fcm_token) {
            FcmDeviceTokenRepository::create([
                'user_id' => $newUser->id,
                'token'   => $request->fcm_token,
            ]);
        }

        $code = rand(1111, 9999);

        AccountActivationRepository::create([
            'user_id'     => $newUser->id,
            'code'        => $code,
            'valid_until' => now()->addHour(),
        ]);

        try {
            MailSendEvent::dispatch($code, $newUser->email);
        } catch (\Throwable $th) {
            //throw $th;
        }

        if ($request->guest_id) {
            $this->syncGuest($request->guest_id, $newUser);
        }

        $newUser->refresh();

        // return ResponseService::created('Registration successful', [
        //     'user'            => UserResource::make($newUser),
        //     'token'           => $token,
        //     'activation_code' => $code,
        // ]);
        return Inertia::render('auth/login');
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
