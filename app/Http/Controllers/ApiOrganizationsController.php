<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\JsonResponse;

class ApiOrganizationsController extends Controller
{
    public function index(): JsonResponse
    {
        $organization = Organization::where('status', 1)->latest()->paginate(100);
        return response()->json($organization);
    }
}
