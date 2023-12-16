<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;


class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:user-list|user-create|user-edit|user-delete',
            ['only' => ['index', 'show']]);
        $this->middleware('permission:user-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:user-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:user-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $categories = Category::where('status', 1)->latest()->paginate(4);
        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'category' => 'required|max:255',
            'indicator' => 'required|max:255',
            'code' => 'required|max:20'
        ]);
        $category = new Category($request->input());
        $category->save();
        return redirect()->route('categories.index');
    }
    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validatedData = $request->validate([
            'category' => 'required|max:255',
            'indicator' => 'required|max:255',
            'code' => 'required|max:20'
        ]);

        $category->update($validatedData);

        return redirect()->route('categories.index');
    }
    public function destroy(Request $request, Category $category): RedirectResponse
    {
        $inactivo = [
            'status' => 0
        ];
        $category->update($inactivo);

        return redirect()->route('categories.index');
    }

    public function destroy1(Category $category): RedirectResponse
    {
        $category->delete();
        return redirect()->route('categories.index');
    }

}
