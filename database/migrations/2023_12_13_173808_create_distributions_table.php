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
            $table->date('date');
            $table->foreignId('organization_id')->constrained();
            $table->decimal('percentage', 8, 2)->default(0);
            $table->decimal('kilos', 8, 2)->default(0);
            $table->decimal('total', 8, 2)->default(0);
            $table->decimal('pending_kilos', 8, 2);
            $table->boolean('status')->default(true);
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
