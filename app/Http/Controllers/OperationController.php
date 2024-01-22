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
use Illuminate\Http\RedirectResponse;


use Illuminate\Support\Facades\DB;
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

        $operation = new Operation();
        $operation->donor_id = $donors;
        $operation->total_weight = $weight;
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
        /*
        WITH RankedOperations AS (
            SELECT *, ROW_NUMBER() OVER (PARTITION BY donor_id ORDER BY created_at DESC) AS row_num
             FROM bai.operations)
        SELECT * FROM RankedOperations WHERE row_num = 1;
        */

        $date = $request->input('date1');
        $subquery = DB::table('bai.operations')
            ->select('*', DB::raw('ROW_NUMBER() OVER (PARTITION BY donor_id ORDER BY created_at DESC) AS row_num'))
            ->toSql();
        $operations = DB::table(DB::raw("($subquery) as RankedOperations"))
            ->select('RankedOperations.*', 'donors.name as donor_name')
            ->join('donors', 'RankedOperations.donor_id', '=', 'donors.id')
            ->whereDate('RankedOperations.date', $date)
            ->where('RankedOperations.row_num', '=', 1)
            ->latest()
            ->paginate(4);
        return Inertia::render('Operations/OperationsByDate', ['date' => $date, 'operations' => $operations]);
    }

    public function controlbydate(Request $request): Response
    {
        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = $request->input('donors_id');
        $date = $request->input('date');
        $donors_id = Donors::find($donors_id);

        //Sentencia para recuperar la operación de la fecha y el donante seleccionado en ControlByDate
        //modificar según sea necesario porque trae todo lo de la tabla donors y operations
        
        /*
        SELECT  * from bai.operations  inner join bai.donors on operations.donor_id = donors.id where operations.donor_id = 1 AND date = "2024-01-17" order by operations.id desc LIMIT 1;
        */

        /*
        $operation = Operation::join('bai.donors', 'operations.donor_id', '=', 'donors.id')
        ->where('operations.donor_id', $donorId)
        ->where('operations.date', $date)
        ->orderByDesc('operations.id')
        ->limit(1)
        ->get();
        */

        return Inertia::render('Operations/ControlByDate', ['categories' => $categories, 'donors_id' => $donors_id, 'date' => $date, 'waste' => $wastes]);
    }

}
