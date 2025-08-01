<?php

namespace App\Observers;

use App\Models\Change;
use App\Models\Register;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class RegisterObserver
{
    /**
     * Handle the Register "created" event.
     */
    public function created(Register $register): void
    {
        Change::create([
            'action' => 'creation',
            'made_by' => Auth::id(),
            'register_id' => $register->id,
            'old' => null,
            'new' => $register->toJson(),
        ]);

        return;
    }

    /**
     * Handle the Register "updated" event.
     */
    public function updated(Register $register): void
    {
        $old = $register->getOriginal();
        $new = Arr::except($register->getDirty(), ['created_at', 'updated_at']);
        if (Arr::has($new, 'login')) {
            $new['login'] = Crypt::decryptString($new['login']);

            if ($new['login'] === $old['login']) {
                $new = Arr::except($new, 'login');
            }
        }
        if (Arr::has($new, 'password')) {
            $new['password'] = Crypt::decryptString($new['password']);

            if ($new['password'] === $old['password']) {
                $new = Arr::except($new, 'password');
            }
        }

        Change::create([
            'action' => 'update',
            'made_by' => Auth::id(),
            'register_id' => $register->id,
            'old' => json_encode(Arr::except(Arr::only($old, array_keys($new)),['updated_at','created_at'])),
            'new' => json_encode($new),
        ]);

        return;
    }

    /**
     * Handle the Register "deleted" event.
     */
    public function deleted(Register $register): void
    {
        $values = [];

        foreach ($register->getOriginal() as $key => $value) {
            $values[$key] = $value;
        };

        $values = Arr::except($values, ['id', 'updated_at', 'owner_id', 'owner']);

        Change::create([
            'action' => 'delete',
            'made_by' => Auth::id(),
            'register_id' => $register->id,
            'old' => $values
        ]);

        return;
    }

    /**
     * Handle the Register "restored" event.
     */
    public function restored(Register $register): void
    {
        //
    }

    /**
     * Handle the Register "force deleted" event.
     */
    public function forceDeleted(Register $register): void
    {
        //
    }
}
