<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DonorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $donors = [
            ['name' => 'La Favorita', 'phone' => ' 1800 Favorita (328 674) ', 'address' => 'Av. General Enríquez vía Cotogchoa', 'ruc' => '1343532415'],
            ['name' => 'Supermaxi', 'phone' => ' 1800 Supermaxi (787376294) ', 'address' => 'Av. General Enríquez vía Cotogchoa', 'ruc' => '1343532415'],
            ['name' => 'Tía', 'phone' => ' 1800 Tía (842) ', 'address' => 'Av. General Enríquez vía Cotogchoa', 'ruc' => '1343532415'],
            ['name' => 'Santa María', 'phone' => ' 1800 Santa María (7268267) ', 'address' => 'Av. General Enríquez vía Cotogchoa', 'ruc' => '1343532415',]
        ];

        DB::table('donors')->insert($donors);
    }
}
