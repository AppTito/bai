<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donors extends Model
{
    use HasFactory;
    protected $fillable = [ 'name', 'address', 'ruc', 'phone', 'status'];

}
