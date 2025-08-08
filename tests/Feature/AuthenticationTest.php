<?php

namespace Tests\Feature;

use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->standard()->create();
    }

    public function test_user_can_login_with_valid_credentials()
    {
        $pass = fake()->password(6, 12);
        $user = User::factory()->create([
            'password' => $pass,
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $pass,
        ]);

        $response->assertStatus(302);
        $response->assertRedirect('/register');
        $this->assertAuthenticatedAs($user);
    }

    public function test_user_cannot_login_with_invalid_credentials()
    {
        $pass = fake()->password(6, 12);
        $user = User::factory()->create([
            'password' => $pass,
        ]);

        $wrongPass = fake()->password(6, 12);
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => $wrongPass,
        ]);

        $response->assertRedirectBack();
        $response->assertSessionHasErrors();
        $this->assertGuest();
    }

    public function test_user_can_logout()
    {
        $pass = fake()->password(6, 12);
        $user = User::factory()->create(['password' => $pass]);

        $loginResponse = $this->post('/login', [
            'email' => $user->email,
            'password' => $pass,
        ]);

        $loginResponse->assertRedirectToRoute('register.index');
        $this->assertAuthenticatedAs($user);

        $logoutResponse = $this->post('/logout');

        $logoutResponse->assertRedirectToRoute('login');
        $logoutResponse->assertRedirect('/login');
        $this->assertGuest();
    }
}
