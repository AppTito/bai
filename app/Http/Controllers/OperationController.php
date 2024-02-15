<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Waste;
use Inertia\Response;
use App\Models\Donors;
use App\Models\Category;
use App\Models\Operation;
use App\Models\Distribution;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Control;

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

    public function control(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'donors_id' => 'required',
            'totals' => 'required'
        ]);
        $operation = new Operation;
        $distribution = new Distribution;
        $donorsId = $request->input('donors_id');
        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = Donors::findOrFail($donorsId);
        $date =$request->input('date');
        $totals = $request->input('totals');
        $porcentaje = $request->input('totals');
        $totals = array_slice($totals, 1,17);

        //dd($porcentaje);
        //guardar operacion
        $operation->donor_id=$donorsId;
        $operation->total_weight=$request->input('pesoTotal');
        $operation->recovered=$request->input("pesoRecuperado");
        $operation->percentage=$porcentaje["totalPercentage"];
        $operation->date=$date;
        $operation->save();
        //guardar distribucion
        $distribution->donor_id=$donorsId;
        $distribution->date=$date;
        $distribution->porcentaje=$porcentaje["totalPercentage"];
        $distribution->fruver=$totals["totalValues"][0];
        $distribution->lacteos=$totals["totalValues"][1];
        $distribution->panaderia=$totals["totalValues"][2];
        $distribution->granos=$totals["totalValues"][3];
        $distribution->embutidos=$totals["totalValues"][4];
        $distribution->huevos=$totals["totalValues"][5];
        $distribution->cereales=$totals["totalValues"][6];
        $distribution->reposteria=$totals["totalValues"][7];
        $distribution->procesados=$totals["totalValues"][8];
        $distribution->salsas=$totals["totalValues"][9];
        $distribution->proteina=$totals["totalValues"][10];
        $distribution->jugos=$totals["totalValues"][11];
        $distribution->carbohidratos=$totals["totalValues"][12];
        $distribution->floristeria=$totals["totalValues"][13];
        $distribution->enlatados=$totals["totalValues"][14];
        $distribution->proteina_kfc=$totals["totalValues"][15];
        $distribution->procesado_kfc=$totals["totalValues"][16];
        $distribution->total=$totals["totalKg"];
        $distribution->kg_pendientes=$totals["totalPendingKg"];
        $distribution->save();

        return Inertia::render('Operations/Control', [
            'categories' => $categories, 'donors_id' => $donors_id, 'date' => $date, 'waste' => $wastes, 'totals' => $totals, ]);
    }

    public function guardar(Request $request): RedirectResponse
    {
        $allCellValues = $request->input('allCellValues');
        $donors = $request->input('donors');
        $date = $request->input('date');

        $longitud = count($allCellValues);
        $control = new Control;
        $control->donor_id = $donors;
        $control->date = $date;
        $longFin = $longitud - 1;

        $control->recuperado = $allCellValues[$longFin][0];
        $control->c_animal = $allCellValues[$longFin][1];
        $control->compostaje = $allCellValues[$longFin][2];
        $control->basura = $allCellValues[$longFin][3];
        $control->refrigerio = $allCellValues[$longFin][4];
        $control->c_inmediato = $allCellValues[$longFin][5];
        $control->r_papel = $allCellValues[$longFin][6];
        $control->r_carton = $allCellValues[$longFin][7];
        $control->r_plastico = $allCellValues[$longFin][8];
        $control->total = $allCellValues[$longFin][10];
        $control->save();
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
        $request->validate([
            'date1' => 'required',
        ]);

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
            ->paginate(5);
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
