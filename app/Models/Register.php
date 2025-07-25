<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class Register extends Model
{
    /** @use HasFactory<\Database\Factories\RegisterFactory> */
    use HasFactory;

    protected $fillable = [
        'description',
        'type',
        'login',
        'password',
        'notes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function setLoginAttribute($value)
    {
        $this->attributes['login'] = empty($value) ? '' : Crypt::encryptString($value);
    }

    public function getLoginAttribute($value): string
    {
        return empty($value) ? '' : Crypt::decryptString($value);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = empty($value) ? '' : Crypt::encryptString($value);
    }
}
