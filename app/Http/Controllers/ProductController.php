<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Inertia\Response;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware(
            'permission:product-list|product-create|product-edit|product-delete',
            ['only' => ['index', 'show']]
        );
        $this->middleware('permission:product-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:product-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:product-delete', ['only' => ['destroy']]);
    }

    /* Visualizar */
    public function index(): Response
    {
        $products = Product::with('category')->where('status', 1)->paginate(4);
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function create(): Response
    {
        $categories = Category::all();
        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();
        Product::create($validatedData);
        return redirect()->route('products.index');
    }

    public function edit(Product $product): Response
    {
        $categories = Category::all();
        $productCategory = $product->category()->getResults();
        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'productCategory' => $productCategory
        ]);
    }


    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());
        return redirect()->route('products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->update(['status' => 0]);
        return redirect()->route('products.index');
    }
}
