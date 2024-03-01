<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['code' => 'FV101', 'category' => 'Fruver', 'indicator' => 'Vegetales'],
            ['code' => 'LC102', 'category' => 'Lácteos', 'indicator' => 'Proteína'],
            ['code' => 'PA103', 'category' => 'Panadería', 'indicator' => 'Carbohidratos'],
            ['code' => 'GR104', 'category' => 'Granos', 'indicator' => 'Proteína'],
            ['code' => 'EB105', 'category' => 'Embutidos', 'indicator' => 'Proteína'],
            ['code' => 'HU106', 'category' => 'Huevos', 'indicator' => 'Proteína'],
            ['code' => 'CR107', 'category' => 'Cereales', 'indicator' => 'Carbohidratos'],
            ['code' => 'RP108', 'category' => 'Repostería', 'indicator' => 'Producto azucarado'],
            ['code' => 'CP109', 'category' => 'Carbohidrato Procesado', 'indicator' => 'Carbohidratos (Humitas, empanadas, quimbolitos)'],
            ['code' => 'SAC110', 'category' => 'Salsa , Aderezo y Condimentos', 'indicator' => 'Salsas, Condimentos y especies de sal'],
            ['code' => 'PP111', 'category' => 'Proteína Procesada', 'indicator' => 'Pollo Horneado'],
            ['code' => 'JB112', 'category' => 'Jugos y Bebidas', 'indicator' => 'Bebidas diferentes al Agua'],
            ['code' => 'CH113', 'category' => 'Carbohidrato', 'indicator' => 'Papas, Yuca, Camote, Fideo'],
            ['code' => 'FL114', 'category' => 'Floristería', 'indicator' => 'Flores'],
            ['code' => 'EC115', 'category' => 'Enlatados y Conservas', 'indicator' => 'Conservas'],
            ['code' => 'PRKFC001', 'category' => 'Proteína KFC', 'indicator' => 'Pollo'],
            ['code' => 'APKFC001', 'category' => 'Alimento Procesado KFC', 'indicator' => 'Arroz, Menestra, Maduros, Papas'],

        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
