<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseStoreRequest extends FormRequest
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
            'category_id'       => 'required|exists:categories,id',
            'title'             => 'required|min:2|max:500',
            'excerpt'           => 'required|string|min:2|max:255',
            'media'             => 'image|mimes:jpeg,png,jpg|max:2048',
            'logo'              => 'image|mimes:jpeg,png,jpg|max:2048',
            'organization_logo' => 'image|mimes:jpeg,png,jpg|max:2048',
            'video'             => 'file|mimes:mp4,mpeg|max:1048576',
            'gallery'           => 'sometimes|array',
            'gallery.*'         => 'file|mimes:jpeg,png,jpg,mp4,mpeg|max:1048576',
            'description'       => 'json|min:1',
            'is_published'      => 'nullable',
            'partner_ids'       => 'sometimes',
            'partner_ids.*'     => 'exists:partners,id',
            'regular_price'     => 'numeric|min:' . ((float) config('app.minimum_amount')),
            'reference_tag'     => 'nullable|string',
            'location_mode'     => 'nullable|string|in:En présentiel,À distance,En présentiel ou à distance,Hybride',
            'periodicity_unit'  => 'nullable|string',
            'periodicity_value' => 'nullable|numeric',
            'duration'          => 'nullable|string',
            'attachment'        => 'nullable|string',
            'lectures'          => 'nullable|numeric',
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
            'title.min'              => 'Le titre doit comporter au moins 5 caractères.',
            'title.max'              => 'Le titre ne peut pas dépasser 500 caractères.',
            'instructor_id.required' => "Le champ formateur est obligatoire.",
            'instructor_id.exists'   => "Le formateur sélectionné est invalide.",
            'category_id.required'   => "Le champ catégorie est obligatoire.",
            'category_id.exists'     => "La catégorie sélectionnée est invalide.",

            'media.required'         => "L'image miniature est obligatoire.",
            'media.image'            => "L'image miniature doit être une image.",
            'media.mimes'            => "L'image miniature doit être un fichier de type : jpeg, png, jpg.",
            'media.max'              => "L'image miniature ne doit pas dépasser 2 Mo.",

            'regular_price.min'      => 'Le prix normal doit être au moins de ' . config('app.minimum_amount') . '.',
            'price.min'              => 'Le prix doit être au moins de ' . config('app.minimum_amount') . '.',


        ];
    }
}
