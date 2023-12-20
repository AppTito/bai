<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BankTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banks = [
            ['address' => 'Luciano Andrade y Pasaje s/n #27', 'email' => 'bancodealimentosimbabura@gmail.com', 'phone' => '0963507161', 'ruc' => '1091797646001'],
        ];

        DB::table('categories')->insert($banks);
    }
}
