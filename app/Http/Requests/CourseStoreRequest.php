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
            'category_id'           => 'required|exists:categories,id',

            'title'                 => 'required|min:5|max:500',
            'excerpt'               => 'required|string|min:5|max:5000',

            'media'                 => 'image|mimes:jpeg,png,jpg|max:2048',
            'video'                 => 'file|mimes:mp4,mpeg|max:1048576',

            'description'           => 'string|min:1',
            // 'description.*.heading' => 'required|string',
            // 'description.*.body'    => 'required|string',

            // 'instructor_id'         => 'required|exists:instructors,id',

            'is_active'             => '',

            'regular_price'         => 'numeric|min:' . ((float) config('app.minimum_amount')),
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
