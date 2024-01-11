<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('operation_wastes_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('waste_id')->constrained();
            $table->foreignId('category_id')->constrained();
            $table->foreignId('operation_id')->constrained();
            $table->double('amount');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operation_wastes_categories');
    }
};
