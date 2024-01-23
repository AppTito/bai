<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryValues = [
            ['category_id' => '1', 'value' => 10, 'status' => 'active'],
            ['category_id' => '2', 'value' => 15, 'status' => 'inactive'],
            ['category_id' => '3', 'value' => 20, 'status' => 'active'],
            // ... otros datos
        ];

        // Eliminar todos los registros de la tabla sin restablecer los índices
        DB::table('category_values')->delete();

        // Insertar datos en la tabla category_values
        DB::table('category_values')->insert($categoryValues);
    }
}
