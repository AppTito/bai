<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Waste;
use Inertia\Response;
use App\Models\Donors;
use App\Models\Category;
use App\Models\Operation;
use App\Models\Organization;
use Illuminate\Http\Request;


use Spatie\Permission\Models\Role;
use App\Models\OperationWastesCategory;

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

    public function control(Request $request)
    {
        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = $request->input('donors_id');
        $date = $request->input('date');
        $donors_id = Donors::find($donors_id);
        return Inertia::render('Operations/Control', ['categories' => $categories, 'donors_id' => $donors_id, 'date' => $date, 'waste' => $wastes]);
    }

    public function guardar(Request $request)
    {
        $allCellValues = $request->input('allCellValues');

        $donors = $request->input('donors');
        $weigth = $request->input('weigth');
        $recovered = $request->input('recovered');
        $date = $request->input('date');

        $operation = new Operation();
        $operation->donor_id = $donors;
        $operation->total_weight = $weigth;
        $operation->recovered = $recovered;
        $operation->percentage = 0; //ACTUALIZAR DE ACUERDO AL TOTAL DE LOS KILOS
        $operation->date = $date;
        $operation->user_id = 1;
        $operation->save();

        $ultimoRegistro = Operation::orderBy('id', 'desc')->first();
        $longitud = count($allCellValues);
        $longitudColumnas = count($allCellValues[0]);

        for ($fila = 0; $fila < $longitud - 1; $fila++) {
            for ($columna = 0; $columna < $longitudColumnas - 1; $columna++) {
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


    public function operationsbydate(Request $request): Response
    {
        // $fecha = '2024-01-16'; 
        // \Log::info('Raw Request Data: ' . json_encode($request->all()));
        $fecha = $request->input('date1');
        $operations = Operation::join('donors', 'operations.donor_id', '=', 'donors.id')
            ->select('operations.*', 'donors.name as donor_name')
            ->whereDate('operations.date', $fecha)
            ->latest()
            ->paginate(4);
        return Inertia::render('Operations/OperationsByDate', ['operations' => $operations]);
    }

}
