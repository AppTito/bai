<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Donors;


use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:operation-list|operation-create|operation-edit|operation-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:operation-create', ['only' => ['create','store']]);
        $this->middleware('permission:operation-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:operation-delete', ['only' => ['destroy']]);
    }
    //index
    public function index()
    {
        $donors = Donors::all();
        return Inertia::render('Operations/Index',['donors'=>$donors]);
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
