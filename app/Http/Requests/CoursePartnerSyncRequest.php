<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CoursePartnerSyncRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'partner_ids' => 'sometimes|array',
            'partner_ids.*' => 'exists:partners,id',
        ];
    }
}
