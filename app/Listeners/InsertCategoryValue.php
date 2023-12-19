<?php

namespace App\Listeners;

use App\Events\CategoryInserted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Models\CategoryValue;

class InsertCategoryValue implements ShouldQueue
{
    public function __construct()
    {
        //
    }

    public function handle(CategoryInserted $event)
    {
        CategoryValue::create([
            'category_id' => $event->categoryId,
            'value' => 0,
        ]);
    }
}