<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Distribution;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DistributionController extends Controller
{
    //index
    public function index()
    {
        $organization = Organization::all();
        return Inertia::render('Distribution/Distribution', ['organization' => $organization]);
    }

    public function distributionbydate(Request $request): Response
    {
        $organization = Organization::all();
        $date = $request->input('date');
        $donor_id = $request->input('donor_id');
        
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
            ]
        );
    }
}
