<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Donors;
use App\Models\Estimate;
use App\Models\EstimateDistribution;
use App\Models\Operation;
use App\Models\Waste;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\JsonResponse;
use App\Models\Distribution;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class DistributionController extends Controller
{

    public function index(Request $request): Response
    {
        $request->validate([
            'date' => 'required',
            'donors_id' => 'required'
        ]);
        $donors_id = Donors::findOrFail($request->input('donors_id'));
        $date = $request->input('date');
        $organization = Organization::all();
        $category = Category::all()->where('status', 1);
        return Inertia::render('Distribution/Distribution', ['organization' => $organization, 'donors_id' => $donors_id, 'date' => $date, 'category' => $category]);
    }

    public function loadData(Request $request): JsonResponse
    {
        $date = $request->input('date');
        $donor_id = $request->input('donors_id');
        $estimates = Estimate::select('organization_id', 'percentage','donor_id', 'kilos_total' , 'kilos_pending')
        ->where('date', $date)
        ->where('percentage', '!=', 0)
        ->where('donor_id', '=', $donor_id)
        ->get();
        $orgLength = $estimates->count();
        $totalKilos = $estimates->sum('kilos_total');

        return response()->json(['orgLength' => $orgLength, 'totalKilos' => $totalKilos, 'estimates' => $estimates]);
    }

    public function saveAll(Request $request): JsonResponse
    {
        $request->validate([
            'donors_id' => 'required|integer',
            'date' => 'required|date',
            'data' => 'required|array',
            'data.*.id' => 'required|integer',
            'data.*.organization.id' => 'required|integer',
            'data.*.percentage' => 'required|numeric',
            'data.*.pendingKg' => 'required|numeric',
        ]);

        $donors_id = $request->input('donors_id');
        $date = $request->input('date');
        $data = $request->input('data');

        // Mapping array
        $mapping = [
            'carbohidratoprocesado' => 'procesados',
            'carbohidrato' => 'carbohidratos',
            'salsaaderezocondimentos' => 'salsas',
            'proteinaprocesada' => 'proteina',
            'jugosbebidas' => 'jugos',
            'enlatadosconservas' => 'enlatados',
            'alimentoprocesadokfc' => 'procesado_kfc',
            'proteinakfc' => 'proteina_kfc'
        ];

        foreach ($data as $item) {
            $estimateDistribution = new EstimateDistribution();
            $estimateDistribution->date = $date;
            $estimateDistribution->donor_id = $donors_id;
            $estimateDistribution->organization_id = $item['organization']['id'];

            // Assuming that the keys of the remaining properties in the $item array are the category names
            foreach ($item as $key => $value) {
                if (!in_array($key, ['id', 'organization', 'percentage', 'pendingKg','totalKg'])) {
                    // Use the mapping array to get the correct column name
                    $columnName = $mapping[$key] ?? $key;
                    $estimateDistribution->$columnName = $value;
                }
            }

            $estimateDistribution->save();
        }
//        return redirect()->route('operations.index')->with('successMsg','Producto correctamente Guardado');
        return response()->json(['message' => 'Estimate Distributions saved successfully']);
    }

    public function distributionbydate(Request $request): Response
    {
        $organization = Organization::all();
        $date = $request->input('date');
        $donor_id = $request->input('donor_id');

        $categories = Category::all();
        $wastes = Waste::all();
        $donors_id = $request->input('donors_id');
        $date = $request->input('date');
        $donors_id = Donors::find($donors_id);

        //solo se utiliza para recuperar el nombre del donante
        $donor_name = DB::table('bai.donors')
            ->where('id', $donor_id)
            ->value('name');

        //Sentencia para buscar la distribución en la fecha y donante seleccionado en la tabla de OperationsByDate
        //modificar si es necesario

        /*SELECT * FROM bai.distributions where donor_id = 1 AND date = "2024-01-16" order by id desc LIMIT 1;*/

        /* $distribution = Distribution::join('donors', 'distributions.donor_id', '=', 'donors.id')
             ->where('distributions.donor_id', $donor_id)
             ->where('distributions.date', $date)
             ->orderByDesc('distributions.id')
             ->select('distributions.*', 'donors.name')
             ->first();
         */

        return Inertia::render(
            'Distribution/DistributionByDate',
            [
                'donor_id' => $donor_id,
                'donor_name' => $donor_name,
                'date' => $date,
                'organization' => $organization,
                'categories' => $categories,
                'waste' => $wastes
            ]
        );
    }
}
