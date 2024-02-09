<?php

namespace Database\Seeders;

use App\Models\Control;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ControlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $controls = [
            [
                'donor_id' => 1,
                'date' => now(),
                'recuperado' => 100,
                'c_animal' => 90,
                'compostaje' => 80,
                'basura' => 70,
                'refrigerio' => 60,
                'c_inmediato' => 50,
                'r_papel' => 40,
                'r_carton' => 30,
                'r_plastico' => 20,
                'total' => 10,
            ],
        ];

        foreach ($controls as $control) {
            Control::create($control);
        }
    }
}
