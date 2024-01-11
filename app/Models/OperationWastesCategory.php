<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationWastesCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'waste_id',
        'category_id',
        'operation_id',
        'amount',
    ];
}
