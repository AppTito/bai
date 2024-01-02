<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttentionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'organization_id'=>'required',
            'dni'=>'required|max:10',
            'name'=>'required|max:255',
            'phone'=>'required|max:13',
            'email'=>'required|max:255',
        ];
    }
}
