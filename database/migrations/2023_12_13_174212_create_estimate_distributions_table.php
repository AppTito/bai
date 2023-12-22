<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * Se utiliza product_distributions en lugar de esta tabla
         */
        Schema::create('estimate_distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estimate_id')->constrained();
            $table->foreignId('distribution_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimate_distributions');
    }
};
