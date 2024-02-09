<?php

namespace Database\Seeders;

use App\Models\Operation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $operations = [
            [
                'donor_id' => 1,
                'date' => now(),
                'total_weight' => 100,
                'recovered' => 90,
                'percentage' => 80,
            ],
        ];

        foreach ($operations as $operation) {
            Operation::create($operation);
        }
    }
}
