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
        return redirect()->route('organizaciones.index');
    }
    public function edit(Organization $organization){
        //$organization = Organization::find($id);
        return Inertia::render('Organization/Edit', ['organization'=>$organization]);
    }
    public function update(Request $request, $id) {
        /*$request->validate([
            'code'=>'required|max:20',
            'address'=>'required|max:255',
            'ruc'=>'required|max:13',
        ]);
        $organization->update($request->all());*/
        //$organization->fill($request->input())->saveOrFail();
        $validatedData = $request->validated();
        $organization = Organization::find($id);
        $organization->update($validatedData);
        return redirect('organizaciones');
        
    }
    public function destroy($id) {
        $organization = Organization::find($id);
        $organization->delete();
        return redirect('organizaciones');
    }
}
