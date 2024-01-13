<?php

namespace Database\Seeders;

use App\Models\Waste;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WastesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $wastes = [
            ['item' => 'Recuperado'],
            ['item' => 'Consumo Animal'],
            ['item' => 'Compostaje'],
            ['item' => 'Basura'],
            ['item' => 'Refrigerio'],
            ['item' => 'Consumo Inmediato'],

        ];

        foreach ($wastes as $waste) {
            Waste::create($waste);
        }
    }
}
