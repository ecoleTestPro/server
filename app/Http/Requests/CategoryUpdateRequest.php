<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
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
            'title'       => 'nullable|string|max:50',
            'media'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'parent_id'   => 'nullable|exists:categories,id',
            'is_featured' => 'nullable|boolean',
            'color'       => 'nullable|string|min:7|max:7',
        ];
    }
}
