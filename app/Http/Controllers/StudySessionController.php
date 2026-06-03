<?php

namespace App\Http\Controllers;

use App\Models\CourseSchedule;
use App\Models\SessionComment;
use App\Models\SessionParticipant;
use App\Models\StudySession;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StudySessionController extends Controller
{
    private static function closeExpiredSessions(): void
    {
        $now = now();

        StudySession::query()
            ->whereIn('status', ['open', 'full'])
            ->where(function ($query) use ($now) {
                $query->where('session_date', '<', $now->toDateString())
                    ->orWhere(function ($q) use ($now) {
                        $q->whereDate('session_date', $now->toDateString())
                            ->whereTime('end_time', '<', $now->format('H:i:s'));
                    });
            })
            ->update(['status' => 'done']);
    }

    private function ensureCanManage(Request $request, StudySession $studySession): void
    {
        $user = $request->user();

        if (! $user?->isAdmin() && (int) $studySession->user_id !== (int) $user?->id) {
            abort(403, 'Lu cuma bisa edit/hapus session milik lu sendiri. Admin boleh semuanya.');
        }
    }

    private function validatedPayload(Request $request): array
    {
        $data = $request->validate([
            'subject' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'session_type' => ['required', 'in:offline,online,hybrid'],
            'location' => ['nullable', 'string', 'max:160'],
            'meeting_platform' => ['nullable', 'string', 'max:50'],
            'meeting_link' => ['nullable', 'url', 'max:255'],
            'session_date' => ['required', 'date'],
            'start_time' => ['required'],
            'end_time' => ['required', 'after:start_time'],
            'max_participants' => ['required', 'integer', 'min:2', 'max:50'],
        ]);

        if (in_array($data['session_type'], ['offline', 'hybrid'], true) && empty($data['location'])) {
            throw ValidationException::withMessages(['location' => 'Lokasi wajib diisi untuk sesi offline/hybrid.']);
        }

        if (in_array($data['session_type'], ['online', 'hybrid'], true) && empty($data['meeting_link'])) {
            throw ValidationException::withMessages(['meeting_link' => 'Link meeting wajib diisi untuk sesi online/hybrid.']);
        }

        $subject = Subject::firstOrCreate([
            'name' => trim($data['subject']),
        ]);

        unset($data['subject']);

        return $data + ['subject_id' => $subject->id];
    }

    public function index(Request $request)
    {
        self::closeExpiredSessions();

        $query = StudySession::with(['subject', 'creator', 'joinedParticipants'])
            ->when($request->search, fn ($q, $search) => $q->where(function ($qq) use ($search) {
                $qq->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('subject', fn ($s) => $s->where('name', 'like', "%{$search}%"));
            }));

        if ($request->session_type === 'archive') {
            $query->archived();
        } else {
            $query->active()->when($request->session_type, fn ($q, $type) => $q->where('session_type', $type));
        }

        return Inertia::render('StudySessions/Index', [
            'sessions' => $query->orderBy('session_date')->orderBy('start_time')->get(),
            'subjects' => Subject::orderBy('name')->get(),
            'filters' => $request->only(['search', 'session_type']),
        ]);
    }

    public function create()
    {
        return Inertia::render('StudySessions/Create');
    }

    public function store(Request $request)
    {
        $data = $this->validatedPayload($request);

        $session = StudySession::create($data + [
            'user_id' => $request->user()->id,
            'status' => 'open',
        ]);

        SessionParticipant::create([
            'study_session_id' => $session->id,
            'user_id' => $request->user()->id,
            'status' => 'joined',
        ]);

        return redirect()->route('study-sessions.show', $session)->with('success', 'Sesi belajar berhasil dibuat.');
    }

    public function show(Request $request, StudySession $studySession)
    {
        self::closeExpiredSessions();

        $studySession->refresh()->load(['subject', 'creator', 'participants.user', 'comments.user', 'joinedParticipants']);

        return Inertia::render('StudySessions/Show', [
            'session' => $studySession,
            'isJoined' => $studySession->isJoinedBy($request->user()),
            'conflict' => $this->scheduleConflictPayload($request, $studySession),
        ]);
    }

    public function edit(Request $request, StudySession $studySession)
    {
        $this->ensureCanManage($request, $studySession);

        $studySession->load(['subject', 'creator']);

        return Inertia::render('StudySessions/Edit', [
            'session' => [
                'id' => $studySession->id,
                'user_id' => $studySession->user_id,
                'subject' => $studySession->subject?->name ?? '',
                'title' => $studySession->title,
                'description' => $studySession->description,
                'session_type' => $studySession->session_type,
                'location' => $studySession->location,
                'meeting_platform' => $studySession->meeting_platform,
                'meeting_link' => $studySession->meeting_link,
                'session_date' => optional($studySession->session_date)->format('Y-m-d'),
                'start_time' => substr((string) $studySession->start_time, 0, 5),
                'end_time' => substr((string) $studySession->end_time, 0, 5),
                'max_participants' => $studySession->max_participants,
            ],
        ]);
    }

    public function update(Request $request, StudySession $studySession)
    {
        $this->ensureCanManage($request, $studySession);

        $studySession->update($this->validatedPayload($request));

        return redirect()->route('study-sessions.show', $studySession)->with('success', 'Study session berhasil diupdate.');
    }

    public function destroy(Request $request, StudySession $studySession)
    {
        $this->ensureCanManage($request, $studySession);

        $studySession->participants()->delete();
        $studySession->comments()->delete();
        $studySession->delete();

        return redirect()->route('study-sessions.index')->with('success', 'Study session berhasil dihapus.');
    }

    public function conflict(Request $request, StudySession $studySession)
    {
        return response()->json($this->scheduleConflictPayload($request, $studySession));
    }

    private function scheduleConflictPayload(Request $request, StudySession $session): array
    {
        $day = strtolower($session->session_date->format('l'));

        $conflict = CourseSchedule::with('course')
            ->whereHas('course', fn ($q) => $q->where('user_id', $request->user()->id))
            ->where('day_of_week', $day)
            ->where('start_time', '<', $session->end_time)
            ->where('end_time', '>', $session->start_time)
            ->orderBy('start_time')
            ->first();

        return [
            'has_conflict' => (bool) $conflict,
            'course' => $conflict ? [
                'name' => $conflict->course->name,
                'day_label' => $conflict->day_label,
                'start_time' => substr($conflict->start_time, 0, 5),
                'end_time' => substr($conflict->end_time, 0, 5),
                'room' => $conflict->room,
            ] : null,
        ];
    }

    public function join(Request $request, StudySession $studySession)
    {
        self::closeExpiredSessions();

        $studySession->refresh();

        if (! $studySession->can_join) {
            return back()->with('error', 'Sesi ini sudah closed/full.');
        }

        if (! $request->boolean('force_join') && ! $request->boolean('force') && $this->scheduleConflictPayload($request, $studySession)['has_conflict']) {
            return back()->with('warning', 'Session bentrok dengan jadwal mata kuliah lu.');
        }

        SessionParticipant::updateOrCreate(
            ['study_session_id' => $studySession->id, 'user_id' => $request->user()->id],
            ['status' => 'joined']
        );

        if ($studySession->joinedParticipants()->count() >= $studySession->max_participants) {
            $studySession->update(['status' => 'full']);
        }

        return back()->with('success', 'Berhasil join sesi.');
    }

    public function leave(Request $request, StudySession $studySession)
    {
        SessionParticipant::where('study_session_id', $studySession->id)
            ->where('user_id', $request->user()->id)
            ->update(['status' => 'left']);

        if ($studySession->status === 'full') {
            $studySession->update(['status' => 'open']);
        }

        return back()->with('success', 'Berhasil keluar dari sesi.');
    }

    public function comment(Request $request, StudySession $studySession)
    {
        $data = $request->validate(['comment' => ['required', 'string', 'max:1000']]);

        SessionComment::create([
            'study_session_id' => $studySession->id,
            'user_id' => $request->user()->id,
            'comment' => $data['comment'],
        ]);

        return back()->with('success', 'Komentar ditambahkan.');
    }
}
