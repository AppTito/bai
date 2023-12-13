<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:permission-list|permission-create|permission-edit|permission-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:permission-create', ['only' => ['create','store']]);
        $this->middleware('permission:permission-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:permission-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $permissions = Permission::all();
        return Inertia::render('Permissions/Index', ['permissions' => $permissions]);
    }

    public function create(): Response
    {
        return Inertia::render('Permissions/Create');
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        Permission::create($validatedData);
        return redirect()->route('permissions.index');
    }

    public function show(Permission $permission): Response
    {
        return Inertia::render('Permissions/Show', ['permission' => $permission]);
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('Permissions/Edit',['permission' => $permission]);
    }

    public function update(PermissionRequest $request, Permission $permission): RedirectResponse
    {
        $validatedData = $request->validated();
        $permission->update($validatedData);
        return redirect()->route('permissions.index');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();
        return redirect()->route('permissions.index');
    }

}
