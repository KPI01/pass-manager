<?php

namespace App\Http\Requests\Models\Register;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Register;


class StoreRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', Register::first());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => ['required', 'max:255'],
            'type' => ['required', Rule::in(['user', 'email'])],
            'login' => ['required', 'max:150'],
            'password' => ['required', 'min:8', 'confirmed'],
            'notes' => ['nullable', 'max:350'],
        ];
    }

    public function messages(): array
    {
        return [
            'description.required' => 'La descripción es requerida.',
            'description.max' => 'La descripción no puede tener más de 255 caracteres.',
            'type.required' => 'El tipo es requerido.',
            'login.required' => 'El login es requerido.',
            'password.required' => 'La contraseña es requerida.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'notes.max' => 'Las notas no pueden tener más de 350 caracteres.',
        ];
    }
}
