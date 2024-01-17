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
            ['only' => ['index', 'show']]
        );
        $this->middleware('permission:estimation-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:estimation-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:estimation-delete', ['only' => ['destroy']]);
    }

    public function index(): Response
    {
        $donors = Donors::all();
        return Inertia::render('Estimation/Index', ['donors' => $donors]);
    }

    public function distribution(Request $request): Response
    {
        $date = $request->input('date');
        $donors_id = $request->input('donors_id');
        $donors_id = Donors::find($donors_id);
        $organization = Organization::all();
        return Inertia::render('Estimation/Distribution',[ 'date' => $date , 'organization' => $organization, 'donors_id' => $donors_id]);
    }

    public function guardar(Request $request): RedirectResponse
    {
        $allCellValues = $request->input('values');
        $date = $request->input('date');
        $donors = $request->input('donors');

        foreach ($allCellValues as $row) {
            $estimate = new Estimate();
            $estimate->date = $date;
            $estimate->donor_id=$donors;
            $estimate->organization_id = $row[0];
            $estimate->percentage = $row[1];
            $estimate->kilos_send = $row[2];
            $estimate->kilos_total = $row[3];
            $estimate->kilos_pending = $row[4];
            $estimate->save();
        }
        return redirect()->route('estimations.index');
    }
}
