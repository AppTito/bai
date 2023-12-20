<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'code'=>'required|max:20',
            'address'=>'required|max:255',
            'ruc'=>'required|max:13',
        ];
    }
}
