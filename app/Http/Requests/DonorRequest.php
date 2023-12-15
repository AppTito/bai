<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DonorRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [ 'required','string', 'max:255' ],
            'address' => [ 'required','string', 'max:255' ],
            'ruc' => [ 'required','numeric', 'digits:11', 'unique:donors,ruc' ],
            'phone' => [ 'required','string', 'max:15' ],
            'status' => [ 'required','boolean' ],
        ];
    }
}
