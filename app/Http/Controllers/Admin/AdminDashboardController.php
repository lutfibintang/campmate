<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSchedule;
use App\Models\StudySession;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $latestUsers = User::query()
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'role', 'created_at'])
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => optional($user->created_at)->format('d M Y'),
            ]);

        $latestSessions = StudySession::query()
            ->with(['subject:id,name', 'creator:id,name,email,role'])
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (StudySession $session) => [
                'id' => $session->id,
                'title' => $session->title,
                'subject' => $session->subject?->name ?? '-',
                'creator' => $session->creator?->name ?? 'Unknown',
                'status' => $session->status,
                'date' => optional($session->session_date)->format('d M Y'),
                'time' => substr((string) $session->start_time, 0, 5).' - '.substr((string) $session->end_time, 0, 5),
            ]);

        return Inertia::render('Admin/Dashboard', [
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
