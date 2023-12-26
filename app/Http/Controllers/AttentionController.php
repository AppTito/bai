<?php

namespace App\Http\Controllers;


use App\Http\Requests\AttentionRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use App\Models\Attention;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
class AttentionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:attentions-list|attentions-create|attentions-edit|attentions-delete',
        ['only' => ['index','show']]);
        $this->middleware('permission:attentions-create', ['only' => ['create','store']]);
        $this->middleware('permission:attentions-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:attentions-delete', ['only' => ['destroy']]);
    }

    public function index() 
    {
        $attention = Attention::listOrganizationValues();
        //$attention = Attention::organization();
        //return $attention;
        return Inertia::render('Attention/Index',['attention'=>$attention]);
    }
    public function create(): Response
    {
        $organization= Organization::all();
        return Inertia::render('Attention/Create', [
            'organizacion' => $organization
        ]); 
        
    }
    public function store(AttentionRequest $request ) 
    {
        $validatedData = $request->validated();
        Attention::create($validatedData);
        return redirect()->route('attentions.index');
    }
    public function edit(Attention $attention): Response
    {
        $organization=Organization::all();
        $attentionOrg = $attention->organization()->getResults();
        return Inertia::render('Attention/Edit', [
            'attention'=>$attention,
            'organizacion'=>$organization,
            'attOrg'=>$attentionOrg,
        ]);
    }

    public function update(AttentionRequest $request, Attention $attention) : RedirectResponse
    {
        $validatedData = $request->validated();
        //$attention = Attention::find($id);
        $attention->update($validatedData);
        return redirect()->route('attentions.index');

    }
    public function destroy(Attention $attention) : RedirectResponse
    {
        $attention->update(['status' => 0]);
        return redirect()->route('attentions.index');
    }
}
