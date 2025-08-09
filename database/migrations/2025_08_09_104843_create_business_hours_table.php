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
        Schema::create('business_hours', function (Blueprint $table) {
            $table->id();
            $table->enum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
            $table->time('opening_time')->nullable(); // null = fermé ce jour
            $table->time('closing_time')->nullable();
            $table->time('lunch_break_start')->nullable(); // Pause déjeuner optionnelle
            $table->time('lunch_break_end')->nullable();
            $table->boolean('is_active')->default(true); // Jour actif ou non
            $table->integer('slot_duration')->default(30); // Durée des créneaux en minutes
            $table->json('excluded_times')->nullable(); // Créneaux spécifiques exclus
            $table->timestamps();
            
            $table->unique('day_of_week');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_hours');
    }
};
