<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;
        return [
            'name' => 'required',
            'email' => ['required','email',Rule::unique('users', 'email')->ignore($userId),],
            'password' => $this->isMethod('post') ? 'required|confirmed' : 'sometimes|confirmed',
            'roles' => $this->isMethod('put') ? 'sometimes|required' : 'required',
        ];
    }
}
