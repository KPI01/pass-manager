<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Crypt;

class Change extends Model
{
    /** @use HasFactory<\Database\Factories\ChangesFactory> */
    use HasFactory;

    const UPDATED_AT = null;

    protected $fillable = [
        'action',
        'made_by',
        'register_id',
        'old',
        'new'
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    protected $hidden = [
        'made_by',
        'register_id'
    ];

    protected $with = ['madeBy', 'register'];

    /**
     * Encrypts the value before saving it.
     * @param string $value
     * @return void
     */
    public function setOldAttribute(string $value): void
    {
        $this->attributes['old'] = empty($value) ? '' : Crypt::encryptString($value);
    }

    /**
     * Decrypts the value before getting it to know its content.
     * @param string $value
     * @return string
     */
    public function getOldAttribute(string $value): string
    {
        return empty($value) ? '' : Crypt::decryptString($value);
    }

    /**
     * Encrypts the value before saving it.
     * @param string $value
     * @return void
     */
    public function setNewAttribute(string $value): void
    {
        $this->attributes['new'] = Crypt::encryptString($value);
    }

    /**
     * Decrypts the value before getting it to know its content.
     * @param string $value
     * @return string
     */
    public function getNewAttribute(string $value): string
    {
        return empty($value) ? '' : Crypt::decryptString($value);
    }

    /** 
     * Relation with the model App\Models\User
     * @return BelongsTo
     */
    public function madeBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'made_by');
    }

    /**
     * Relation wit the model App\Models\Register
     * @return BelongsTo
     */
    public function register(): BelongsTo
    {
        return $this->belongsTo(Register::class);
    }
}
