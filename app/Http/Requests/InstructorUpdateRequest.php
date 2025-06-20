<?php

namespace App\Http\Requests;

use App\Rules\PhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class InstructorUpdateRequest extends FormRequest
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
            'title' => 'required|string',
            'name' => 'required',
            'email' => 'required|email',
            'phone' => ['required',  new PhoneNumber()],
            'password' => 'nullable|min:8|confirmed',
            'profile_picture' => 'image|mimes:jpeg,png,jpg|max:2048',
            'user_id' => 'exists:users,id'
        ];
    }
}
