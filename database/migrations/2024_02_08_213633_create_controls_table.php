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
        Schema::create('controls', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('donor_id')->constrained(); 
            $table->double('recuperado');
            $table->double('c_animal');
            $table->double('compostaje');
            $table->double('basura');
            $table->double('refrigerio');
            $table->double('c_inmediato');
            $table->double('r_papel');
            $table->double('r_carton');
            $table->double('r_plastico');
            $table->double('total');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('controls');
    }
};
