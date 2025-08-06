<?php

use App\Models\Register;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

uses(Tests\TestCase::class, RefreshDatabase::class);
test('user can be created', function () {
    Role::factory()->create(['name' => 'Usuario', 'short' => 'user']);

    $credentials = [
        'email' => fake()->email(),
        'password' => fake()->password(8, 12)
    ];

    User::factory()->create([
        'email' => $credentials['email'],
        'password' => $credentials['password']
    ]);

    $this->assertDatabaseHas(User::class, [
        'email' => $credentials['email']
    ]);
});

test('user password is hashed', function () {
    Role::factory()->create(['name' => 'Usuario', 'short' => 'user']);

    $credentials = [
        'email' => fake()->email(),
        'password' => fake()->password(8, 12)
    ];

    User::factory()->create([
        'email' => $credentials['email'],
        'password' => $credentials['password']
    ]);

    $this->assertDatabaseMissing(User::class, [
        'email' => $credentials['password'],
    ]);

    $encryptedPassword = User::where('email', $credentials['email'])->first()->password;

    expect($encryptedPassword)->not->toEqual($credentials['password']);
    expect(Hash::check($credentials['password'], $encryptedPassword))->toBeTrue();
});

test('user has role relationship', function () {
    $role = Role::factory()->create(['name' => 'Usuario', 'short' => 'user']);

    $user = User::factory()->create();

    expect($user->role())->toBeInstanceOf(BelongsTo::class);
    expect($user->role)->toBeInstanceOf(Role::class);
    expect($user->role->id)->toEqual($role->id);
    $this->assertModelExists($user->role);
});

test('user has registers relationship', function () {
    Role::factory()->create(['name' => 'Usuario', 'short' => 'user']);

    $user = User::factory()->create();
    $registers = Register::factory()->count(10)->createQuietly(['owner_id' => $user->id]);

    expect($user->registers())->toBeInstanceOf(HasMany::class);
    $registers->map(function (Register $register) use ($user) {
        expect($register)->toBeInstanceOf(Register::class);
        expect($register->owner_id)->toEqual($user->id);
        $this->assertModelExists($register);
    });
});
