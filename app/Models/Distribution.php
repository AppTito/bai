<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use HasFactory;
    protected $fillable = [
        'donor_id',
        'date',
        'porcentaje',
        'fruver',
        'lacteos',
        'panaderia',
        'granos',
        'embutidos',
        'huevos',
        'cereales',
        'reposteria',
        'procesados',
        'salsas',
        'proteina',
        'jugos',
        'carbohidratos',
        'floristeria',
        'enlatados',
        'proteina_kfc',
        'procesado_kfc',
        'total',
        'kg_pendientes'
    ];
}
