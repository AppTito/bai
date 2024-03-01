<?php

namespace App\Http\Controllers;
use App\Models\CategoryValue;

use Illuminate\Http\JsonResponse;

class ApiCategoryValueController extends Controller
{
    public function index(): JsonResponse
    {
        $categoryValue = CategoryValue::where('status', 1)->latest()->paginate(100);
        return response()->json($categoryValue);
    }
}
