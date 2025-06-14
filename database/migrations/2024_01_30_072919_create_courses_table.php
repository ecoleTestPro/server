<?php

use App\Models\Media;
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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();

            $table->string('title');
            $table->json('description');

            $table->text('excerpt')->nullable();

            $table->foreignIdFor(Media::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignId('video_id')->nullable()->constrained('media')->nullOnDelete();


            $table->integer('duration')->nullable();
            $table->string('attachment')->nullable();
            $table->enum('periodicity_unit', ['DAY', 'WEEK', 'MONTH', 'YEAR'])->nullable();
            $table->integer('periodicity_value')->nullable();

            $table->float('regular_price');
            $table->float('price');

            $table->foreignId('instructor_id')->constrained('instructors')->cascadeOnDelete();

            $table->integer('view_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_active')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
