<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class ApiCategoriaController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::where('status', 1)->latest()->paginate(100);
        return response()->json($categories);
    }
}