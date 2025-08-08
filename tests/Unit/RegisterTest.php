<?php

use App\Models\Register;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    protected static $userPass = null;
    protected static $owner = null;

    protected function setUp(): void
    {
        parent::setUp();

        Role::factory()->standard()->create();
        self::$userPass = fake()->password(6, 12);
        self::$owner = User::factory()->create(['password' => self::$userPass]);
    }

    public function test_register_can_be_created()
    {
        $register = Register::factory()->createQuietly([
            'owner_id' => self::$owner->id
        ]);

        $db = Register::find($register->id)->first();

        $this->assertDatabaseHas('registers', Arr::except($register->toArray(), ['created_at', 'updated_at', 'login', 'password']));
        $this->assertEquals($register->login, $db->login);
        $this->assertEquals($register->password, $db->password);
    }

    public function test_register_password_is_encrypted()
    {
        $register = Register::factory()->createQuietly();
        $db = Register::find($register->id)->first();

        $this->assertEquals($db->password, $db->password);
    }

    public function test_register_has_owner_relationship()
    {
        $register = Register::factory()->createQuietly();

        $this->assertInstanceOf(BelongsTo::class, $register->owner());
        $this->assertInstanceOf(User::class, $register->owner);
    }

    public function test_register_has_changes_relationship()
    {
        $register = Register::factory()->createQuietly();

        $this->assertInstanceOf(HasMany::class, $register->changes());
    }
}
