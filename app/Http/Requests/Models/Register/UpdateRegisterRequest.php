<?php

namespace App\Http\Requests\Models\Register;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Register;
use Illuminate\Validation\Rule;

class UpdateRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $register = Register::find($this->route('register'))->first();
        return $this->user()?->can('update', $register);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => ['sometimes', 'max:255'],
            'type' => ['sometimes', Rule::in(['user', 'email'])],
            'login' => ['sometimes', 'max:150'],
            'password' => ['sometimes'],
            'notes' => ['nullable', 'max:350'],
        ];
    }
}
