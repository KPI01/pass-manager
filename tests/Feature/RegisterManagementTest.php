<?php

use App\Models\Register;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Tests\TestCase;

class RegisterManagementTest extends TestCase
{
    use RefreshDatabase;

    public static $user = null;
    public static $userPass = null;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->standard()->create();
        self::$userPass = fake()->password(6, 12);
        self::$user = User::factory()->create(['password' => self::$userPass]);

        $loginResponse = $this->post('/login', [
            'email' => self::$user->email,
            'password' => self::$userPass
        ]);
        $loginResponse->assertRedirectToRoute('register.index');
        $this->assertAuthenticatedAs(self::$user);
    }

    public function test_user_can_create_register()
    {
        $pass = fake()->password(8, 12);
        $register = Register::factory()->make([
            'password' => $pass,
        ]);
        $data = [...$register->toArray(), 'password' => $pass];

        $response = $this->post('/register', $data);
        $response->assertRedirectToRoute('register.index');

        $this->assertDatabaseHas('registers', $register->except(['login', 'password']));

        $db = Register::where([
            'type' => $register->type,
            'description' => $register->description,
            'notes' => $register->notes
        ])->first();

        $this->assertEquals($register->password, $db->password);
    }

    public function test_user_can_view_own_registers()
    {
        $registers = Register::factory()->count(10)->create(['owner_id' => self::$user->id]);

        $registers->map(function (Register $register) {
            $this->assertTrue(Auth::user()->can('view', $register));
        });
    }

    public function test_user_can_update_register()
    {
        $registers = Register::factory()->count(10)->create(['owner_id' => self::$user->id]);

        $registers->map(function (Register $register) {
            $this->assertTrue(Auth::user()->can('update', $register));

            $newData = [
                'description' => fake()->text(75),
                'login' => $register->type === 'email' ? fake()->email() : fake()->userName(),
                'password' => fake()->password(),
                'notes' => fake()->text(150)
            ];
            $toChange = [];
            foreach ($newData as $key => $value) {
                if (fake()->boolean()) {
                    $toChange[$key] = $value;
                }
            }

            $response = $this->patch("/register/$register->id", $toChange);
            $response->assertStatus(302)->assertRedirectToRoute('register.index');
            $register->refresh();

            $this->assertDatabaseHas('registers', $register->except(['login', 'password']));

            $db = Register::find($register->id);
            $this->assertEquals($register->login, $db->login);
            $this->assertEquals($register->password, $db->password);
        });
    }

    public function test_user_can_delete_register()
    {
        $registers = Register::factory()->count(10)->create(['owner_id' => self::$user->id]);

        $registers->map(function (Register $register) {
            $this->assertTrue(Auth::user()->can('delete', $register));

            $response = $this->delete("/register/$register->id");
            $response->assertStatus(302)->assertRedirectToRoute("register.index");
            $this->assertDatabaseMissing('registers', $register->toArray());
        });
    }

    public function test_register_password_can_be_decrypted_if_authenticated()
    {
        $pass = fake()->password(6, 12);
        $register = Register::factory()->createQuietly(['password' => $pass]);


        $responseOk = $this->post("/register/$register->id/reveal-password");
        $responseOk->assertOk();
        $this->assertEquals('success', $responseOk['status']);

        $this->post('/logout');
        $this->assertGuest();

        $responseError = $this->post("/register/$register->id/reveal-password");
        $responseError->assertRedirectToRoute('login');
    }
}
