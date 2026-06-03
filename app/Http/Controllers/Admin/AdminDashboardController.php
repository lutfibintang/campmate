<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Models\StudySession;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $latestUsers = User::query()
            ->latest()
            ->limit(6)
            ->get(['id', 'name', 'email', 'role', 'created_at'])
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role ?? 'user',
                'created_at' => optional($user->created_at)->format('d M Y'),
            ]);

        $latestSessions = StudySession::query()
            ->with(['subject:id,name', 'creator:id,name,email,role'])
            ->latest()
            ->limit(8)
            ->get()
            ->map(fn (StudySession $session) => [
                'id' => $session->id,
                'title' => $session->title,
                'subject' => $session->subject?->name ?? 'General',
                'creator' => $session->creator?->name ?? 'Unknown',
                'creator_email' => $session->creator?->email,
                'status' => $session->status,
                'status_label' => $session->status_label,
                'date' => optional($session->session_date)->format('d M Y'),
                'time' => substr((string) $session->start_time, 0, 5).' - '.substr((string) $session->end_time, 0, 5),
                'participants' => (int) $session->joined_count,
                'max_participants' => (int) $session->max_participants,
            ]);

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalAdmins' => User::where('role', 'admin')->count(),
                'totalStudySessions' => StudySession::count(),
                'activeStudySessions' => StudySession::whereIn('status', ['open', 'full'])->count(),
                'totalCourses' => Course::count(),
                'totalSchedules' => CourseSchedule::count(),
            ],
            'latestUsers' => $latestUsers,
            'latestSessions' => $latestSessions,
        ]);
    }
}
