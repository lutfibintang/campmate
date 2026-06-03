<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudySessionController;
use App\Models\CourseSchedule;
use App\Models\StudySession;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    StudySessionController::closeExpiredSessions();

    return Inertia::render('Welcome', [
        'stats' => [
            'sessions' => StudySession::active()->count(),
            'classes' => CourseSchedule::count(),
        ],
    ]);
})->name('landing');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/study-sessions', [StudySessionController::class, 'index'])->name('study-sessions.index');
    Route::get('/study-sessions/create', [StudySessionController::class, 'create'])->name('study-sessions.create');
    Route::post('/study-sessions', [StudySessionController::class, 'store'])->name('study-sessions.store');
    Route::get('/study-sessions/{studySession}', [StudySessionController::class, 'show'])->name('study-sessions.show');
    Route::post('/study-sessions/{studySession}/join', [StudySessionController::class, 'join'])->name('study-sessions.join');
    Route::delete('/study-sessions/{studySession}/leave', [StudySessionController::class, 'leave'])->name('study-sessions.leave');
    Route::post('/study-sessions/{studySession}/comments', [StudySessionController::class, 'comment'])->name('study-sessions.comments.store');
    Route::get('/study-sessions/{studySession}/conflict', [StudySessionController::class, 'conflict'])->name('study-sessions.conflict');

    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/schedule', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::delete('/schedule/{schedule}', [ScheduleController::class, 'destroy'])->name('schedule.destroy');

    Route::get('/calendar', CalendarController::class)->name('calendar.index');
    Route::get('/leaderboard', LeaderboardController::class)->name('leaderboard.index');

    Route::get('/develop-by', fn () => Inertia::render('Dashboard', [
        'stats' => ['name' => 'Pi', 'upcomingSessions' => 0, 'todayClasses' => 0, 'studyHours' => 0],
        'todayClasses' => [],
        'upcomingSessions' => [],
        'badges' => [['name' => 'Developer', 'icon' => '💻', 'description' => 'Built by Pi.']],
    ]))->name('develop-by');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
