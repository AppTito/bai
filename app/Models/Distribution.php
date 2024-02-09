<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use HasFactory;
    protected $fillable = [
        'donors_id',
        'date',
        'porcentaje',
        'fruver',
        'lacteos',
        'panaderia',
        'granos',
        'embutidos',
        'huevos',
        'reposteria',
        'procesados',
        'salsas',
        'proteina',
        'jugos',
        'carbohidratos',
        'enlatados',
        'proteina_kfc',
        'procesado_kfc',
        'total',
        'kg_pendientes'
    ];
}
