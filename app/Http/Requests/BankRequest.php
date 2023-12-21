<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'address'=>'required|max:255',
            'ruc'=>'required|max:20',
            'email'=>'required|max:255',
            'phone'=>'required|max:255',
        ];
    }
}
