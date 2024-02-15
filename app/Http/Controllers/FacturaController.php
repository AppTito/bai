<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Organization;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacturaController extends Controller
{
    public function Factura(Request $request)
    {
        $request->validate([
            'organization.id' => 'required',
        ]);
        $organization = Organization::findOrFail($request->input('organization.id'));
        $productsList = array_values($request->except(['id', 'organization', 'percentage', 'pendingKg']));

        $categories = Category::all()->toArray();

        foreach ($categories as $index => $category) {
            if (isset($productsList[$index])) {
                $categories[$index]['product'] = $productsList[$index];
            }
        }

        $categories = array_filter($categories, function($category) {
            return $category['product'] > 0;
        });

        return Inertia::render('FacturaBAI/Factura', [
            'organization' => $organization,
            'categories' => $categories,
        ]);
    }
}
