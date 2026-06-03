<?php

namespace App\Http\Controllers;

use App\Models\SessionParticipant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $leaders = SessionParticipant::with('user')
            ->where('status', 'joined')
            ->selectRaw('user_id, count(*) as sessions_count')
            ->groupBy('user_id')
            ->orderByDesc('sessions_count')
            ->take(10)
            ->get()
            ->map(fn ($row) => [
                'id' => $row->user_id,
                'name' => $row->user?->name ?? 'Unknown',
                'sessions_count' => (int) $row->sessions_count,
                'xp' => (int) $row->sessions_count * 120,
            ]);

        $joinedCount = $request->user()->joinedSessions()->wherePivot('status', 'joined')->count();
        $createdCount = $request->user()->studySessions()->count();

        return Inertia::render('Leaderboard/Index', [
            'leaders' => $leaders,
            'myBadges' => self::badgesFor($joinedCount, $createdCount, includeLocked: true),
        ]);
    }

    public static function badgesFor(int $joinedCount, int $createdCount, bool $includeLocked = false): array
    {
        $badges = [
            ['name' => 'Active Learner', 'icon' => '🎓', 'description' => 'Join minimal 1 sesi.', 'unlocked' => $joinedCount >= 1],
            ['name' => 'Helpful Host', 'icon' => '🤝', 'description' => 'Bikin minimal 1 sesi.', 'unlocked' => $createdCount >= 1],
            ['name' => 'Consistent', 'icon' => '🔥', 'description' => 'Join minimal 5 sesi.', 'unlocked' => $joinedCount >= 5],
            ['name' => 'Anti Ngilang', 'icon' => '🛡️', 'description' => 'Aktif ikut study group.', 'unlocked' => $joinedCount >= 3],
        ];

        return collect($badges)
            ->when(! $includeLocked, fn ($c) => $c->where('unlocked', true))
            ->map(fn ($b) => $b + ['locked' => ! $b['unlocked']])
            ->values()
            ->all();
    }
}
