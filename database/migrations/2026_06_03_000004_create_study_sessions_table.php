<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->string('title', 120);
            $table->text('description')->nullable();
            $table->enum('session_type', ['offline', 'online', 'hybrid'])->default('offline');
            $table->string('location', 160)->nullable();
            $table->string('meeting_platform', 50)->nullable();
            $table->string('meeting_link')->nullable();
            $table->date('session_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedInteger('max_participants')->default(2);
            $table->enum('status', ['open', 'full', 'done', 'cancelled'])->default('open');
            $table->timestamps();

            $table->index(['status', 'session_date', 'end_time']);
            $table->index(['subject_id', 'session_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_sessions');
    }
};
