<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacturaController extends Controller
{
    public function Factura(Request $request): Response
    {
        $request->validate([
            'organization.id' => 'required',
        ]);
        $organization = Organization::findOrFail($request->input('organization.id'));


        return Inertia::render('FacturaBAI/Factura', [
            'organization' => $organization,
            'filteredData' => $request->all(),
        ]);
    }
}
