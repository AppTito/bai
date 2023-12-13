<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role1 = Role::create(['name' => 'visitor']);
        $role1->givePermissionTo(['user-list','role-list']);

        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo(['user-list','user-create','user-edit','user-delete',
                                'role-list','role-create','role-edit','role-delete',
                                'permission-list','permission-create','permission-edit']);

        $role3 = Role::create(['name' => 'super-admin']);
//        $role3->givePermissionTo(Permission::all());
    }
}
