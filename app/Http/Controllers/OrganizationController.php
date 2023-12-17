<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;

class OrganizationController extends Controller
{
    public function index() {
        $organization = Organization::all();
        return Inertia::render('Organization/Index',['organization'=>$organization]);
    }
    public function create(){
        return Inertia::render('Organization/Create');
    }
    public function store(Request $request) {
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
    public function update(Request $request, $id) {
        $request->validate([
            'code'=>'required|max:20',
            'address'=>'required|max:255',
            'ruc'=>'required|max:13',
        ]);
        $organization = Organization::find($id);
        $organization->update($request->all());
        return redirect()->route('organizations.index');
        
    }
    public function destroy(Organization $organization) {
        $organization->delete();
        return redirect()->route('organizations.index');
    }
}
