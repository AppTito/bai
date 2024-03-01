<?php

namespace App\Http\Controllers;

use App\Models\Donors;
use Illuminate\Http\JsonResponse;


class ApiDonorsController extends Controller
{
    public function index(): JsonResponse
    {
        $donors = Donors::where('status', 1)->latest()->paginate(100);
        return response()->json($donors);
    }
}
