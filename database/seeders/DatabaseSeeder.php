<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::factory()->create([
            'name' => 'Administrador',
            'short' => 'admin'
        ]);

        Role::factory()->create([
            'name' => 'Usuario',
            'short' => 'user'
        ]);
    }
}
