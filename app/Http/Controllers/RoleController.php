<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:role-list|role-create|role-edit|role-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:role-create', ['only' => ['create','store']]);
        $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $roles = Role::latest()->paginate(4);
        return Inertia::render('Roles/Index', ['roles' => $roles]);
    }

    public function create(): Response
    {
        $permissions = Permission::all();
        return Inertia::render('Roles/Create', ['permissions' => $permissions]);
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        $role = Role::create(['name' => $validatedData['name']]);
        $permissions = array_map('intval', $validatedData['permissions']);
        $role->syncPermissions($permissions);
        return redirect()->route('roles.index');
    }

    public function edit(Role $role): Response
    {
        $permissions = Permission::all();
        $rolePermissions = $role->permissions->pluck('id')->toArray();
        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions]
        );
    }

    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        $validatedData = $request->validated();
        $role->update(['name' => $validatedData['name']]);
        if ($request->has('permissions')) {
            $role->syncPermissions($request->input('permissions'));
        }
        return redirect()->route('roles.index');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();
        return redirect()->route('roles.index');
    }
}
