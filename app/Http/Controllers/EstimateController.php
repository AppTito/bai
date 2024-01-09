<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class EstimateController extends Controller
{
    //index
    public function index()
    {
        return Inertia::render('Estimation/Index');
    }
}
