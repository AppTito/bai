<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Illuminate\Http\JsonResponse;

class ApiBankController extends Controller
{
    public function index(): JsonResponse
    {
        $bank = Bank::where('status', 1)->latest()->paginate(500);
        return response()->json($bank);
    }
}
