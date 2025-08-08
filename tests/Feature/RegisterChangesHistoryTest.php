<?php

use App\Models\Change;
use App\Models\Register;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use Tests\TestCase;

class RegisterChangesHistoryTest extends TestCase
{
    use RefreshDatabase;

    protected static $userId = null;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->standard()->create();

        $pass = fake()->password(6, 12);
        $user = User::factory()->create(['password' => $pass]);
        self::$userId = $user->id;

        $this->post('/login', [
            'email' => $user->email,
            'password' => $pass,
        ]);
        $this->assertAuthenticated();
    }

    public function test_change_is_created_when_register_is_created()
    {
        $pass = fake()->password(8, 12);
        $register = Register::factory()->make([
            'password' => $pass,
        ]);
        $data = [...$register->toArray(), 'password' => $pass];

        $response = $this->post('/register', $data);
        $response->assertRedirectToRoute('register.index');
        $this->assertDatabaseHas('registers', $register->except(['login', 'password']));
        $register = Register::where(Arr::except($data, ['login', 'password']))->first();

        $change = Change::where([
            'action' => 'creation',
            'made_by' => self::$userId,
            'register_id' => $register->id
        ])->first();

        $this->assertInstanceOf(Change::class, $change);
    }

    public function test_change_is_created_when_register_is_updated()
    {
        $pass = fake()->password(8, 12);
        $register = Register::factory()->make([
            'password' => $pass,
        ]);

        $data = [...$register->toArray(), 'password' => $pass];

        $response = $this->patch('/register', $data);
        $response->assertRedirectToRoute('register.index');
    }

    public function test_change_is_created_when_register_is_deleted() {}
}
