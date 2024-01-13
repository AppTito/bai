<?php

namespace Database\Seeders;

use App\Models\Donors;
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
            ['name' => 'Santa María', 'phone' => ' 1800 Santa María (7268267) ', 'address' => 'Av. General Enríquez vía Cotogchoa', 'ruc' => '1343532415',]
        ];

        foreach ($donors as $donor) {
            Donors::create($donor);
        }
    }
}
