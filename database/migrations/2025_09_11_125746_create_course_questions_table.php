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
        Schema::create('course_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('civility')->nullable(); // Madame/Monsieur
            $table->string('first_name');
            $table->string('last_name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('message');
            $table->boolean('accepts_privacy_policy')->default(false);
            $table->boolean('is_answered')->default(false);
            $table->text('admin_response')->nullable();
            $table->timestamp('answered_at')->nullable();
            $table->timestamps();

            $table->index(['course_id', 'created_at']);
            $table->index('is_answered');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_questions');
    }
};
