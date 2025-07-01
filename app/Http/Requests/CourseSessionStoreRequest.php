<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseSessionStoreRequest extends FormRequest
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
            'course_session_id' => 'required|exists:course_sessions,id',
            'course_id'         => 'required|exists:courses,id',
            'start_date'        => 'required|date',
            'end_date'          => 'nullable|date|after_or_equal:start_date',
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
            'course_session_id.required' => 'La session de formation est obligatoire.',
            'course_session_id.exists'   => 'La session de formation sélectionnée n\'existe pas.',
            'course_id.required'         => 'La formation est obligatoire.',
            'course_id.exists'           => 'La formation sélectionnée n\'existe pas.',
        ];
    }
}
