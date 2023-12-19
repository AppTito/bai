<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\BankRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\Bank;
use Inertia\Inertia;
use Inertia\Response;



class BankController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:bank-list|bank-create|bank-edit|bank-delete',
            ['only' => ['index', 'show']]);
        $this->middleware('permission:bank-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:bank-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:bank-delete', ['only' => ['destroy']]);
    }
    public function index(): Response
    {
        $banks = Bank::where('status', 1)->latest()->paginate(4);
        //return $banks;
        return Inertia::render('Banks/Index', ["banks"=>$banks]);
    }

    public function edit(Bank $banks): Response
    {
        return Inertia::render('Banks/Edit', ["banks"=>$banks]);
    }
    public function update(BankRequest $request, $id) : RedirectResponse
    {
        $validatedData = $request->validated();
        $organization = Bank::find($id);
        $organization->update($validatedData);
        return redirect()->route('bancos.index');

    }
}
