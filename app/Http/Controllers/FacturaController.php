<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacturaController extends Controller
{
    public function customPage(): Response
    {
        return Inertia::render('FacturaBAI/Factura');
    }
}
