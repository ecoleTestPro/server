<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogStoreRequest extends FormRequest
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
            'title'       => 'required|string',
            'description' => 'required|string',
            'category_id' => 'nullable|integer|exists:blog_categories,id',
            'thumbnail'   => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'excerpt'     => 'nullable|string',
            'tags'        => 'nullable|array',
            'tags.*'      => 'string',
            'status'      => '',
        ];
    }
}

