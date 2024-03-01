<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            CategoriesTableSeeder::class,
            BankTableSeeder::class,
            OrganizationSeeder::class,
            CategoryValuesTableSeeder::class,
            WastesSeeder::class,
            DonorsSeeder::class,
            CategoryValuesTableSeeder::class,
            ControlSeeder::class,
            DistributionSeeder::class,
            OperationSeeder::class
        ]);
    }
}
