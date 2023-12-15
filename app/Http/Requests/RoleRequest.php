<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $roleId = $this->route('role') ? $this->route('role')->id : null;
        return [
            'name' => [ 'required', 'string', 'max:30', Rule::unique('roles', 'name')->ignore($roleId), ],
            'permissions' => ['sometimes', 'required','array'],
            'permissions.*' => ['exists:permissions,id'],
        ];
    }
}
