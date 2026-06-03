<?php

namespace App\Http\Controllers;

use App\Models\CourseSchedule;
use App\Models\StudySession;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $weekStart = Carbon::now()->startOfWeek(Carbon::MONDAY);
        $weekEnd = (clone $weekStart)->endOfWeek(Carbon::SUNDAY);

        $weekDays = collect(range(0, 6))->map(function (int $offset) use ($weekStart) {
            $date = (clone $weekStart)->addDays($offset);

            return [
                'key' => strtolower($date->format('l')),
                'label' => $this->dayLabel(strtolower($date->format('l'))),
                'date' => $date->toDateString(),
                'date_label' => $date->format('d-m'),
            ];
        })->values();

        $classes = CourseSchedule::with('course')
            ->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))
            ->get()
            ->map(fn (CourseSchedule $schedule) => [
                'id' => 'class-'.$schedule->id,
                'type' => 'class',
                'title' => $schedule->course?->name,
                'subtitle' => $schedule->course?->code,
                'day' => $schedule->day_of_week,
                'start_time' => substr((string) $schedule->start_time, 0, 5),
                'end_time' => substr((string) $schedule->end_time, 0, 5),
                'room' => $schedule->room,
            ]);

        $sessions = StudySession::with('subject')
            ->active()
            ->whereBetween('session_date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->get()
            ->map(fn (StudySession $session) => [
                'id' => 'session-'.$session->id,
                'type' => 'session',
                'title' => $session->title,
                'subtitle' => $session->subject?->name,
                'day' => strtolower($session->session_date->format('l')),
                'start_time' => substr((string) $session->start_time, 0, 5),
                'end_time' => substr((string) $session->end_time, 0, 5),
                'room' => $session->location,
            ]);

        return Inertia::render('Calendar/Index', [
            'weekDays' => $weekDays,
            'events' => $classes->merge($sessions)->values(),
        ]);
    }

    private function dayLabel(string $day): string
    {
        return [
            'monday' => 'Senin',
            'tuesday' => 'Selasa',
            'wednesday' => 'Rabu',
            'thursday' => 'Kamis',
            'friday' => 'Jumat',
            'saturday' => 'Sabtu',
            'sunday' => 'Minggu',
        ][$day] ?? ucfirst($day);
    }
}
