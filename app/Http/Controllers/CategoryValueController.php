<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoryValue;
use Inertia\Inertia;

class CategoryValueController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:config-list|config-create|config-edit|config-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:config-create', ['only' => ['create','store']]);
        $this->middleware('permission:config-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:config-delete', ['only' => ['destroy']]);
    }
    public function index(){
        $categories = CategoryValue::with('category')->get();
        //return $categories;
        return Inertia::render("Configuration/Index", ["categoryValue"=>$categories]);
    }
}
