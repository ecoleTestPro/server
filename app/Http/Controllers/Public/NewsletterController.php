<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewsletterStoreRequest;
use App\Repositories\NewsletterRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    public function subscribe(NewsletterStoreRequest $request)
    {
        try {
            $newsletter = NewsletterRepository::storeByRequest($request);

            return response()->json([
                'success' => true,
                'message' => 'Subscription saved successfully.',
                'data' => [
                    'newsletter' => $newsletter,
                ],
            ]);
        } catch (Exception $e) {
            Log::error('Newsletter subscribe error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to subscribe to newsletter.',
            ], 500);
        }
    }
}
