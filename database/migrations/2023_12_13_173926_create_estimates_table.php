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
        Schema::create('estimates', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('organization_id')->constrained();
            $table->foreignId('donor_id')->constrained();
            $table->decimal('percentage', 8, 2)->default(0);
            $table->decimal('kilos_send', 8, 2)->default(0);
            $table->decimal('kilos_total', 8, 2)->default(0);
            $table->decimal('kilos_pending', 8, 2)->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimates');
    }
};
