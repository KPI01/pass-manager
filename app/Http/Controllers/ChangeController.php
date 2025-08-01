<?php

namespace App\Http\Controllers;

use App\Models\Change;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChangeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (! Auth::user()->can('viewAny', Change::class)) {
            abort(403, 'Permisos insuficientes');
        }

        return inertia('models/change/index', [
            'changes'=> Change::orderBy('created_at', 'desc')->get()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Change $change)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Change $change)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Change $change)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Change $change)
    {
        //
    }
}
