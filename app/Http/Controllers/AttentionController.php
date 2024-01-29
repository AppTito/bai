<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttentionRequest;
use App\Models\Organization;
use App\Models\Attention;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AttentionController extends Controller
{
    public function __construct()
    {
        $this->middleware(
            'permission:attention-list|attention-create|attention-edit|attention-delete',
            ['only' => ['index', 'show']]
        );
        $this->middleware('permission:attention-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:attention-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:attention-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $attention = Attention::listOrganizationValues();
        return Inertia::render('Attention/Index', ['attention' => $attention]);
    }

    public function create(): Response
    {
        $organization = Organization::all();
        return Inertia::render('Attention/Create', [
            'organizacion' => $organization
        ]);
    }

    public function store(AttentionRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        Attention::create($validatedData);
        return redirect()->route('attentions.index');
    }

    public function edit(Attention $attention): Response
    {
        $organization = Organization::all();
        $attentionOrganization = $attention->organization;

        return Inertia::render('Attention/Edit', [
            'attention' => $attention,
            'organizacion' => $organization,
            'attentionOrganization' => $attentionOrganization,
        ]);
    }


    public function update(AttentionRequest $request, Attention $attention): RedirectResponse
    {
        $validatedData = $request->validated();
        $attention->update($validatedData);
        return redirect()->route('attentions.index');
    }

    public function destroy(Attention $attention): RedirectResponse
    {
        $attention->update(['status' => 0]);
        return redirect()->route('attentions.index');
    }
}
