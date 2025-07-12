<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PartnerStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'link' => 'nullable|url',
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
