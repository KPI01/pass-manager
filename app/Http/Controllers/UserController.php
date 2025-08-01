<?php

namespace App\Http\Controllers;

use App\Http\Requests\Models\User\StoreUserRequest;
use App\Http\Requests\Models\User\UpdateUserRequest;
use App\Models\User;
use App\Models\Role;
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

        return inertia('models/user/index', [
            'users' => User::where('id', '!=', Auth::id())->get(),
            'aux' => ['roles' => Role::all()->pluck('name', 'id')->toArray()],
        ]);
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
            'role_id' => $validated['role_id'],
        ]);

        return to_route('user.index');
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

    /**
     * Get the role of a user.
     */
    public function getRole(User $user)
    {
        return response()->json([
            'status' => 'success',
            'role' => $user->role->short
        ]);
    }
}
