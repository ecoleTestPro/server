<?php

use App\Models\Media;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->foreignIdFor(Media::class, 'logo_id')->nullable()->after('media_id')->constrained('media')->nullOnDelete();
            $table->foreignIdFor(Media::class, 'organization_logo_id')->nullable()->after('logo_id')->constrained('media')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropForeign(['logo_id']);
            $table->dropColumn('logo_id');
            $table->dropForeign(['organization_logo_id']);
            $table->dropColumn('organization_logo_id');
        });
    }
};
