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
        Schema::table('appointments', function (Blueprint $table) {
            // Drop foreign keys first
            $table->dropForeign(['user_id']);
            $table->dropForeign(['admin_user_id']);
            
            // Drop indexes if they exist
            $table->dropIndex(['appointment_date', 'status']);
            $table->dropIndex(['user_id', 'status']);
            $table->dropIndex(['admin_user_id', 'appointment_date']);
            
            // Drop columns
            $table->dropColumn(['user_id', 'admin_user_id', 'status', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('admin_user_id')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'])->default('pending');
            $table->enum('type', ['consultation', 'information', 'support', 'enrollment', 'other'])->default('consultation');
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('admin_user_id')->references('id')->on('users')->onDelete('set null');
            
            // Recreate indexes
            $table->index(['appointment_date', 'status']);
            $table->index(['user_id', 'status']);
            $table->index(['admin_user_id', 'appointment_date']);
        });
    }
};