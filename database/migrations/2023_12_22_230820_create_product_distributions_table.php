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
        Schema::create('product_distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('distribution_id')->constrained();
            $table->foreignId('product_id')->constrained();
            $table->decimal('value', 8, 2)->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_distributions');
    }
};
