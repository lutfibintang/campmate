<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('subjects')) {
            Schema::create('subjects', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('code')->nullable();
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('study_sessions')) {
            Schema::create('study_sessions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->foreignId('subject_id')->nullable()->constrained('subjects')->nullOnDelete();
                $table->string('title');
                $table->text('description')->nullable();
                $table->enum('session_type', ['offline', 'online', 'hybrid'])->default('offline');
                $table->string('location')->nullable();
                $table->string('meeting_platform')->nullable();
                $table->string('meeting_link')->nullable();
                $table->date('session_date');
                $table->time('start_time');
                $table->time('end_time');
                $table->unsignedInteger('max_participants')->default(5);
                $table->enum('status', ['open', 'full', 'done', 'cancelled'])->default('open');
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('session_participants')) {
            Schema::create('session_participants', function (Blueprint $table) {
                $table->id();
                $table->foreignId('study_session_id')->constrained('study_sessions')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->string('status')->default('joined');
                $table->timestamps();

                $table->unique(['study_session_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('session_comments')) {
            Schema::create('session_comments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('study_session_id')->constrained('study_sessions')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained()->cascadeOnDelete();
                $table->text('comment');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('session_comments');
        Schema::dropIfExists('session_participants');
        Schema::dropIfExists('study_sessions');
        Schema::dropIfExists('subjects');
    }
};
