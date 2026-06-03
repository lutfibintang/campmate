<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePasswordController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudySessionController;
use App\Models\StudySession;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', function () {
    $activeSessions = Schema::hasTable('study_sessions')
        ? DB::table('study_sessions')->whereIn('status', ['open', 'full'])->count()
        : 0;

    $classes = Schema::hasTable('course_schedules')
        ? DB::table('course_schedules')->count()
        : 0;

    $liveSession = null;

    if (Schema::hasTable('study_sessions')) {
        $session = StudySession::query()
            ->with(['subject', 'joinedParticipants'])
            ->active()
            ->orderByRaw('CASE WHEN session_date = ? THEN 0 ELSE 1 END', [now()->toDateString()])
            ->orderBy('session_date')
            ->orderBy('start_time')
            ->first();

        if ($session) {
            $isLoggedIn = Auth::check();
            $joinedCount = (int) $session->joined_count;
            $maxParticipants = max(1, (int) $session->max_participants);

            $liveSession = [
                'id' => $session->id,
                'title' => $session->title,
                'subject' => $session->subject?->name ?? 'Study Session',
                'type' => ucfirst($session->session_type ?? 'Study'),
                'date' => $session->session_date?->translatedFormat('d F Y'),
                'raw_date' => $session->session_date?->format('Y-m-d'),
                'time' => substr((string) $session->start_time, 0, 5).' - '.substr((string) $session->end_time, 0, 5),
                'location' => $session->location ?: 'Lokasi belum diisi',
                'meeting' => $session->meeting_link ? 'Google Meet available' : null,
                'joined_count' => $joinedCount,
                'max_participants' => $maxParticipants,
                'progress' => min(100, (int) round(($joinedCount / $maxParticipants) * 100)),
                'can_join' => (bool) $session->can_join,
                'join_url' => $isLoggedIn ? route('study-sessions.join', $session) : route('login'),
                'show_url' => $isLoggedIn ? route('study-sessions.show', $session) : route('login'),
                'join_method' => $isLoggedIn ? 'post' : 'get',
            ];
        }
    }

    return Inertia::render('Welcome', [
        'stats' => [
            'sessions' => $activeSessions,
            'classes' => $classes,
            'modules' => 1,
            'activeSessions' => $activeSessions,
            'courses' => $classes,
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
    Route::get('/study-sessions/{studySession}/edit', [StudySessionController::class, 'edit'])->name('study-sessions.edit');
    Route::patch('/study-sessions/{studySession}', [StudySessionController::class, 'update'])->name('study-sessions.update');
    Route::put('/study-sessions/{studySession}', [StudySessionController::class, 'update']);
    Route::delete('/study-sessions/{studySession}', [StudySessionController::class, 'destroy'])->name('study-sessions.destroy');
    Route::get('/study-sessions/{studySession}', [StudySessionController::class, 'show'])->name('study-sessions.show');
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
