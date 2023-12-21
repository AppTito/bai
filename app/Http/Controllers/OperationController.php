<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class OperationController extends Controller
{
    //index
    public function index()
    {
        return Inertia::render('Operations/Index');
    }
}
