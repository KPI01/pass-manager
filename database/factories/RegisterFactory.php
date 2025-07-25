<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Register>
 */
class RegisterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['user', 'email']);
        $login = $type === 'user' ? $this->faker->userName : $this->faker->email;
        $password = $this->faker->password;

        return [
            'description' => $this->faker->sentence,
            'type' => $type,
            'login' => $login,
            'password' => $password,
            'notes' => $this->faker->optional()->paragraph,
        ];
    }
}
