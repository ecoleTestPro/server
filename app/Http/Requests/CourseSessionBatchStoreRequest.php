<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseSessionBatchStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'course_id' => 'required|exists:courses,id',
            'sessions' => 'required|array|min:1',
            'sessions.*.start_date' => 'required|date',
            'sessions.*.end_date' => 'nullable|date|after_or_equal:sessions.*.start_date',
            'sessions.*.location' => 'nullable|string',
            'sessions.*.price' => 'nullable|numeric',
            'sessions.*.price_discount' => 'nullable|numeric',
            'sessions.*.tva' => 'nullable|numeric',
        ];
    }
}
