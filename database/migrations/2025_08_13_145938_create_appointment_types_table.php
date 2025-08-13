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
        Schema::create('appointment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // ex: "Consultation", "Information"
            $table->string('slug')->unique(); // ex: "consultation", "information"
            $table->string('icon')->nullable(); // emoji ou nom d'icône
            $table->string('color')->default('#6366f1'); // couleur hex
            $table->text('description')->nullable();
            $table->integer('default_duration')->default(30); // durée par défaut en minutes
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
        Schema::dropIfExists('appointment_types');
    }
};