<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Change;
use App\Observers\RegisterObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy([RegisterObserver::class])]
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

    /**
     * Encrypts the value before saving it.
     * @param string $value
     * @return void
     */
    public function setLoginAttribute(string $value): void
    {
        $this->attributes['login'] = empty($value) ? '' : Crypt::encryptString($value);
    }

    /**
     * Decrypts the value before getting it to know its content.
     * @param string $value
     * @return string
     */
    public function getLoginAttribute(string $value): string
    {
        return empty($value) ? '' : Crypt::decryptString($value);
    }

    /**
     * Encrypts the value before saving it.
     * @param string $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = empty($value) ? '' : Crypt::encryptString($value);
    }

    /**
     * Relationship with App\Model\User to declare who owns the record.
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Relationship with App\Model\Change to register historical data.
     * @return HasMany
     */
    public function changes(): HasMany
    {
        return $this->hasMany(Change::class);
    }
}
