<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobApplicationStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'job_offer_id' => 'required|exists:job_offers,id',
            'name' => 'required|string',
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ];
    }
}
