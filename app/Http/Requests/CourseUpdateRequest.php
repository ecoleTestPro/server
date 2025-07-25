<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id'           => 'exists:categories,id',
            'title'                 => 'string|min:5|max:500',
            'media'                 => "image|mimes:jpeg,png,jpg|max:10240",
            'logo'                  => 'image|mimes:jpeg,png,jpg|max:10240',
            'organization_logo'     => 'image|mimes:jpeg,png,jpg|max:10240',
            'video'                 => 'file|mimes:mp4,mpeg|max:1048576',
            'gallery'               => 'sometimes|array',
            'gallery.*'            => 'file|mimes:jpeg,png,jpg,mp4,mpeg|max:1048576',
            'description'           => 'sometimes|json|min:1',
            'is_published'          => 'nullable',
            'partner_ids'           => 'sometimes',
            'partner_ids.*'         => 'exists:partners,id',
            'regular_price'         => 'required|numeric|min:' . ((float) config('app.minimum_amount')),
            'instructor_id'         => 'exists:instructors,id',
            'is_active'             => 'nullable',
            'reference_tag'         => 'nullable|string',
            'price' => [
                'nullable',
                'numeric',
                function ($attribute, $value, $fail) {
                    if ($value > 0 && $value < (float) config('app.minimum_amount')) {
                        $fail('The price must be at least ' . config('app.minimum_amount') . ' if greater than 0.');
                    }
                },
            ],
        ];
    }
    /**
     * Get custom validation messages.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'title.min' => 'The title must be at least 5 characters.',
            'title.max' => 'The title may not be greater than 500 characters.',
            'instructor_id.required' => 'The instructor field is required.',
            'instructor_id.exists' => 'The selected instructor is invalid.',
            'category_id.required' => 'The category field is required.',
            'category_id.exists' => 'The selected category is invalid.',
            'media.required' => 'The thumbnail field is required.',
            'media.image' => 'The thumbnail must be an image.',
            'media.mimes' => 'The thumbnail must be a file of type: jpeg, png, jpg.',
            'media.max' => 'The thumbnail may not be greater than 2 MB.',
            'regular_price.min' => 'The regular price must be at least ' . config('app.minimum_amount'),
            'price.min' => 'The price must be at least ' . config('app.minimum_amount'),
            'description.required' => 'The description field is required.',
        ];
    }
}
