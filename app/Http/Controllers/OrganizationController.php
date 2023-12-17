<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function index() :Response
    {
        $organization = Organization::where('status', 1)->latest()->paginate(4);
        return Inertia::render('Organization/Index',['organization'=>$organization]);
    }
    public function create(){
        return Inertia::render('Organization/Create');
    }
    public function store(Request $request) : RedirectResponse
    {
        $request->validate([
            'code'=>'required|max:20',
            'address'=>'required|max:255',
            'ruc'=>'required|max:13',
        ]);
        $organization = new Organization($request->input());
        $organization->save();
        return redirect()->route('organizations.index');
    }
    public function edit(Organization $organization){
        return Inertia::render('Organization/Edit', ['organization'=>$organization]);
    }
    public function update(Request $request, $id) : RedirectResponse
    {
        $request->validate([
            'code'=>'required|max:20',
            'address'=>'required|max:255',
            'ruc'=>'required|max:13',
        ]);
        $organization = Organization::find($id);
        $organization->update($request->all());
        return redirect()->route('organizations.index');

    }
    public function destroy(Organization $organization) : RedirectResponse
    {
        $organization->update(['status' => 0]);
        return redirect()->route('organizations.index');
    }
}
