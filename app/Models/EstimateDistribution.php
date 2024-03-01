<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimateDistribution extends Model
{
    use HasFactory;

    protected $table = 'estimate_distributions';
    protected $fillable = [
        'date',
        'donor_id',
        'organization_id',
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
        'status'
    ];
}
