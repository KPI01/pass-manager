<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Register;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('changes', function (Blueprint $table) {
            $table->id();
            $table->timestamp('created_at');
            $table->foreignIdFor(User::class, 'made_by')->constrained()->onDelete('set null');
            $table->foreignIdFor(Register::class, 'register_id')->contrained()->onDelete('set null');
            $table->enum('action', ['creation', 'update', 'delete']);
            $table->json('old')->nullable();
            $table->json('new')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('changes');
    }
};
