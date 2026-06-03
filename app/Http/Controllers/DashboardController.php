<?php

namespace App\Http\Controllers;

use App\Models\CourseSchedule;
use App\Models\StudySession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        StudySessionController::closeExpiredSessions();
        $user = $request->user();
        $today = strtolower(now()->format('l'));

        $todayClasses = CourseSchedule::with('course')
            ->whereHas('course', fn ($q) => $q->where('user_id', $user->id))
            ->where('day_of_week', $today)
            ->orderBy('start_time')
            ->get();

        $upcomingSessions = StudySession::with(['subject', 'joinedParticipants'])
            ->active()
            ->orderBy('session_date')
            ->orderBy('start_time')
            ->take(5)
            ->get();

        $joinedCount = $user->joinedSessions()->wherePivot('status', 'joined')->count();
        $badges = LeaderboardController::badgesFor($joinedCount, $user->studySessions()->count());

        return Inertia::render('Dashboard', [
            'stats' => [
                'name' => $user->name,
                'upcomingSessions' => $upcomingSessions->count(),
                'todayClasses' => $todayClasses->count(),
                'studyHours' => $joinedCount * 2,
            ],
            'todayClasses' => $todayClasses,
            'upcomingSessions' => $upcomingSessions,
            'badges' => $badges,
        ]);
    }
}
