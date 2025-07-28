<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;


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

    protected $hidden = [
        'owner_id'
    ];

    protected $with = ['owner'];

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

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
