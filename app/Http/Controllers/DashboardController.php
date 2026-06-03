<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $today = strtolower(now()->format('l'));

        $todayClasses = [];
        if (Schema::hasTable('course_schedules') && Schema::hasTable('courses')) {
            $todayClasses = DB::table('course_schedules')
                ->join('courses', 'courses.id', '=', 'course_schedules.course_id')
                ->where('courses.user_id', $user->id)
                ->where('course_schedules.day_of_week', $today)
                ->orderBy('course_schedules.start_time')
                ->select([
                    'course_schedules.id',
                    'course_schedules.room',
                    'course_schedules.start_time',
                    'course_schedules.end_time',
                    'courses.name as course_name',
                    'courses.code as course_code',
                ])
                ->get()
                ->map(fn ($item) => [
                    'id' => $item->id,
                    'room' => $item->room,
                    'start_time' => substr((string) $item->start_time, 0, 5),
                    'end_time' => substr((string) $item->end_time, 0, 5),
                    'course' => [
                        'name' => $item->course_name,
                        'code' => $item->course_code,
                    ],
                ])
                ->values();
        }

        $upcomingSessions = [];
        if (Schema::hasTable('study_sessions')) {
            $query = DB::table('study_sessions')
                ->whereIn('study_sessions.status', ['open', 'full'])
                ->orderBy('study_sessions.session_date')
                ->orderBy('study_sessions.start_time')
                ->limit(5);

            if (Schema::hasTable('subjects')) {
                $query->leftJoin('subjects', 'subjects.id', '=', 'study_sessions.subject_id')
                    ->select([
                        'study_sessions.id',
                        'study_sessions.title',
                        'study_sessions.session_date',
                        'study_sessions.start_time',
                        'study_sessions.status',
                        'subjects.name as subject_name',
                    ]);
            } else {
                $query->select([
                    'study_sessions.id',
                    'study_sessions.title',
                    'study_sessions.session_date',
                    'study_sessions.start_time',
                    'study_sessions.status',
                ]);
            }

            $upcomingSessions = $query->get()->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'session_date' => $item->session_date,
                'start_time' => substr((string) $item->start_time, 0, 5),
                'status' => $item->status,
                'status_label' => ucfirst($item->status),
                'subject' => [
                    'name' => $item->subject_name ?? 'General Study',
                ],
            ])->values();
        }

        $joinedCount = 0;
        if (Schema::hasTable('session_participants')) {
            $joinedCount = DB::table('session_participants')
                ->where('user_id', $user->id)
                ->where('status', 'joined')
                ->count();
        }

        $ownedSessions = 0;
        if (Schema::hasTable('study_sessions')) {
            $ownedSessions = DB::table('study_sessions')->where('user_id', $user->id)->count();
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'name' => $user->name,
                'role' => $user->role,
                'upcomingSessions' => count($upcomingSessions),
                'todayClasses' => count($todayClasses),
                'studyHours' => $joinedCount * 2,
            ],
            'todayClasses' => $todayClasses,
            'upcomingSessions' => $upcomingSessions,
            'badges' => $this->badgesFor($joinedCount, $ownedSessions),
        ]);
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
                'icon' => '📚',
                'description' => 'Sudah join beberapa sesi belajar.',
            ];
        }

        if ($ownedSessions >= 1) {
            $badges[] = [
                'name' => 'Session Host',
                'icon' => '🧭',
                'description' => 'Pernah membuat sesi belajar.',
            ];
        }

        return $badges;
    }
}
