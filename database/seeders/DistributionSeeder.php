<?php

namespace Database\Seeders;

use App\Models\Distribution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistributionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $distributions = [
            [
                'donor_id' => 1,
                'date' => now(),
                'porcentaje' => 100,
                'fruver' => 90,
                'lacteos' => 80,
                'panaderia' => 70,
                'granos' => 60,
                'embutidos' => 50,
                'huevos' => 40,
                'cereales' => 40,
                'reposteria' => 30,
                'procesados' => 20,
                'salsas' => 20,
                'proteina' => 80,
                'jugos' => 20,
                'carbohidratos' => 40,
                'floristeria' => 40,
                'enlatados' => 10,
                'proteina_kfc' => 60,
                'procesado_kfc' => 20,
                'total' => 10,
                'kg_pendientes' => 90,
            ],
        ];

        foreach ($distributions as $distribution) {
            Distribution::create($distribution);
        }
    }
}
