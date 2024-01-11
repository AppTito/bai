<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Inertia\Inertia;

use Illuminate\Http\Request;

class DistributionController extends Controller
{
    //index
    public function index()
    {
        $organization = Organization::all();
        return Inertia::render('Distribution/Distribution', ['organization' => $organization]);
    }
}
