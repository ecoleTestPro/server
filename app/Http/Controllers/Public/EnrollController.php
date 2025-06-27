<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseEnrollmentStoreRequest;
use App\Repositories\CouponRepository;
use App\Repositories\EnrollmentRepository;
use App\Services\Notification\EnrollmentNotificationService;
use Exception;

class EnrollController extends Controller
{
    public function __construct() {}


    /**
     * Verifies if the coupon code is valid.
     * @param string $code The coupon code.
     * @return bool True if the coupon is valid, false otherwise.
     * ! @No used
     */
    public function verifyCoupon(): bool
    {
        $coupon = $this->validateCoupon(request()->coupon_code);
        return $coupon ? true : false;
    }

    /**
     * Validate a coupon code.
     *
     * @param string $code The coupon code to validate.
     * @return Coupon|null The validated coupon, or null if not valid.
     * ! @No used
     */
    private function validateCoupon(string $code)
    {
        return CouponRepository::query()
            ->where('code', '=', $code)
            ->where('applicable_from', '<=', now())
            ->where('valid_until', '>=', now())
            ->where('is_active', '=', true)
            ->first();
    }

    public function registerEnrollment(CourseEnrollmentStoreRequest $request)
    {
        try {

            if (!$request->validated() && $request->errors()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid request data.',
                    'errors' => $request->errors(),
                ], 422);
            }

            // Create enrollment
            $enrollment = EnrollmentRepository::store($request);
            EnrollmentNotificationService::notifyEnrollmentStore($enrollment);

            return response()->json([
                'status' => 'success',
                'message' => 'Enrollment registered successfully.',
                'data' => [
                    'enrollment' => $enrollment,
                ],
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to register enrollment: ' . $e->getMessage(),
            ], 500);
        }
    }
}
