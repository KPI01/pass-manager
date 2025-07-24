<?php

namespace App\Http\Controllers;

use App\Http\Requests\Models\User\StoreUserRequest;
use App\Http\Requests\Models\User\UpdateUserRequest;
use App\Http\Requests\UpdateUserPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()?->can('viewAny', User::class)) {
            abort(403, 'Permisos insuficientes.');
        }
        return inertia('models/user/index', ["users" => User::where('id', '!=', Auth::id())->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()?->can('create', User::class)) {
            abort(403, 'Permisos insuficientes.');
        }
        return inertia('models/user/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        if (!Auth::user()?->can('create', User::class)) {
            abort(403, 'Permisos insuficientes.');
        }

        $validated = $request->validated();
        User::create([
            'email' => $validated['email'],
            'name' => $validated['name'],
            'password' => Hash::make($validated['password']),
        ]);

        return to_route('user.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if (!Auth::user()?->can('update', $user)) {
            abort(403, 'Permisos insuficientes.');
        }

        $validated = $request->validated();

        $user->update($validated);

        return to_route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if (!Auth::user()?->can('delete', $user)) {
            abort(403, 'Permisos insuficientes.');
        }

        $user->delete();

        return to_route('user.index');
    }
}
