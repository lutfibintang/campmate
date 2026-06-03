<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Schedule/Index', [
            'schedules' => CourseSchedule::with('course')
                ->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))
                ->orderByRaw("FIELD(day_of_week, 'monday','tuesday','wednesday','thursday','friday','saturday','sunday')")
                ->orderBy('start_time')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'code' => ['nullable', 'string', 'max:40'],
            'lecturer' => ['nullable', 'string', 'max:120'],
            'color' => ['nullable', 'string', 'max:20'],
            'day_of_week' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'],
            'start_time' => ['required'],
            'end_time' => ['required', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:80'],
        ]);

        $course = Course::create([
            'user_id' => $request->user()->id,
            'name' => $data['name'],
            'code' => $data['code'] ?? null,
            'lecturer' => $data['lecturer'] ?? null,
            'color' => $data['color'] ?? '#c9d68b',
        ]);

        CourseSchedule::create([
            'course_id' => $course->id,
            'day_of_week' => $data['day_of_week'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'room' => $data['room'] ?? null,
        ]);

        return back()->with('success', 'Jadwal mata kuliah ditambahkan.');
    }

    public function destroy(Request $request, CourseSchedule $schedule)
    {
        abort_unless($schedule->course->user_id === $request->user()->id, 403);
        $course = $schedule->course;
        $schedule->delete();
        if ($course->schedules()->count() === 0) $course->delete();
        return back()->with('success', 'Jadwal dihapus.');
    }
}
