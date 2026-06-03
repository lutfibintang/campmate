<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePasswordController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudySessionController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    $sessions = Schema::hasTable('study_sessions')
        ? DB::table('study_sessions')->whereIn('status', ['open', 'full'])->count()
        : 0;

    $liveSession = null;

    if (Schema::hasTable('study_sessions')) {
        $session = \App\Models\StudySession::query()
            ->with(['subject', 'joinedParticipants'])
            ->whereIn('status', ['open', 'full'])
            ->orderBy('session_date')
            ->orderBy('start_time')
            ->first();

        if ($session) {
            $joined = $session->joinedParticipants()->count();
            $max = max((int) $session->max_participants, 1);

            $liveSession = [
                'id' => $session->id,
                'title' => $session->title,
                'subject' => $session->subject?->name ?? '-',
                'type' => ucfirst($session->session_type),
                'location' => $session->location ?: '-',
                'meeting' => $session->meeting_platform ?: null,
                'date' => optional($session->session_date)->format('d F Y'),
                'time' => substr((string) $session->start_time, 0, 5).' - '.substr((string) $session->end_time, 0, 5),
                'joined_count' => $joined,
                'max_participants' => $max,
                'progress' => min(100, round(($joined / $max) * 100)),
                'show_url' => route('study-sessions.show', $session, false),
                'join_url' => Auth::check() ? route('study-sessions.join', $session, false) : route('login', absolute: false),
                'join_method' => Auth::check() ? 'post' : 'get',
            ];
        }
    }

    return Inertia::render('Welcome', [
        'stats' => [
            'sessions' => $sessions,
            'activeSessions' => $sessions,
        ],
        'liveSession' => $liveSession,
        'authState' => [
            'loggedIn' => Auth::check(),
        ],
    ]);
})->name('landing');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/study-sessions', [StudySessionController::class, 'index'])->name('study-sessions.index');
    Route::get('/study-sessions/create', [StudySessionController::class, 'create'])->name('study-sessions.create');
    Route::post('/study-sessions', [StudySessionController::class, 'store'])->name('study-sessions.store');
    Route::get('/study-sessions/{studySession}', [StudySessionController::class, 'show'])->name('study-sessions.show');
    Route::get('/study-sessions/{studySession}/edit', [StudySessionController::class, 'edit'])->name('study-sessions.edit');
    Route::patch('/study-sessions/{studySession}', [StudySessionController::class, 'update'])->name('study-sessions.update');
    Route::put('/study-sessions/{studySession}', [StudySessionController::class, 'update']);
    Route::delete('/study-sessions/{studySession}', [StudySessionController::class, 'destroy'])->name('study-sessions.destroy');
    Route::post('/study-sessions/{studySession}/join', [StudySessionController::class, 'join'])->name('study-sessions.join');
    Route::delete('/study-sessions/{studySession}/leave', [StudySessionController::class, 'leave'])->name('study-sessions.leave');
    Route::post('/study-sessions/{studySession}/comments', [StudySessionController::class, 'comment'])->name('study-sessions.comments.store');
    Route::get('/study-sessions/{studySession}/conflict', [StudySessionController::class, 'conflict'])->name('study-sessions.conflict');

    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::post('/schedule', [ScheduleController::class, 'store'])->name('schedule.store');
    Route::get('/schedule/{schedule}/edit', [ScheduleController::class, 'edit'])->name('schedule.edit');
    Route::patch('/schedule/{schedule}', [ScheduleController::class, 'update'])->name('schedule.update');
    Route::put('/schedule/{schedule}', [ScheduleController::class, 'update']);
    Route::delete('/schedule/{schedule}', [ScheduleController::class, 'destroy'])->name('schedule.destroy');

    Route::get('/calendar', CalendarController::class)->name('calendar.index');
    Route::get('/leaderboard', LeaderboardController::class)->name('leaderboard.index');
    Route::get('/develop-by', fn () => Inertia::render('DevelopBy'))->name('develop-by');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfilePasswordController::class, 'update'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/auth.php';
