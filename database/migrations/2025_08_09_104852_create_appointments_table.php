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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade'); // Client qui prend le RDV (null pour invités)
            $table->foreignId('admin_user_id')->nullable()->constrained('users')->onDelete('set null'); // Admin assigné
            $table->string('title');
            $table->text('description')->nullable();
            $table->datetime('appointment_date'); // Date et heure du RDV
            $table->integer('duration')->default(30); // Durée en minutes
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'])->default('pending');
            $table->enum('type', ['consultation', 'information', 'support', 'enrollment', 'other'])->default('consultation');
            $table->string('client_email'); // Obligatoire pour les invités, optionnel pour les connectés
            $table->string('client_phone')->nullable();
            $table->json('metadata')->nullable(); // Données supplémentaires (sujet, références, etc.)
            $table->datetime('reminded_at')->nullable(); // Dernière notification envoyée
            $table->text('admin_notes')->nullable(); // Notes de l'admin
            $table->text('cancellation_reason')->nullable(); // Raison d'annulation
            $table->timestamps();
            
            $table->index(['appointment_date', 'status']);
            $table->index(['user_id', 'status']);
            $table->index(['admin_user_id', 'appointment_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
