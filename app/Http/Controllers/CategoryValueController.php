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

    public function update(Request $request, CategoryValue $categoryValue): RedirectResponse
    {
        $categoryValue->update($request->validate([
            'category_id' => 'required',
            'value' => 'required',
        ]));
        return redirect()->route('categoryValues.index');
    }

}
