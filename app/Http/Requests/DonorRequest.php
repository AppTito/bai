<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DonorRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $donorId = $this->route('donor') ? $this->route('donor')->id : null;
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'ruc' => [ 'required', 'numeric', 'digits_between:10,13',
                Rule::unique('donors', 'ruc')->ignore($donorId),],
            'phone' => ['required', 'string', 'max:15'],
        ];
    }
}
