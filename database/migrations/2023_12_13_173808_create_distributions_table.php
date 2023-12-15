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
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained();
            $table->integer('percentage')->default(0);
            $table->decimal('kilos_delivery')->default(0);
            $table->decimal('total', 8, 2);
            $table->decimal('pending_kilos', 8, 2);
            $table->date('date_estimated');
            $table->date('date_ini');
            $table->boolean('status')->default(true);
            $table->decimal('kilos_total', 8, 2)->default(0);
            $table->foreignId('user_id')->constrained();
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
