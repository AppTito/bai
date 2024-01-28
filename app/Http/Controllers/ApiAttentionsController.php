<?php

namespace App\Http\Controllers;

use App\Models\Attention;
use Illuminate\Http\JsonResponse;

class ApiAttentionsController extends Controller
{
    public function index(): JsonResponse
    {
        $attention = Attention::where('status', 1)->latest()->paginate(500);
        return response()->json($attention);
    }
}
