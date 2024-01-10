<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;

class DistributionController extends Controller
{
    //index
    public function index()
    {
        return Inertia::render('Distribution/Distribution');
    }
}
