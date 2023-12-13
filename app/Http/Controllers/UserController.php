<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:user-list|user-create|user-edit|user-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:user-create', ['only' => ['create','store']]);
        $this->middleware('permission:user-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:user-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $users = User::all();
        $usersWithRoles = $users->map(function ($user) {
            $user->roles = $user->getRoleNames();
            return $user;
        });
        return Inertia::render('Users/Index', ['users' => $usersWithRoles]);
    }

    public function create(): Response
    {
        $roles = Role::all()->pluck('name');
        return Inertia::render('Users/Create', ['roles' => $roles]);
    }

    public function store(UserRequest $request)
    {
        $input = $request->validated();
        $input['password'] = Hash::make($input['password']);
        User::create($input)->assignRole($request->input('roles'));
        return redirect()->route('users.index');
    }

    public function show(User $user): Response
    {
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    public function edit(User $user): Response
    {
        $roles = Role::all()->pluck('name');
        $userRole = $user->getRoleNames();
        return Inertia::render('Users/Edit',
            [ 'user' => $user, 'roles' => $roles, 'userRole' => $userRole ]);
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $input = $request->validated();
        if (!empty($input['password'])) {
            $input['password'] = Hash::make($input['password']);
        } else {
            unset($input['password']);
        }
        $user->update($input);
        $user->roles()->detach();
        $user->assignRole($request->input('roles'));
        return redirect()->route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}
