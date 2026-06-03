<?php

namespace App\Http\Controllers;

use App\Models\CourseSchedule;
use App\Models\StudySession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function __invoke(Request $request)
    {
        StudySessionController::closeExpiredSessions();
        $classes = CourseSchedule::with('course')
            ->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))
            ->get()
            ->map(fn ($schedule) => [
                'id' => $schedule->id,
                'type' => 'class',
                'title' => $schedule->course->name,
                'day' => ucfirst($schedule->day_of_week),
                'start_time' => substr($schedule->start_time, 0, 5),
                'end_time' => substr($schedule->end_time, 0, 5),
                'room' => $schedule->room,
            ]);

        $sessions = StudySession::with('subject')
            ->active()
            ->get()
            ->map(fn ($session) => [
                'id' => $session->id,
                'type' => 'session',
                'title' => $session->title,
                'day' => $session->session_date->format('l'),
                'start_time' => substr($session->start_time, 0, 5),
                'end_time' => substr($session->end_time, 0, 5),
                'room' => $session->location,
            ]);

        return Inertia::render('Calendar/Index', ['events' => $classes->merge($sessions)->values()]);
    }
}
