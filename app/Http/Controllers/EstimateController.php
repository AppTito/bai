<?php

namespace App\Http\Controllers;
use App\Models\Organization;
use Inertia\Inertia;

use Illuminate\Http\Request;

class EstimateController extends Controller
{
    //index
    public function index()
    {
        return Inertia::render('Estimation/Index');
    }

    //distribution
    public function distribution(Request $request)
    {
        $date = $request->input('date');
        $organization = Organization::all();
        return Inertia::render('Estimation/Distribution',[ 'date' => $date , 'organization' => $organization]);
    }
}
