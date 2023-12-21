<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Organization;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        $organizations = [
            ['code' => 'ASV', 'address' => 'Barrio el Rosario y Av. Sucre y Heriberto Vallejos', 'ruc' => '0400706404', 'name'=>'Asoelvi'],
            ['code' => 'CCLSP', 'address' => 'Pugacho', 'ruc' => '1002412896', 'name'=>'Comité Ciudadano local de Salud Pugacho'],
            ['code' => 'CAT', 'address' => 'Catzoloma', 'ruc' => '1002373239', 'name'=>'Comunidad Catzoloma'],
            ['code' => 'CHM', 'address' => 'Babahoyo y Esmeraldas', 'ruc' => '10012041919', 'name'=>'Comunidad Hermanas Mercedarias'],
            ['code' => 'CDC', 'address' => 'Maldonado 14-119 y Guillermina García', 'ruc' => '1002011490', 'name'=>'Cristo de la Calle'],
            ['code' => 'FCQ', 'address' => 'Ibarra Sucre 3-37 y Borrero', 'ruc' => '1004644587', 'name'=>'Fundación Qaraywa'],
            ['code' => 'FR', 'address' => 'Ernesto Monje Sandoval 3-14', 'ruc' => '1791372530001', 'name'=>'Fundación Remar'],
            ['code' => 'FS', 'address' => 'Ibarra, Oviedo y Bolivar Edificio Mutualista Imbabura', 'ruc' => '1091796673001', 'name'=>'Fundación Scarleth'],
            ['code' => 'GPA', 'address' => 'Pablo Arenas', 'ruc' => '1060021180001', 'name'=>'GAD Pablo Arenas'],
            ['code' => 'GPS', 'address' => 'Salinas', 'ruc' => '1003982616', 'name'=>'GAD Parroquial de Salinas'],
            ['code' => 'GSA', 'address' => 'Eloy Alfaro 1-18 y 27 de noviembre', 'ruc' => '1002609889', 'name'=>'GAD San Antonio'],
            ['code' => 'HT', 'address' => 'Ejido de Caranqui', 'ruc' => '1713300190', 'name'=>'Hermanos Terciarios'],
            ['code' => 'HSF', 'address' => 'Tanguarín', 'ruc' => '0931783021', 'name'=>'Hijas de la Sagrada Familia'],
            ['code' => 'HCR', 'address' => '24 de mayo y Sucre', 'ruc' => '1091706888001', 'name'=>'Hogar Carmen Ruiz'],
            ['code' => 'JCC', 'address' => 'Riborio Madera 375 y Rocafuerte', 'ruc' => '1713400354', 'name'=>'Jóvenes contra el Cáncer'],
            ['code' => 'FME', 'address' => 'Av. Camilo Ponce y Espinoza', 'ruc' => '1790924637001', 'name'=>'Manos extendidas'],
            ['code' => 'MSE', 'address' => 'Sector Chorlavisito', 'ruc' => '', 'name'=>'Misioneras Siervas del Divino Espíritu '],
            ['code' => 'PPF', 'address' => 'Luis Toro Moreno y Juan Francisco Cevallos', 'ruc' => '1003722103', 'name'=>'Parapowerlifting'],
            ['code' => 'PAF', 'address' => 'Esmeralda y Portoviejo-Azaya', 'ruc' => '1708377080', 'name'=>'Programa de Asistencia Familiar '],
            ['code' => 'RSG', 'address' => 'Calle Abdón Calderón y Chaltura ', 'ruc' => '1003062245', 'name'=>'Resurge'],
            ['code' => 'SBP', 'address' => 'Calle Ibarra y  Guayaquil', 'ruc' => '1001659208', 'name'=>'San Benito de Palermo'],
            ['code' => 'SLV', 'address' => 'Comunidad de San Luis ', 'ruc' => '1003361647', 'name'=>'San Luis y la Victoria'],
            ['code' => 'SLM', 'address' => 'Prolongación de la calle Sucre y Carlos Proaño', 'ruc' => '1702855576', 'name'=>'Santa Luisa de Marilllac'],
            ['code' => 'SM', 'address' => 'Avenida Retorno 32-31', 'ruc' => '1711598001', 'name'=>'Seminario Mayor'],
            ['code' => 'SI', 'address' => 'Ibarra', 'ruc' => '1704177276', 'name'=>'Sinaí'],
            ['code' => 'SVN', 'address' => '', 'ruc' => '1003417597', 'name'=>'SVANA'],
            ['code' => 'UOCC', 'address' => 'Los Ceibos - Río Chimbo 3-82', 'ruc' => '10911704702001', 'name'=>'Unión de Organizaciones Campesina'],
            
        ];

        DB::table('organizations')->insert($organizations);
    }
}