<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estimate extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'organization_id',
        'donor_id',
        'percentage',
        'kilos_send',
        'kilos_total',
        'kilos_pending',
        'status',
    ];
}
