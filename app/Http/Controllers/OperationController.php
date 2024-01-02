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

    //weight
    public function weight()
    {
        return Inertia::render('Operations/Weight');
    }

    //control
    public function control()
    {
        return Inertia::render('Operations/Control');
    }

    //distribution
    public function distribution()
    {
        return Inertia::render('Operations/Distribution');
    }
}
