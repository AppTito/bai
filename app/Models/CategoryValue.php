<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class CategoryValue extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'value', 'status'];
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public static function listCategoryValues(): object
    {
        return DB::table('category_values as cv')
            ->rightJoin('categories as c', 'c.id', '=', 'cv.id')
            ->select('c.id','c.category','c.code','cv.category_id', 'cv.value')
            ->where('c.status', 1)
            ->paginate(6);
    }

    public static function listCategoryValuesByCategory($category_id): object
    {
        return DB::table('category_values as cv')
            ->rightJoin('categories as c', 'c.id', '=', 'cv.id')
            ->select('c.id','c.category','c.code','cv.category_id', 'cv.value')
            ->where('c.status', 1)
            ->where('cv.category_id', $category_id)
            ->get();
    }
}
