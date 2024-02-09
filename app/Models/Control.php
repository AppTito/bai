<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Control extends Model
{
    use HasFactory;

    protected $fillable = [
        'donors_id',
        'date',
        'recuperado',
        'c_animal',
        'compostaje',
        'basura',
        'refrigerio',
        'c_inmediato',
        'r_papel',
        'r_carton',
        'r_plastico',
        'total',
    ];
}
