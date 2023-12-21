<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryValue;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class CategoryValueController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:categoryValue-list|categoryValue-create|categoryValue-edit|categoryValue-delete',
            ['only' => ['index','show']]);
        $this->middleware('permission:categoryValue-create', ['only' => ['create','store']]);
        $this->middleware('permission:categoryValue-edit', ['only' => ['edit','update']]);
        $this->middleware('permission:categoryValue-delete', ['only' => ['destroy']]);
    }
  
    public function index():Response
    {
        $categoryValues = CategoryValue::listCategoryValues();
        return Inertia::render('CategoryValues/Index', [
            'categoryValues' => $categoryValues
        ]);
    }

    public function edit(Category $categoryValue):Response
    {
        $categoryValues = CategoryValue::listCategoryValues()->where('id', $categoryValue->id)->first();
        return Inertia::render('CategoryValues/Edit', [
            'categoryValue' => $categoryValue,
            'categoryValues' => $categoryValues,
        ]);
    }

    public function update(Request $request, $id):RedirectResponse
    {
        $validateData = $request->validate([
            'category_id' => 'required',
            'value' => 'required',
        ]);
        CategoryValue::updateOrCreate(['id' => $id], $validateData);
        return redirect()->route('categoryValues.index');
    }
}
