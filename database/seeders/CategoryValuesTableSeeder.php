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
            ['category_id' => 1, 'value' => 10, 'status' => true],
            ['category_id' => 2, 'value' => 15, 'status' => false],
            ['category_id' => 3, 'value' => 20, 'status' => false],
            // ... otros datos
        ];

        // Insertar datos en la tabla category_values
        DB::table('category_values')->insert($categoryValues);
    }
}
