<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Organization;
use App\Models\Waste;
use Inertia\Inertia;
use App\Models\Donors;


use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function __construct()
    {
        $this->middleware(
            'permission:operation-list|operation-create|operation-edit|operation-delete',
            ['only' => ['index', 'show']]
        );
        $this->middleware('permission:operation-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:operation-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:operation-delete', ['only' => ['destroy']]);
    }
    //index
    public function index()
    {
        $donors = Donors::all();
        return Inertia::render('Operations/Index', ['donors' => $donors]);
    }
    public function formularioIndex(Request $request)
    {
        $data = $request->all();
        return $data;
    }
    //weight
    public function weight()
    {
        return Inertia::render('Operations/Weight');
    }

    //control
    public function control(Request $request)
    {
        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = $request->input('donors_id');
        $date = $request->input('date');
        $donors_id = Donors::find($donors_id);
        //return $donors_id;
        return Inertia::render('Operations/Control', ['categories' => $categories, 'donors_id' => $donors_id, 'date' => $date, 'waste' => $wastes]);
    }

    public function guardar(Request $request)
    {
        $allCellValues = $request->input('allCellValues');
        //insert a la tabla operation
        //$validatedData = $request->validated();
        //Operation::create($validatedData);
        // insert a la tabla operation_wastes_category
        return $allCellValues;
    }

    //distribution
    public function distribution()
    {
        $organization = Organization::all();
        return Inertia::render('Operations/Distribution', ['organization' => $organization]);
    }
}
