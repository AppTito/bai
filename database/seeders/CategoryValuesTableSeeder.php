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
            ['category_id' => 1, 'value' => 0, 'status' => true],
            ['category_id' => 2, 'value' => 0, 'status' => true],
            ['category_id' => 3, 'value' => 0, 'status' => true],
            ['category_id' => 4, 'value' => 0, 'status' => true],
            ['category_id' => 5, 'value' => 0, 'status' => true],
            ['category_id' => 6, 'value' => 0, 'status' => true],
            ['category_id' => 7, 'value' => 0, 'status' => true],
            ['category_id' => 8, 'value' => 0, 'status' => true],
            ['category_id' => 9, 'value' => 0, 'status' => true],
            ['category_id' => 10, 'value' => 0, 'status' => true],
            ['category_id' => 11, 'value' => 0, 'status' => true],
            ['category_id' => 12, 'value' => 0, 'status' => true],
            ['category_id' => 13, 'value' => 0, 'status' => true],
            ['category_id' => 14, 'value' => 0, 'status' => true],
            ['category_id' => 15, 'value' => 0, 'status' => true],
            ['category_id' => 16, 'value' => 0, 'status' => true],
            ['category_id' => 17, 'value' => 0, 'status' => true],];

        // Eliminar todos los registros de la tabla sin restablecer los índices
        DB::table('category_values')->delete();

        // Insertar datos en la tabla category_values
        DB::table('category_values')->insert($categoryValues);
    }
}
