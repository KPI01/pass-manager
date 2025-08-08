<?php

use App\Models\Register;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->standard()->create();
    }

    public function test_user_can_be_created()
    {
        $credentials = [
            'email' => fake()->email(),
            'password' => fake()->password(6, 12)
        ];

        User::factory()->create([
            'email' => $credentials['email'],
            'password' => $credentials['password']
        ]);

        $this->assertDatabaseHas(User::class, [
            'email' => $credentials['email']
        ]);
    }

    public function test_user_password_is_hashed()
    {
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

        $this->assertNotEquals($encryptedPassword, $credentials['password']);
        $this->assertTrue(Hash::check($credentials['password'], $encryptedPassword));
    }

    public function test_user_has_role_relationship()
    {
        $role = Role::where('short', 'user')->first();

        $user = User::factory()->create();

        $this->assertInstanceOf(BelongsTo::class, $user->role());
        $this->assertInstanceOf(Role::class, $user->role);
        $this->assertEquals($role->id, $user->role->id);
        $this->assertModelExists($user->role);
    }

    public function test_user_has_registers_relationship()
    {
        $user = User::factory()->create();
        $registers = Register::factory()->count(10)->createQuietly(['owner_id' => $user->id]);

        $this->assertInstanceOf(HasMany::class, $user->registers());
        $registers->map(function (Register $register) use ($user) {
            $this->assertInstanceOf(Register::class, $register);
            $this->assertEquals($user->id, $register->owner_id);
            $this->assertModelExists($register);
        });
    }
}
