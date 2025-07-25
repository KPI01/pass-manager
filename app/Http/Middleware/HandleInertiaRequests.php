<?php

namespace App\Http\Middleware;

use App\Models\Register;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $sampleUser =  User::first();
        $sampleRegister =  Register::first();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'token' => $request->session()->token(),
            'auth' => [
                'user' => $request->user(),
                'can' => [
                    'user' => [
                        'viewAny' => $request->user()?->can('viewAny', $sampleUser),
                        'create' => $request->user()?->can('create', $sampleUser),
                        'update' => $request->user()?->can('update', $sampleUser),
                        'delete' => $request->user()?->can('delete', $sampleUser),
                    ],
                    'register' => [
                        'viewAny' => $request->user()?->can('viewAny', $sampleRegister),
                        'create' => $request->user()?->can('create', $sampleRegister),
                        'update' => $request->user()?->can('update', $sampleRegister),
                        'delete' => $request->user()?->can('delete', $sampleRegister),
                    ],
                ]
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
