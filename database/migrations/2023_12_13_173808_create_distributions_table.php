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
        /*
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('donor_id')->constrained();
            $table->foreignId('organization_id')->constrained();
            $table->decimal('percentage', 8, 2)->default(0);
            $table->decimal('kilos', 8, 2)->default(0);
            $table->decimal('total', 8, 2)->default(0);
            $table->decimal('pending_kilos', 8, 2);
            $table->boolean('status')->default(true);
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
        });
        */
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('donor_id')->constrained();            
            $table->double('porcentaje');
            $table->double('fruver');
            $table->double('lacteos');
            $table->double('panaderia');
            $table->double('granos');
            $table->double('embutidos');
            $table->double('huevos');
            $table->double('reposteria');
            $table->double('procesados');
            $table->double('salsas');
            $table->double('proteina');
            $table->double('jugos');
            $table->double('carbohidratos');
            $table->double('enlatados');
            $table->double('proteina_kfc');
            $table->double('procesado_kfc');
            $table->double('total');
            $table->double('kg_pendientes');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distributions');
    }
};
