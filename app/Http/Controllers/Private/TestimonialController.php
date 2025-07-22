<?php

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\TestimonialStoreRequest;
use App\Http\Requests\TestimonialUpdateRequest;
use App\Models\Testimonial;
use App\Repositories\TestimonialRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * List all the testimonials.
     *
     * @param  Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $testimonials = TestimonialRepository::query()->latest('id')->paginate(9999)->withQueryString();

        $data = [
            'testimonials' => $testimonials,
        ];

        return Inertia::render('dashboard/testimonials/index', [
            'data' => $data,
        ]);
    }

    /**
     * Store a newly created testimonial in storage.
     *
     * @param  TestimonialStoreRequest $request
     * @return \Inertia\Response
     */
    public function store(TestimonialStoreRequest $request)
    {
        TestimonialRepository::storeByRequest($request);

        return to_route('dashboard.testimonial.index')->withSuccess('Testimonial created successfully.');
    }

    /**
     * Update the specified testimonial in storage.
     *
     * @param  TestimonialUpdateRequest $request
     * @param  Testimonial $testimonial
     * @return \Inertia\Response
     */
    public function update(TestimonialUpdateRequest $request, Testimonial $testimonial)
    {
        TestimonialRepository::updateByRequest($request, $testimonial);
        return to_route('dashboard.testimonial.index')->withSuccess('Testimonial updated successfully.');
    }

    /**
     * Remove the specified testimonial from storage and deactivate it.
     *
     * @param  Testimonial $testimonial
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        $testimonial->is_active = false;
        $testimonial->save();
        return to_route('dashboard.testimonial.index')->withSuccess('Testimonial deleted successfully.');
    }

    /**
     * Restore the specified testimonial from the trash.
     *
     * @param  int  $testimonial
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restore($testimonial)
    {
        TestimonialRepository::query()->withTrashed()->find($testimonial)->restore();
        return to_route('dashboard.testimonial.index')->withSuccess('Testimonial restored successfully.');
    }
}
