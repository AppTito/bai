<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class CategoryValue extends Model
{
    use HasFactory;
    protected $fillable = ['category_id','value','status'];

    public function category(): BelongsTo
    {
        //BelongsTo es cuando desde la FK buscamos los datos de la PK
        return $this->belongsTo(Category::class);
    }
}
