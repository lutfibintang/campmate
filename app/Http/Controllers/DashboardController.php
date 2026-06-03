<?php

namespace App\Http\Controllers;

use App\Models\CourseSchedule;
use App\Models\StudySession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $today = strtolower(now()->format('l'));

        $todayClasses = CourseSchedule::with('course')
            ->whereHas('course', fn ($query) => $query->where('user_id', $user->id))
            ->where('day_of_week', $today)
            ->orderBy('start_time')
            ->get()
            ->map(fn (CourseSchedule $schedule) => [
                'id' => $schedule->id,
                'room' => $schedule->room,
                'start_time' => substr((string) $schedule->start_time, 0, 5),
                'end_time' => substr((string) $schedule->end_time, 0, 5),
                'course' => [
                    'name' => $schedule->course?->name,
                    'code' => $schedule->course?->code,
                ],
            ])
            ->values();

        $baseStudySessionQuery = StudySession::query()
            ->with(['subject', 'creator', 'joinedParticipants'])
            ->active()
            ->orderBy('session_date')
            ->orderBy('start_time');

        $pinnedSession = (clone $baseStudySessionQuery)
            ->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orWhereHas('joinedParticipants', fn ($participant) => $participant->where('user_id', $user->id));
            })
            ->first();

        // Fallback: kalau user belum pernah join/bikin sesi, pin sesi aktif terdekat.
        $pinnedSession ??= (clone $baseStudySessionQuery)->first();

        $upcomingSessions = (clone $baseStudySessionQuery)
            ->limit(6)
            ->get()
            ->map(fn (StudySession $session) => $this->studySessionPayload($session))
            ->values();

        $joinedCount = DB::table('session_participants')
            ->where('user_id', $user->id)
            ->where('status', 'joined')
            ->count();

        $ownedSessions = StudySession::query()
            ->where('user_id', $user->id)
            ->count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'name' => $user->name,
                'role' => $user->role,
                'upcomingSessions' => $upcomingSessions->count(),
                'todayClasses' => $todayClasses->count(),
                'studyHours' => $joinedCount * 2,
                'ownedSessions' => $ownedSessions,
                'joinedSessions' => $joinedCount,
            ],
            'pinnedSession' => $pinnedSession ? $this->studySessionPayload($pinnedSession) : null,
            'todayClasses' => $todayClasses,
            'upcomingSessions' => $upcomingSessions,
            'badges' => $this->badgesFor($joinedCount, $ownedSessions),
        ]);
    }

    private function studySessionPayload(StudySession $session): array
    {
        return [
            'id' => $session->id,
            'title' => $session->title,
            'description' => $session->description,
            'session_type' => $session->session_type,
            'session_date' => optional($session->session_date)->format('Y-m-d'),
            'date_label' => optional($session->session_date)->translatedFormat('d M Y'),
            'start_time' => substr((string) $session->start_time, 0, 5),
            'end_time' => substr((string) $session->end_time, 0, 5),
            'location' => $session->location,
            'meeting_platform' => $session->meeting_platform,
            'status' => $session->status,
            'status_label' => $session->status_label,
            'joined_count' => $session->joined_count,
            'max_participants' => $session->max_participants,
            'subject' => [
                'name' => $session->subject?->name ?? 'General Study',
            ],
            'creator' => [
                'name' => $session->creator?->name,
            ],
        ];
    }

    private function badgesFor(int $joinedCount, int $ownedSessions): array
    {
        $badges = [
            [
                'name' => 'Fresh Learner',
                'icon' => '🌱',
                'description' => 'Akun aktif dan siap ikut sesi belajar.',
            ],
        ];

        if ($joinedCount >= 3) {
            $badges[] = [
                'name' => 'Active Learner',
                'icon' => '⚡',
                'description' => 'Sudah join beberapa sesi belajar.',
            ];
        }

        if ($ownedSessions >= 1) {
            $badges[] = [
                'name' => 'Session Host',
                'icon' => '🎯',
                'description' => 'Pernah membuat sesi belajar.',
            ];
        }

        return $badges;
    }
}
