<?php

namespace App\Http\Controllers;

use App\Models\Donors;
use App\Models\Estimate;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;

class EstimateController extends Controller
{
    public function __construct()
    {
        $this->middleware(
            'permission:estimation-list|estimation-create|estimation-edit|estimation-delete',
            ['only' => ['index']]
        );
    }

    public function index(): Response
    {
        $donors = Donors::all();
        return Inertia::render('Estimation/Index', ['donors' => $donors]);
    }

    public function distribution(Request $request): Response
    {
        $request->validate([
            'date' => 'required',
            'donors_id' => 'required'
        ]);

        $date = $request->input('date');
        $donors = Donors::findOrFail($request->input('donors_id'));
        $organization = Organization::all();
        return Inertia::render('Estimation/Distribution',[ 'date' => $date , 'organization' => $organization, 'donors_id' => $donors]);
    }

    public function guardar(Request $request): RedirectResponse
    {
        $request->validate([
            'values' => 'required',
            'date' => 'required',
            'donors' => 'required'
        ]);

        $allCellValues = $request->input('values');
        $date = $request->input('date');
        $donors = $request->input('donors');

        foreach ($allCellValues as $row) {
            Estimate::create([
                'date' => $date,
                'donor_id' => $donors,
                'organization_id' => $row[0],
                'percentage' => $row[1],
                'kilos_send' => $row[2],
                'kilos_total' => $row[3],
                'kilos_pending' => $row[4],
            ]);
        }
        return redirect()->route('estimations.index');
    }
}
