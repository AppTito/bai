<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'total_weight',
        'recovered',
        'percentage',
        'date',
    ];

    // Definir la relación con Donors
    public function donor()
    {
        return $this->belongsTo(Donors::class, 'donor_id');
    }
}

