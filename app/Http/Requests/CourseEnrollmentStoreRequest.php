<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseEnrollmentStoreRequest extends FormRequest
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
            'course_id'            => 'required|exists:courses,id',
            'course_session_id'    => 'required|exists:course_sessions,id',
            'user_id'              => 'nullable|exists:users,id',
            'coupon_code'          => 'nullable|string|max:50',
            'name'                 => 'required|string|min:3|max:255',
            'email'                => 'required|email|max:255',
            'phone'                => 'required|string',
            'mode'                 => 'required|in:online,in-person,hybrid',
            'company'              => 'nullable|string|max:255',
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
            'course_id.required'       => 'La formation est obligatoire.',
            'course_id.exists'         => 'La formation sélectionnée n\'existe pas.',
            'course_session_id.required' => 'La session de formation est obligatoire.',
            'course_session_id.exists'   => 'La session sélectionnée n\'existe pas.',
            'user_id.exists'     => 'L\'utilisateur sélectionné n\'existe pas.',
            'coupon_code.string' => 'Le code de coupon doit être une chaîne de caractères.',
            'coupon_code.max'    => 'Le code de coupon ne peut pas dépasser 50 caractères.',
            'name.required'      => 'Le nom est obligatoire.',
            'name.string'        => 'Le nom doit être une chaîne de caractères.',
            'name.min'           => 'Le nom doit comporter au moins 3 caractères.',
            'name.max'           => 'Le nom ne peut pas dépasser 255 caractères.',
            'email.required'     => 'L\'email est obligatoire.',
            'email.email'        => 'L\'email doit être une adresse email valide.',
            'email.max'          => 'L\'email ne peut pas dépasser 255 caractères.',
            'phone.required'     => 'Le téléphone est obligatoire.',
            'phone.string'       => 'Le téléphone doit être une chaîne de caractères.',
            'phone.min'          => 'Le téléphone doit comporter au moins 10 caractères.',
            'phone.max'          => 'Le téléphone ne peut pas dépasser 15 caractères.',
            'mode.required'      => 'Le mode de formation est obligatoire.',
            'mode.in'            => 'Le mode de formation doit être l\'un des suivants : online, in-person, hybrid.',
            'company.string'     => 'Le nom de l\'entreprise doit être une chaîne de caractères.',
            'company.max'        => 'Le nom de l\'entreprise ne peut pas dépasser 255 caractères.',
        ];
    }
}
