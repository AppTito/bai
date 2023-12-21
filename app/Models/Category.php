<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['code', 'category', 'indicator','status'];

    public function products(): HasOne
    {
        return $this->hasOne(Product::class);
    }

    public function categoryValues(): HasOne
    {
        return $this->hasOne(CategoryValue::class);
    }
}
