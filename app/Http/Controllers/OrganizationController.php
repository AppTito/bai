<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationRequest;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;


class OrganizationController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:organizations-list|organizations-create|organizations-edit|organizations-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:organizations-create', ['only' => ['create','store']]);
        $this->middleware('permission:organizations-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:organizations-delete', ['only' => ['destroy']]);
    }

    /* Visualizar status 1 */
    public function index() :Response
    {
        $organization = Organization::where('status', 1)->latest()->paginate(4);
        return Inertia::render('Organization/Index',['organization'=>$organization]);
    }

    public function create(): Response
    {/*  */
        return Inertia::render('Organization/Create');
    }

    public function store(OrganizationRequest $request ) : RedirectResponse
    {
        $validatedData = $request->validated();
        Organization::create($validatedData);
        return redirect()->route('organizations.index');
    }

    public function edit(Organization $organization): Response
    {
        return Inertia::render('Organization/Edit', ['organization'=>$organization]);
    }

    public function update(OrganizationRequest $request, $id) : RedirectResponse
    {
        $validatedData = $request->validated();
        $organization = Organization::find($id);
        $organization->update($validatedData);
        return redirect()->route('organizations.index');

    }
    public function destroy(Organization $organization) : RedirectResponse
    {
        $organization->update(['status' => 0]);
        return redirect()->route('organizations.index');
    }
}
