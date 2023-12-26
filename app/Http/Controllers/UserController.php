<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
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
        $users = User::latest()->paginate(4);
        $users->map(function ($user) {
            $user->roles = $user->getRoleNames();
            return $user;
        });
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'roles' => RoleResource::collection(Role::all()),
        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $input = $request->validated();
        $input['password'] = Hash::make($input['password']);
        User::create($input)->syncRoles((int)$request->input('roles'));
        return redirect()->route('users.index');
    }

    public function show(User $user): Response
    {
        return Inertia::render('Users/Show', ['user' => $user]);
    }

    public function edit(User $user): Response
    {
        $user->load(['roles']);
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'rolesAll' => RoleResource::collection(Role::all()),
        ]);
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
        $user->syncRoles((int)$request->input('roles'));
        return redirect()->route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return redirect()->route('users.index');
    }
}
