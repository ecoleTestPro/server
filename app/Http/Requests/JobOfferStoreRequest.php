<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobOfferStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'company' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'nullable|string',
            'salary' => 'nullable|integer',
            'description' => 'nullable|string',
            'expires_at' => 'nullable|date',
        ];
    }
}
