<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Waste;
use App\Models\Donors;
use App\Models\Category;
use App\Models\Operation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReportsController extends Controller
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
        return Inertia::render('Reports/Index', ['donors' => $donors]);
    }

    public function operationsByDate(Request $request): Response
    {
        $request->validate([
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
        ]);

        $startDate = Carbon::parse($request->input('startDate'));
        $endDate = Carbon::parse($request->input('endDate'));

        $operations = Operation::whereBetween('date', [$startDate, $endDate])
            ->with('donor') // Asegúrate de tener la relación definida en tu modelo Operation
            ->orderByDesc('created_at')
            ->paginate(5);

        return Inertia::render('Reports/OperationsByDate', ['startDate' => $startDate, 'endDate' => $endDate, 'operations' => $operations]);
    }

    public function controlByDate(Request $request): Response
    {
        $categories = Category::all();
        $wastes = Waste::all();
        $donorsId = $request->input('donors_id');
        $date = $request->input('date');
        $donor = Donors::find($donorsId);

        return Inertia::render('Reports/ControlByDate', ['categories' => $categories, 'donor' => $donor, 'date' => $date, 'wastes' => $wastes]);
    }
}
