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
        Schema::create('appointment_durations', function (Blueprint $table) {
            $table->id();
            $table->integer('duration'); // durée en minutes
            $table->string('label'); // ex: "30 min", "1h"
            $table->text('description')->nullable(); // ex: "Consultation standard"
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_durations');
    }
};