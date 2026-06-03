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
        $userId = $request->user()->id;

        $schedules = CourseSchedule::with('course')
            ->whereHas('course', fn ($query) => $query->where('user_id', $userId))
            ->orderByRaw("FIELD(day_of_week, 'monday','tuesday','wednesday','thursday','friday','saturday','sunday')")
            ->orderBy('start_time')
            ->get();

        return Inertia::render('Schedule/Index', [
            'schedules' => $schedules,
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
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
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

    public function edit(Request $request, CourseSchedule $schedule)
    {
        $this->authorizeScheduleOwner($request, $schedule);

        $schedule->load('course');

        return Inertia::render('Schedule/Edit', [
            'schedule' => $schedule,
        ]);
    }

    public function update(Request $request, CourseSchedule $schedule)
    {
        $this->authorizeScheduleOwner($request, $schedule);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'code' => ['nullable', 'string', 'max:40'],
            'lecturer' => ['nullable', 'string', 'max:120'],
            'color' => ['nullable', 'string', 'max:20'],
            'day_of_week' => ['required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'room' => ['nullable', 'string', 'max:80'],
        ]);

        $schedule->load('course');

        $schedule->course->update([
            'name' => $data['name'],
            'code' => $data['code'] ?? null,
            'lecturer' => $data['lecturer'] ?? null,
            'color' => $data['color'] ?? '#c9d68b',
        ]);

        $schedule->update([
            'day_of_week' => $data['day_of_week'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'room' => $data['room'] ?? null,
        ]);

        return redirect()->route('schedule.index')->with('success', 'Jadwal berhasil diubah.');
    }

    public function destroy(Request $request, CourseSchedule $schedule)
    {
        $this->authorizeScheduleOwner($request, $schedule);

        $schedule->load('course');
        $course = $schedule->course;

        $schedule->delete();

        if ($course && $course->schedules()->count() === 0) {
            $course->delete();
        }

        return back()->with('success', 'Jadwal dihapus.');
    }

    private function authorizeScheduleOwner(Request $request, CourseSchedule $schedule): void
    {
        $schedule->loadMissing('course');

        abort_unless(
            $schedule->course && (int) $schedule->course->user_id === (int) $request->user()->id,
            403
        );
    }
}
