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

        if (Arr::has($old, 'password')) {
            $old['password'] = Crypt::decryptString($old['password']);
        }

        if (Arr::has($new, 'password')) {
            $new['password'] = Crypt::decryptString($new['password']);
        }

        Change::create([
            'action' => 'update',
            'made_by' => Auth::id(),
            'register_id' => $register->id,
            'old' => json_encode(Arr::only($old, array_keys($new))),
            'new' => json_encode($new),
        ]);

        return;
    }

    /**
     * Handle the Register "deleted" event.
     */
    public function deleted(Register $register): void
    {
        Change::create([
            'action' => 'delete',
            'made_by' => Auth::id(),
            'register_id' => $register->id,
            'old' => $register->toJson()
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
