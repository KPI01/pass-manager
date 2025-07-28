<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $short = fake()->randomElement(['user', 'admin', 'viewer']);

        return [
            'name' => fake()->name(),
            'short' => fake()->word(),
        ];
    }

    public function standard(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Usuario',
            'short' => 'user',
        ]);
    }

    public function admin(): static
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Administrador',
            'short' => 'admin',
        ]);
    }
}
