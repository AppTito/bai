<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Operation;
use App\Models\OperationWastesCategory;
use App\Models\Organization;
use App\Models\Waste;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Donors;


use Illuminate\Http\Request;

class OperationController extends Controller
{
    public function __construct()
    {
        $this->middleware(
            'permission:operation-list|operation-create|operation-edit|operation-delete',
            ['only' => ['index', 'show']]
        );
        $this->middleware('permission:operation-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:operation-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:operation-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $donors = Donors::all();
        return Inertia::render('Operations/Index', ['donors' => $donors]);
    }

    public function control(Request $request): Response
    {
        $request->validate([
            'date' => 'required',
            'donors_id' => 'required'
        ]);

        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = Donors::findOrFail($request->input('donors_id'));
        $date = $request->input('date');
        return Inertia::render('Operations/Control', ['categories' => $categories, 'donors_id' => $donors_id, 'date' => $date, 'waste' => $wastes]);
    }

    public function guardar(Request $request): RedirectResponse
    {
        $allCellValues = $request->input('allCellValues');

        $donors = $request->input('donors');
        $weight = $request->input('weight');
        $recovered = $request->input('recovered');
        $date = $request->input('date');

        $operation=new Operation();
        $operation->donor_id=$donors;
        $operation->total_weight=$weight;
        $operation->recovered=$recovered;
        $operation->percentage=0; //ACTUALIZAR DE ACUERDO AL TOTAL DE LOS KILOS
        $operation->date=$date;
        $operation->user_id=1;
        $operation->save();

        $ultimoRegistro = Operation::orderBy('id', 'desc')->first();
        $longitud = count($allCellValues);
        $longitudColumnas = count($allCellValues[0]);

        for ($fila = 0; $fila < $longitud - 1; $fila++) {
            for ($columna = 0; $columna < $longitudColumnas-1; $columna++) {
                $opWasteCat = new OperationWastesCategory();
                $opWasteCat->waste_id = ($columna + 1);
                $opWasteCat->category_id = ($fila + 1);
                $opWasteCat->operation_id = $ultimoRegistro['id'];
                $opWasteCat->amount = $allCellValues[$fila][$columna];
                $opWasteCat->save();
            }
        }
        return redirect()->route('operations.index');
    }

}
