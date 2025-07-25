<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Http\Requests\Models\Register\StoreRegisterRequest;
use App\Http\Requests\Models\Register\UpdateRegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $entityType = $request->query('entity');

        $registers = $entityType !== null
            ? Register::where(['type' => $entityType])
            ->get()
            : Register::all();

        if (! Auth::user()->can('viewAny', $registers->first())) {
            abort(403, 'Permisos insuficientes.');
        }

        return inertia('models/register/index', [
            'registers' => $registers,
            'entityType' => $entityType,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterRequest $request)
    {
        $validated = $request->validated();

        Register::create($validated);

        return to_route('registers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Register $register)
    {
        //
    }

    /**
     * Reveal the user's password
     */
    public function revealPassword(Register $register)
    {
        if (! Auth::user()->can('seePassword', $register)) {
            return response()->json([
                'status' => 'error',
                'error' => 'No tienes permisos para ver la contraseña'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'password' => Crypt::decryptString($register->password)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Register $register)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegisterRequest $request, Register $register)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Register $register)
    {
        if (! Auth::user()->can('delete', $register)) {
            abort(403, 'Permisos insuficientes.');
        }

        $register->delete();

        return to_route('registers.index');
    }
}
