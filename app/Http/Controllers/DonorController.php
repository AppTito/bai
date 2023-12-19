<?php

namespace App\Http\Controllers;

use App\Http\Requests\DonorRequest;
use App\Models\Donors;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DonorController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:donor-list|donor-create|donor-edit|donor-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:donor-create', ['only' => ['create','store']]);
        $this->middleware('permission:donor-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:donor-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $donors = Donors::where('status', 1)->latest()->paginate(4);
        return Inertia::render('Donors/Index', ['donors' => $donors]);
    }

    public function create(): Response
    {
        return Inertia::render('Donors/Create');
    }

    public function store(DonorRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        Donors::create($validatedData);
        return redirect()->route('donors.index');
    }

    public function show(Donors $donor): Response
    {
        return Inertia::render('Donors/Show', ['donor' => $donor]);
    }

    public function edit(Donors $donor): Response
    {
        return Inertia::render('Donors/Edit',['donor' => $donor]);
    }

    public function update(DonorRequest $request, Donors $donor): RedirectResponse
    {
        $validatedData = $request->validated();
        $donor->update($validatedData);
        return redirect()->route('donors.index');
    }

    public function destroy(Donors $donor): RedirectResponse
    {
        $donor->update(['status' => 0]);
        return redirect()->route('donors.index');
    }

}
