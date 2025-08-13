<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaqUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id'        => 'required|exists:faqs,id',
            'is_active' => 'nullable|boolean',
            'question'  => 'required|string',
            'answer'    => 'required|string',
        ];
    }
}
