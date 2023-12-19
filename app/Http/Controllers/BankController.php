<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
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
        $banks = Bank::with('category')->paginate(5);
        return Inertia::render('Banks/Index', ["banks"=>$banks]);
    }

    public function edit(): Response
    {
        return Inertia::render('Banks/Edit');
    }
}
